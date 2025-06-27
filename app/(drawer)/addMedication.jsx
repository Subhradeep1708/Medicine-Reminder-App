import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { COLORS } from '@/constants/color'

const MedicationScreen = () => {
    return (
        <View className="" style={{ flex: 1, backgroundColor: COLORS.background }}>
            <StatusBar
                
            />
            <Text>addMedication</Text>
        </View>
    )
}

export default MedicationScreen