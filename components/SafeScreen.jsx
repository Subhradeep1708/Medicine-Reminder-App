import { View } from 'react-native';
import React, { useContext } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeContext } from '../app/_layout';// your global theme

const SafeScreen = ({ children }) => {
    const insets = useSafeAreaInsets();
    const { isDark } = useContext(ThemeContext);

    return (
        <View style={{ flex: 1, paddingTop: 0, backgroundColor: isDark ? '#121212' : '#fff' }}>
            {/* Top gradient overlay */}
            <LinearGradient
                colors={isDark ? ['rgba(255,255,255,0.1)', 'transparent'] : ['rgba(0,0,0,0.4)', 'transparent']}
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
    );
};

export default SafeScreen;
