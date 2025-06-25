import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import '../../global.css'

const TabsLayout = () => {
    return (
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
                name="calender"
                options={{
                    title: 'Schedule',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar" size={size} color={color} />
                    ),
                }}
            />

        </Tabs>
    )
}

export default TabsLayout