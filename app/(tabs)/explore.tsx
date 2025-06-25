import { StyleSheet, Text, View } from "react-native";

export default function TabTwoScreen() {
    return (
        <View className="bg-white h-screen flex items-center justify-center">
            <Text className="text-pink-500 font-bold text-3xlr">
                This is Explore Tab
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: "#808080",
        bottom: -90,
        left: -35,
        position: "absolute",
    },
    titleContainer: {
        flexDirection: "row",
        gap: 8,
    },
});
