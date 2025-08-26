import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ThemeContext } from '../_layout';

const About = () => {
    const { isDark } = useContext(ThemeContext); // <-- use "isDark" not "darkMode"

    // Colors dynamically based on theme
    const bgColor = isDark ? '#121212' : '#ffffff';
    const textColor = isDark ? '#ffffff' : '#141414';
    const borderColor = isDark ? '#333333' : '#e5e7eb';
    const bottomSpacerColor = bgColor;

    return (
        <View style={{ flex: 1, backgroundColor: bgColor }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                {/* Header */}
                <View style={{ backgroundColor: bgColor, borderBottomWidth: 1, borderBottomColor: borderColor }}>
                    <View className="flex-row items-center px-4 pb-2 pt-5 justify-between">
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className="w-12 h-12 items-center justify-center"
                        >
                            <Ionicons name="arrow-back" size={24} color={textColor} />
                        </TouchableOpacity>
                        <Text style={{ color: textColor, fontSize: 20, fontFamily: 'Space-Bold' }} className="flex-1 text-center pr-12">
                            About
                        </Text>
                    </View>
                </View>

                {/* Section 1 */}
                <Text style={{ color: textColor, fontSize: 22, fontFamily: 'Space-Bold', padding: 16 }}>
                    Medicine Tracker
                </Text>
                <Text style={{ color: textColor, fontSize: 16, fontFamily: 'Space-Regular', paddingHorizontal: 16, paddingBottom: 12 }}>
                    Medicine Tracker is designed to help you manage your medications effectively.
                    It allows you to track your dosages, set reminders, and monitor your progress.
                    Our goal is to make medication management simple and stress-free.
                </Text>

                {/* Section 2 */}
                <Text style={{ color: textColor, fontSize: 22, fontFamily: 'Space-Bold', padding: 16 }}>
                    Developers
                </Text>
                <Text style={{ color: textColor, fontSize: 16, fontFamily: 'Space-Regular', paddingHorizontal: 16, paddingBottom: 12 }}>
                    This app was developed by Subhradeep Sardar.
                    I strive to provide a reliable and user-friendly tool for managing your medications.
                </Text>

                {/* Section 3 */}
                <Text style={{ color: textColor, fontSize: 22, fontFamily: 'Space-Bold', padding: 16 }}>
                    Acknowledgments
                </Text>
                <Text style={{ color: textColor, fontSize: 16, fontFamily: 'Space-Regular', paddingHorizontal: 16, paddingBottom: 12 }}>
                    We would like to thank our users for their valuable feedback and support.
                    Your input helps us continuously improve Medicine Tracker and make it a better resource for everyone.
                </Text>
            </ScrollView>

            {/* Bottom spacer */}
            <View style={{ height: 20, backgroundColor: bottomSpacerColor }} />
        </View>
    );
};

export default About;
