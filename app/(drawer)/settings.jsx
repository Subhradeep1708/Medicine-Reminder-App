import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '../_layout' // import global theme

const Settings = () => {
    const { isDark } = useContext(ThemeContext);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: isDark ? '#121212' : '#fff' }}>
            <Text style={{ color: isDark ? '#fff' : '#000', fontSize: 18 }}>Settings</Text>
        </View>
    )
}

export default Settings
