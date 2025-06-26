import * as React from 'react'
import { Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { COLORS } from "@/constants/color";
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';

export default function SignUpScreen() {
    const { isLoaded, signUp, setActive } = useSignUp()
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
                style={{ flex: 1, backgroundColor: COLORS.background }}
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
        <View className="flex-1" style={{ backgroundColor: COLORS.background }}>
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