import { useSignIn } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { COLORS } from "@/constants/color";
import { Ionicons } from '@expo/vector-icons'
import { Button } from 'react-native-paper';

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn()
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

  return (
    <View className="flex-1 " style={{ backgroundColor: COLORS.background }}>
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
                  {0 ? "Signing In..." : "Sign In"}
                </Text>
              </Button>

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