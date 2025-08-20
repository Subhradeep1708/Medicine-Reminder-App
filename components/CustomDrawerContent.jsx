// app/components/CustomDrawerContent.js
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text } from 'react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from '../constants/color';
import { Image } from 'expo-image';
import { Button } from 'react-native-paper';
import { useContext } from 'react';
import { ThemeContext } from '../app/_layout'; 
 // ✅ import context from Layout

export default function CustomDrawerContent(props) {
  const { isDark, toggleTheme } = useContext(ThemeContext); // ✅ consume context
  const { signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    signOut();
    router.replace('/(auth)/sign-in');
  };

  const activeRoute = props.state.routeNames[props.state.index];
  const isActive = (routeName) => routeName === activeRoute;

  // Dynamic colors
  const backgroundColor = isDark ? '#121212' : COLORS.background;
  const textColor = isDark ? '#ffffff' : '#000000';
  const secondaryTextColor = isDark ? '#aaaaaa' : '#555555';
  const iconColor = isDark ? '#ffffff' : '#000000';
  const borderColor = isDark ? '#333' : '#ccc';

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor, borderRadius: 10, padding: 5 }}
    >
      {/* Header */}
      <View className="flex items-center" style={{ marginBottom: 20 }}>
        <Text
          style={{ color: textColor, fontFamily: 'SpaceGrotesk-Bold', fontSize: 36 }}
        >
          RemindRx
        </Text>
      </View>

      {user && (
        <View className="flex-1 items-center justify-center mb-4">
          <Image
            source={{ uri: user.imageUrl || 'https://via.placeholder.com/150' }}
            style={{ width: 50, height: 50, borderRadius: 25, margin: 10 }}
            contentFit="cover"
          />
          <Text style={{ color: textColor, fontFamily: 'SpaceGrotesk-Medium', fontSize: 18 }}>
            Hello {user.fullName || 'Guest'}
          </Text>
          <Text
            style={{
              color: secondaryTextColor,
              fontFamily: 'SpaceGrotesk-Medium',
              fontSize: 16,
              marginTop: 4,
            }}
          >
            {user.fullName || user.emailAddresses[0]?.emailAddress}
          </Text>
        </View>
      )}

      {/* Drawer Items */}
      <DrawerItem
        label="Home"
        focused={isActive('(tabs)')}
        icon={({ size }) => <Ionicons name="home-outline" size={size} color={iconColor} />}
        onPress={() => props.navigation.navigate('(tabs)')}
        labelStyle={{ color: textColor }}
      />
      <DrawerItem
        label="About"
        focused={isActive('about')}
        icon={({ size }) => <Ionicons name="information-circle-outline" size={size} color={iconColor} />}
        onPress={() => props.navigation.navigate('about')}
        labelStyle={{ color: textColor }}
      />
      <DrawerItem
        label="Help"
        focused={isActive('help')}
        icon={({ size }) => <Ionicons name="help-circle-outline" size={size} color={iconColor} />}
        onPress={() => props.navigation.navigate('help')}
        labelStyle={{ color: textColor }}
      />
      <DrawerItem
        label="Settings"
        focused={isActive('settings')}
        icon={({ size }) => <Ionicons name="settings-outline" size={size} color={iconColor} />}
        onPress={() => props.navigation.navigate('settings')}
        labelStyle={{ color: textColor }}
      />

      {/* Dark/Light Toggle Button */}
      <View style={{ marginVertical: 20, paddingHorizontal: 16 }}>
        <Button
          mode="contained"
          onPress={toggleTheme} // ✅ works now
          buttonColor={isDark ? '#1f1f1f' : '#e0e0e0'}
          textColor={isDark ? '#ffffff' : '#000000'}
        >
          {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </Button>
      </View>

      {/* Logout */}
      <DrawerItem
        label="Logout"
        icon={({ size }) => <Ionicons name="arrow-back" size={size} color="#e32c1f" />}
        onPress={handleLogout}
        style={{
          marginTop: 40,
          borderTopWidth: 1,
          borderTopColor: borderColor,
        }}
        labelStyle={{ color: '#e32c1f', fontFamily: 'space-mono' }}
      />
    </DrawerContentScrollView>
  );
}
