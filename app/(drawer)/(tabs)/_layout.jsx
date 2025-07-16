import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import '../../../global.css'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import TabBar from '../../../components/TabBar'

const TabsLayout = () => {
    return (
        <View style={{ flex: 1, backgroundColor: ' rgba(0,0,0,0.4)' }}>

            <StatusBar translucent style="light" />
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: '#000',
                    tabBarInactiveTintColor: '#888',
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        borderTopWidth: 0,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                }}
                tabBar={props => <TabBar {...props} />}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="home" size={size} color={color} />
                        ),

                    }}

                />
                <Tabs.Screen
                    name="calendar"
                    options={{
                        title: 'Schedule',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="calendar-clear" size={size} color={color} />
                        ),

                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="calendar-clear" size={size} color={color} />
                        ),

                    }}
                />

            </Tabs>
        </View>
    )
}

export default TabsLayout