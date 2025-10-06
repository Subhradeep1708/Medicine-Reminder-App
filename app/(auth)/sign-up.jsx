import * as React from 'react'
import { Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import { useSignUp, useOAuth } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { COLORS } from "@/constants/color";
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser'

// Complete the OAuth flow
WebBrowser.maybeCompleteAuthSession()

export default function SignUpScreen() {
    const { isLoaded, signUp, setActive } = useSignUp()
    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
    const router = useRouter()

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [pendingVerification, setPendingVerification] = React.useState(false)
    const [code, setCode] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(true)


    // Handle submission of sign-up form
    const onSignUpPress = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all the fields")
            return;
        }
        if (password.length < 8) {
            Alert.alert("Error", "Password must be atleast 6 characters long")
            return;
        }
        if (!isLoaded) return
        setLoading(true)

        try {
            await signUp.create({
                emailAddress: email,
                password,
            })

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

            setPendingVerification(true)
        } catch (err) {
            Alert.alert("Error", err.errors?.[0].message || "Sign-in process failed ")
            console.error(JSON.stringify(err, null, 2))
        } finally {
            setLoading(false)
        }
    }

    // Handle Google OAuth sign-up
    const onGoogleSignUp = React.useCallback(async () => {
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
            Alert.alert('Sign up failed', 'Please try again')
        } finally {
            setLoading(false)
        }
    }, [startOAuthFlow])

    // Handle submission of verification form
    const onVerifyPress = async () => {
        if (!isLoaded) return
        setLoading(true);
        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code,
            })

            if (signUpAttempt.status === 'complete') {
                await setActive({ session: signUpAttempt.createdSessionId })
            } else {
                Alert.alert("Error", "Verification failed. Please try again.");
                console.error(JSON.stringify(signUpAttempt, null, 2))
            }
        } catch (err) {
            Alert.alert("Error", err.errors?.[0]?.message || "Verification failed");
            console.error(JSON.stringify(err, null, 2))
        } finally {
            setLoading(false);
        }
    }

    if (pendingVerification) {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
                style={{ flex: 1, backgroundColor: COLORS.background ,paddingTop: 20}}
            >
                <ScrollView>
                    <View>
                        <Image
                            source={require("../../assets/images/remindRx.png")}
                            style={{ width: 300, height: 300, alignSelf: 'center', marginVertical: 20, borderRadius: 20 }}
                            contentFit="contain"
                        />
                    </View>
                    <Text className="font-spaceBold text-[34px] text-center">Verify your email</Text>
                    <View className="flex-1 items-center justify-center gap-5 mt-4">

                        <View
                            className="w-[90%] border-2 rounded-3xl p-3"
                            style={{ borderColor: COLORS.border }}
                        >
                            <TextInput
                                value={code}
                                className="font-spaceRegular"
                                keyboardType='number-pad'
                                placeholder="Enter your verification code"
                                onChangeText={(code) => setCode(code)}
                            />
                        </View>

                        <View className="w-[90%] ">
                            <Button

                                mode="contained"
                                onPress={onVerifyPress}
                                buttonColor={COLORS.primary}
                                disabled={loading}
                                textColor={COLORS.white}
                                contentStyle={{
                                    paddingVertical: 8,
                                    paddingHorizontal: 90,
                                    borderRadius: 30,

                                }}
                                style={loading && { opacity: 0.7, backgroundColor: COLORS.textLight }}
                            >
                                <Text className="font-spaceSemiBold text-white text-xl items-center">
                                    {0 ? "Verifying..." : "Verify"}
                                </Text>
                            </Button>

                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }

    return (
        <View className="flex-1 pt-8" style={{ backgroundColor: COLORS.background }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
                <ScrollView>
                    <View>
                        <Image
                            source={require("../../assets/images/remindRx.png")}
                            style={{ width: 300, height: 300, alignSelf: 'center', marginVertical: 20, borderRadius: 20 }}
                            contentFit="contain"
                        />
                    </View>
                    <Text className="font-spaceBold text-[34px] text-center">Sign up</Text>

                    <View className="flex-1 items-center justify-center gap-5 mt-4">

                        <View
                            className="w-[90%] border-2 rounded-3xl p-3"
                            style={{ borderColor: COLORS.border }}
                        >

                            <TextInput
                                autoCapitalize="none"
                                className="font-spaceRegular"
                                keyboardType='email-address'
                                value={email}
                                placeholder="Enter email"
                                onChangeText={(email) => setEmail(email)}
                            />
                        </View>

                        <View className="w-[90%] border-2 rounded-3xl p-3 mb-4" style={{ borderColor: COLORS.border }}>

                            <TextInput
                                value={password}
                                placeholder="Enter password"
                                className="font-spaceRegular"
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
                                mode="contained"
                                onPress={onSignUpPress}
                                buttonColor={COLORS.primary}
                                disabled={loading}
                                textColor={COLORS.white}
                                contentStyle={{
                                    paddingVertical: 8,
                                    paddingHorizontal: 90,
                                    borderRadius: 30,
                                }}
                                style={[{ borderRadius: 30 }, loading && { opacity: 0.7, backgroundColor: COLORS.textLight }]}
                            >
                                <Text className="font-spaceSemiBold text-white text-xl items-center">
                                    {loading ? "Signing Up..." : "Sign Up"}
                                </Text>
                            </Button>
                        </View>

                        {/* Divider */}
                        <View className="w-[90%] flex-row items-center my-4">
                            <View className="flex-1 h-px bg-gray-300" />
                            <Text className="mx-4 text-gray-500 font-spaceRegular">or</Text>
                            <View className="flex-1 h-px bg-gray-300" />
                        </View>

                        {/* Google Sign Up Button */}
                        <View className="w-[90%]">
                            <TouchableOpacity
                                onPress={onGoogleSignUp}
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
                                    {loading ? "Signing up..." : "Continue with Google"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}

                        >
                            <Text className="font-spaceRegular">Already have an account?</Text>
                            <Link href="/sign-in">
                                <Text style={{ color: COLORS.primary, padding: 2 }}
                                    className="font-spaceRegular"
                                >Sign in</Text>
                            </Link>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View >
    )
}