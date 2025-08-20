import { useClerk } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import { Text, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../app/_layout';  // your global theme

export const SignOutButton = () => {
    const { signOut } = useClerk();
    const { isDark } = useContext(ThemeContext); // use global theme

    const handleSignOut = async () => {
        try {
            await signOut();
            Linking.openURL(Linking.createURL('/(auth)/sign-in'));
        } catch (err) {
            console.error('Sign out error:', err);
        }
    };

    return (
        <TouchableOpacity onPress={handleSignOut} style={{ padding: 8 }}>
            <Text style={{ color: isDark ? '#fff' : '#000', fontFamily: 'SpaceGrotesk-SemiBold', fontSize: 16 }}>
                Sign out
            </Text>
        </TouchableOpacity>
    );
};
