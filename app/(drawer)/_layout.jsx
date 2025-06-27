import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomDrawerContent from '../../components/CustomDrawerContent';

export default function DrawerLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>

            <Drawer
                screenOptions={{
                    headerShown: false,
                    drawerActiveTintColor: '#15803d',
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
                {/* <Drawer.Screen
                    name="about"
                    options={{
                        drawerLabel: 'About',
                        drawerIcon: ({ color, size }) => (
                            <Ionicons name="information" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="help"
                    options={{
                        drawerLabel: 'Help',
                        drawerIcon: ({ color, size }) => (
                            <Ionicons name="help" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="settings"
                    options={{
                        drawerLabel: 'Settings',
                        drawerIcon: ({ color, size }) => (
                            <Ionicons name="settings-outline" size={size} color={color} />
                        ),
                    }}
                /> */}
            </Drawer>
        </GestureHandlerRootView>
    );
}
