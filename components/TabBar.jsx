import { View, Pressable } from 'react-native';
import { useLinkBuilder } from '@react-navigation/native';
import { Text } from '@react-navigation/elements';
import { COLORS } from '../constants/color';
import { icons } from '../assets/icons';
import { useContext } from 'react';
import { ThemeContext } from '../app/_layout';  // your global ThemeContext

const TabBar = ({ state, descriptors, navigation }) => {
    const { buildHref } = useLinkBuilder();
    const { isDark } = useContext(ThemeContext); // get dark mode from RootLayout

    // Dynamic colors based on theme
    const backgroundColor = isDark ? '#1e1e1e' : '#fff';
    const shadowColor = isDark ? '#555' : COLORS.shadow;
    const activeColor = isDark ? '#bb86fc' : COLORS.primary;

    return (
        <View
            style={{ borderCurve: 'continuous', backgroundColor }}
            className="absolute bottom-6 flex-row justify-between py-4 rounded-[25px] mx-5 shadow-xl"
        >
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <Pressable
                        key={route.key}
                        android_ripple={null}
                        href={buildHref(route.name, route.params)}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1 }}
                        className={`flex-1 items-center justify-center gap-1`}
                    >
                        {icons[route.name]({ color: isFocused ? activeColor : shadowColor })}

                        <Text
                            style={{
                                color: isFocused ? activeColor : shadowColor,
                                fontSize: 14,
                                fontFamily: 'SpaceGrotesk-SemiBold',
                            }}
                        >
                            {label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
};

export default TabBar;
