import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const SafeScreen = ({ children }) => {
    const insets = useSafeAreaInsets()
    return (
        <View style={{ paddingTop: insets.top, flex: 1 }}>
            {children}
        </View>
    )
}

export default SafeScreen
