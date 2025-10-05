import { useSignIn, useOAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { COLORS } from "@/constants/color";
import { Ionicons } from '@expo/vector-icons'
import { Button } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser'

// Complete the OAuth flow
WebBrowser.maybeCompleteAuthSession()

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(true)
  const [loading, setLoading] = React.useState(false)

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!emailAddress || !password) {
      Alert.alert('Email and password are required')
      return
    }
    if (!isLoaded) return
    setLoading(true)

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    } finally {
      setLoading(false);
    }
  }

  // Handle Google OAuth sign-in
  const onGoogleSignIn = React.useCallback(async () => {
    try {
      setLoading(true)
      const { createdSessionId, setActive } = await startOAuthFlow()

      if (createdSessionId) {
        setActive({ session: createdSessionId })
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
      Alert.alert('Sign in failed', 'Please try again')
    } finally {
      setLoading(false)
    }
  }, [startOAuthFlow])

  return (
    <View className="flex-1 pt-8 " style={{ backgroundColor: COLORS.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView>
          <Image
            source={require('../../assets/images/signIn.png')}
            style={{ width: 300, height: 300, alignSelf: 'center', marginVertical: 20, borderRadius: 20 }}
            contentFit="contain"
          />
          <Text className="font-spaceBold text-[34px] text-center">Welcome Back</Text>

          <View className="flex-1 items-center justify-center gap-5 mt-4">
            <View
              className="w-[90%] border-2 rounded-3xl p-3"
              style={{ borderColor: COLORS.border }}
            >
              <TextInput
                value={emailAddress}
                className="font-spaceRegular"
                autoCapitalize="none"
                keyboardType='email-address'
                placeholder="Enter Email"
                onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
              />
            </View>
            <View className="w-[90%] border-2 rounded-3xl p-3 mb-4" style={{ borderColor: COLORS.border }}>
              <TextInput
                value={password}
                className="font-spaceRegular"
                placeholder="Enter Password"
                secureTextEntry={showPassword}
                onChangeText={(password) => setPassword(password)}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="right-4 items-center mt-5 absolute"
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={22}
                  color={COLORS.textLight}
                />
              </TouchableOpacity>
            </View>

            <View className="w-[90%] ">
              <Button
                icon="chevron-right"
                mode="contained"
                onPress={onSignInPress}
                buttonColor={COLORS.primary}
                disabled={loading}
                textColor={COLORS.white}
                contentStyle={{
                  paddingVertical: 8,
                  paddingHorizontal: 90,
                  borderRadius: 30,
                  flexDirection: 'row-reverse',
                }}
                style={loading && { opacity: 0.7, backgroundColor: COLORS.textLight }}
              >
                <Text className="font-spaceSemiBold text-white text-xl items-center">
                  {loading ? "Signing In..." : "Sign In"}
                </Text>
              </Button>
            </View>

            {/* Divider */}
            <View className="w-[90%] flex-row items-center my-4">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="mx-4 text-gray-500 font-spaceRegular">or</Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            {/* Google Sign In Button */}
            <View className="w-[90%]">
              <TouchableOpacity
                onPress={onGoogleSignIn}
                disabled={loading}
                className="flex-row items-center justify-center border-2 rounded-3xl p-4 mb-4"
                style={{ 
                  borderColor: COLORS.border,
                  backgroundColor: loading ? '#f0f0f0' : 'white',
                  opacity: loading ? 0.7 : 1
                }}
              >
                <Image
                  source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
                  style={{ width: 24, height: 24, marginRight: 12 }}
                />
                <Text className="font-spaceSemiBold text-lg" style={{ color: COLORS.text }}>
                  {loading ? "Signing in..." : "Continue with Google"}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity

              onPress={() => router.push("/(auth)/sign-up")}
            >
              <Text
                className=" font-spaceRegular text-center text-md"
              >
                Don&apos;t have an account? <Text style={{ color: COLORS.primary, padding: 2 }}>Sign up
                </Text>
              </Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}