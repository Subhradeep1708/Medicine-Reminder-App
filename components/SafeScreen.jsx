import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLORS } from '../constants/color'
import { LinearGradient } from 'expo-linear-gradient'

const SafeScreen = ({ children }) => {
    const insets = useSafeAreaInsets()
    return (
        <View style={{ flex: 1, paddingTop: 0, backgroundColor: 'transparent' }}>
            <LinearGradient
                colors={['rgba(0,0,0,0.4)', 'transparent']}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: insets.top + 14,
                    zIndex: 10,
                }}
            />
            {children}
        </View>
    )
}

export default SafeScreen
