import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import '../../../global.css';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import TabBar from '../../../components/TabBar';
import { useContext } from 'react';
import { ThemeContext } from '../../_layout'; // adjust path if needed

const TabsLayout = () => {
  const { isDark } = useContext(ThemeContext);

  // Dynamic colors based on theme
  const bgColor = isDark ? '#121212' : '#ffffff';
  const tabBarBg = isDark ? '#1c1c1c' : '#fff';
  const activeTint = isDark ? '#81c784' : '#000';
  const inactiveTint = isDark ? '#888' : '#888';
  const statusBarStyle = isDark ? 'light' : 'dark';

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      <StatusBar translucent style={statusBarStyle} />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: activeTint,
          tabBarInactiveTintColor: inactiveTint,
          tabBarStyle: {
            backgroundColor: tabBarBg,
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
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="allMeds"
          options={{
            title: 'Medications',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="medical-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

export default TabsLayout;
