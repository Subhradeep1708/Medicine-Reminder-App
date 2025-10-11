import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { useContext, useRef } from 'react';
import { ThemeContext } from '../app/_layout';// import your ThemeContext

const QuickActionCard = ({ iconName, text, route, iconBg = "bg-red-400" }) => {
    const { isDark } = useContext(ThemeContext);
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
            tension: 150,
            friction: 4,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 150,
            friction: 4,
        }).start();
    };

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
                onPress={() => router.push(route)}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={0.8}
                className={`px-4 rounded-2xl mx-2 py-4 shadow-md ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}
            >
            <View>
                <View
                    className={`rounded-full p-2 size-12 items-center justify-center mx-auto ${iconBg}`}
                >
                    <Ionicons name={iconName} size={24} color={'white'} />
                </View>
                <Text
                    className={`text-center w-24 font-spaceBold text-base mt-2 text-wrap ${isDark ? 'text-white' : 'text-gray-800'}`}
                >
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
        </Animated.View>
    );
};

export default QuickActionCard;
