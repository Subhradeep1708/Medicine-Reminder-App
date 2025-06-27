import { TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const HamburgerButton = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{
                padding: 5,
                // backgroundColor: "#e5e5e5",
                borderRadius: 10,
                alignSelf: 'flex-start', // Optional: aligns left
                margin: 2
            }}
        >
            <Ionicons name="menu" size={30} color="white" />
        </TouchableOpacity>
    );
};

export default HamburgerButton;
