import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'

const QuickActionCard = ({ iconName, bgColorFrom, bgColorTo, text, route }) => {
    return (


        <LinearGradient
            colors={[`${bgColorFrom}`, `${bgColorTo}`]}
            // className='rounded-lg shadow-lg shadow-gray-500/50'
            style={{
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                width: 170,
                height: 100,
                justifyContent: 'center',
            }}
        >
            <TouchableOpacity
                onPress={() => router.navigate(route)}
                // className="flex-1"
                className=""
                activeOpacity={0.6}

            >
                <View className=" gap-x-1" >
                    <View className=" rounded-lg p-1 h-12 w-12 items-center justify-center mx-auto"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                    >
                        <Ionicons name={iconName} size={30} color={'white'} />
                    </View>
                    <Text className="text-center text-white font-spaceSemiBold text-base mt-2">{text}</Text>
                </View>
            </TouchableOpacity>
        </LinearGradient>

    )
}

export default QuickActionCard