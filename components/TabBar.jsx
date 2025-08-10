import { View, Pressable } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text } from '@react-navigation/elements';
import { COLORS } from '../constants/color'
import { icons } from '../assets/icons';

const TabBar = ({ state, descriptors, navigation }) => {



    const { colors } = useTheme();
    const { buildHref } = useLinkBuilder();
    return (
        <View
            style={{ borderCurve: 'continuous' }}
            className="absolute bottom-6 flex-row bg-white justify-between py-4 rounded-[25px] mx-5 shadow-xl   "
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
                        className={`flex-1 items-center justify-center gap-1 `}
                    >
                        {
                            icons[route.name]({
                                color: isFocused ? COLORS.primary : COLORS.shadow
                            })
                        }

                        <Text style={{
                            color: isFocused ? COLORS.primary : COLORS.shadow,
                            fontSize: 14,
                            fontFamily: 'SpaceGrotesk-SemiBold'
                        }}

                        >
                            {label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    )
}

export default TabBar