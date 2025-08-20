import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomDrawerContent from '../../components/CustomDrawerContent';
import { useContext } from 'react';
import { ThemeContext } from '../_layout'; // global theme

export default function DrawerLayout() {
    const { isDark } = useContext(ThemeContext); // global dark mode

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                screenOptions={{
                    headerShown: false,
                    drawerActiveTintColor: '#15803d',
                    drawerInactiveTintColor: isDark ? '#fff' : '#000', // dark mode text
                    drawerStyle: {
                        backgroundColor: isDark ? '#121212' : '#fff', // dark mode background
                    },
                }}
                drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
                <Drawer.Screen
                    name="(tabs)"
                    options={{
                        drawerLabel: 'Home',
                        drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
