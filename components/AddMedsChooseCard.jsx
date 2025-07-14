import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const AddMedsCard = ({ icon, text, selected, onPress }) => {

    return (

        <View
            style={{
                backgroundColor: !selected ? 'white' : '#28a71a',
                // backgroundColor: '',
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
                onPress={onPress}
                // className="flex-1"
                activeOpacity={0.6}

            >
                <View className=" gap-x-1" >
                    <View className=" rounded-full p-1 h-14 w-14 items-center justify-center mx-auto"
                        style={{ backgroundColor: '#f0f0f0' }}
                    >
                        <Ionicons name={icon} size={28} color={'black'} />
                    </View>
                    <Text className="text-center font-spaceSemiBold text-base mt-2"
                        style={{
                            color: !selected ? 'black' : 'white'
                        }}
                    >{text}</Text>
                </View>
            </TouchableOpacity>
        </View >

    )
}

export default AddMedsCard
