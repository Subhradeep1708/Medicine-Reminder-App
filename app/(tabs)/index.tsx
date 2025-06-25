// import { View } from "react-native-reanimated/lib/typescript/Animated";

import { Text, View } from "react-native";

export default function HomeScreen() {
    return (
        <View
            className={"bg-red-400 h-screen flex items-center justify-center"}
        >
            <Text className={"text-3xl text-white font-bold"}>
                Welcome to the Home Screen!
            </Text>
        </View>
    );
}
