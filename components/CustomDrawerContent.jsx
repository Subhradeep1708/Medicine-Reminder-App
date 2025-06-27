// app/components/CustomDrawerContent.js
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Text } from 'react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useRouter } from 'expo-router';
import { SignOutButton } from './SignOutBtn';
import { COLORS } from '../constants/color';
import { Image } from 'expo-image';
export default function CustomDrawerContent(props) {
    const { signOut } = useAuth();
    const { user } = useUser();

    // console.log(user);


    const router = useRouter();
    const handleLogout = () => {
        signOut();
        router.replace('/(auth)/sign-in'); // Redirect to sign-in page after logout
    }

    const activeRoute = props.state.routeNames[props.state.index];

    const isActive = (routeName) => routeName === activeRoute;

    return (
        <DrawerContentScrollView {...props} style={{ backgroundColor: COLORS.background, borderRadius: 10, padding: 5 }}>
            <View style={{}} className="flex items-center ">
                <Text style={{}}
                    className=" font-spaceBold text-green-600 top-1 text-5xl"
                >RemindRx</Text>
            </View>
            {user && (
                <>

                    <View className="flex-1 items-center justify-center mb-4">
                        <Image
                            source={{ uri: user.imageUrl || 'https://via.placeholder.com/150' }}

                            style={{ width: 50, height: 50, borderRadius: 25, margin: 10 }}
                            contentFit="cover"
                            className="rounded-full"
                        />
                        <Text className="font-spaceMedium text-xl ">
                            Hello {user.fullName || "Guest"}
                        </Text>
                    </View>
                    <Text className="font-spaceMedium text-xl text-center mb-7">{user.fullName || user.emailAddresses[0]?.emailAddress}</Text>
                </>
            )}
            {/* Custom Header */}


            {/* Default Drawer Items */}

            {/* <DrawerItemList {...props} /> */}
            <DrawerItem
                label="Home"
                // labelStyle={{ fontFamily: 'space-mono' }}
                className="font-spaceRegular"
                focused={isActive('(tabs)')}
                icon={({ color, size }) => (
                    <Ionicons name="home-outline" size={size} color={color} />
                )}
                onPress={() => props.navigation.navigate('(tabs)')}
                activeTintColor="#15803d"
            />
            <DrawerItem
                label="About"
                focused={isActive('about')}
                icon={({ color, size }) => (
                    <Ionicons name="information-circle-outline" size={size} color={color} />
                )}
                onPress={() => props.navigation.navigate('about')}
                activeTintColor="#15803d"

            />
            <DrawerItem
                label="Help"
                focused={isActive('help')}
                icon={({ color, size }) => (
                    <Ionicons name="help-circle-outline" size={size} color={color} />
                )}
                onPress={() => props.navigation.navigate('help')}
                activeTintColor="#15803d"

            />
            <DrawerItem
                label="Settings"
                focused={isActive('settings')}
                icon={({ color, size }) => (
                    <Ionicons name="settings-outline" size={size} color={color} />
                )}
                onPress={() => props.navigation.navigate('settings')}
                activeTintColor="#15803d"

            />
            {/* Extra Item: Logout */}

            <DrawerItem
                label="Logout"
                icon={({ color, size }) => (
                    <Ionicons name="arrow-back" size={size} color={'#e32c1f'} />
                )}
                onPress={handleLogout}
                style={{ flex: 1, justifyContent: 'flex-end', marginTop: 40, marginBottom: 0, borderTopWidth: 1, borderTopColor: Colors.light.border }}
                labelStyle={{ color: '#e32c1f', fontFamily: 'space-mono' }}
            // activeTintColor="#15803d"
            />


        </DrawerContentScrollView>
    );
}
