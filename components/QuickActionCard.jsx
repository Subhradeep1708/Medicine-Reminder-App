import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'

const QuickActionCard = ({ iconName, text, route, iconBg = "bg-red-400" }) => {
    return (


        // <LinearGradient
        //     colors={[`${bgColorFrom}`, `${bgColorTo}`]}
        //     // style={{
        //     //     // borderRadius: 10,
        //     //     shadowColor: '#000',
        //     //     shadowOffset: {
        //     //         width: 0,
        //     //         height: 2,
        //     //     },
        //     //     shadowOpacity: 0.25,
        //     //     shadowRadius: 3.84,
        //     //     elevation: 5,
        //     //     // width: 170,
        //     //     // height: 100,
        //     //     justifyContent: 'center',
        //     // }}
        //     // className='border-8 border-white rounded-full  basis-1/4'
        // >
            <TouchableOpacity
                onPress={() => router.push(route)}
                className="px-4 rounded-2xl bg-white mx-2 py-4 "
                activeOpacity={0.6}

            >
                <View className="" >
                    <View className={`rounded-full p-2 size-12 items-center justify-center mx-auto ${iconBg}`}
                    // style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                    >
                        <Ionicons name={iconName} size={24} color={'white'} />
                    </View>
                    <Text className="text-center w-24 text-gray-800 font-spaceBold text-base mt-2 text-wrap">{text}</Text>
                </View>
            </TouchableOpacity>
        // </LinearGradient>

    )
}

export default QuickActionCard