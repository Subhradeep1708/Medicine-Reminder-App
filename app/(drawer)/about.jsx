import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { COLORS } from '../../constants/color'

const About = () => {
    return (

        <View className="flex-1  justify-between" >
            {/* Header */}
            <View style={{ flex: 1, backgroundColor: COLORS.background }} >
                <View className="flex-row items-center px-4 pb-2 pt-5 justify-between"
                    style={{ backgroundColor: COLORS.background, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' }}
                >
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-12 h-12 items-center justify-center"
                    >
                        <Ionicons name="arrow-back" size={24} color="#141414" />
                    </TouchableOpacity>
                    <Text className="text-[#141414] text-xl text-center flex-1 pr-12 font-spaceBold">
                        About
                    </Text>
                </View>

                {/* Section 1 */}
                <Text className="text-[#141414] text-[22px] font-spaceBold px-4 pt-5 pb-3">
                    Medicine Tracker
                </Text>
                <Text className="text-[#141414] text-base px-4 pb-3 font-spaceRegular">
                    Medicine Tracker is designed to help you manage your medications effectively.
                    It allows you to track your dosages, set reminders, and monitor your progress.
                    Our goal is to make medication management simple and stress-free.
                </Text>

                {/* Section 2 */}
                <Text className="text-[#141414] text-[22px] font-spaceBold px-4 pt-5 pb-3">
                    Developers
                </Text>
                <Text className="text-[#141414] text-base px-4 pb-3 font-spaceRegular">
                    This app was developed by Subhradeep Sardar.
                    I strive to provide a reliable and user-friendly tool for managing your medications.
                </Text>

                {/* Section 3 */}
                <Text className="text-[#141414] text-[22px] font-spaceBold px-4 pt-5 pb-3">
                    Acknowledgments
                </Text>
                <Text className="text-[#141414] text-base px-4 pb-3 font-spaceRegular">
                    We would like to thank our users for their valuable feedback and support.
                    Your input helps us continuously improve Medicine Tracker and make it a better resource for everyone.
                </Text>
            </View>

            {/* Bottom spacer */}
            <View className="h-5 bg-white" />
        </View>

    )
}

export default About