import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

const MedicineComponent = () => {
    const [isTaken, setIsTaken] = useState(false)
    return (
        <View className='flex-row bg-white  py-4 rounded-xl mx-4 my-2 items-center '>
            <View className='bg-orange-100 p-3 ml-5 rounded-full'>
                <Ionicons name="medical" size={28} color="orange" />
            </View>


            <View className='flex-1 flex-row justify-between items-center px-4'>
                <View>
                    <Text className='text-black font-spaceSemiBold text-lg'>Medicine Name</Text>
                    <Text className='text-gray-500 font-spaceRegular text-sm'>Dosage: 500mg</Text>
                    <View className='text-gray-500 font-spaceRegular flex-row items-center ' >
                        <Ionicons name='time-outline' size={16} className='' />
                        <Text className='mx-2 font-spaceRegular'>
                            9:00 AM
                        </Text>
                    </View>
                </View>
                <View>
                    {!isTaken ? (
                        <TouchableOpacity
                            onPress={() => setIsTaken(!isTaken)}
                            className='bg-orange-500 p-2 px-6 rounded-2xl '
                        >
                            <Text className='text-white font-spaceSemiBold'>Take</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={() => setIsTaken(!isTaken)}
                            className='bg-green-100 p-2 px-6 rounded-2xl flex-row items-center '
                        >
                            <Ionicons name='checkmark-circle' size={18} color='green' />
                            <Text className='text-green-500 font-spaceSemiBold pl-2' style={{ fontWeight: 500 }}>Taken</Text>
                        </TouchableOpacity>
                    )}

                </View>
            </View>
        </View>
    )
}

export default MedicineComponent