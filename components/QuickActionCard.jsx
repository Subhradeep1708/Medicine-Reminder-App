import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../app/_layout';// import your ThemeContext

const QuickActionCard = ({ iconName, text, route, iconBg = "bg-red-400" }) => {
    const { isDark } = useContext(ThemeContext);

    return (
        <TouchableOpacity
            onPress={() => router.push(route)}
            activeOpacity={0.6}
            className={`px-4 rounded-2xl mx-2 py-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
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
    );
};

export default QuickActionCard;
