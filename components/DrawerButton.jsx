import { TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { useContext } from 'react';
import { ThemeContext } from '../app/_layout'; // import global ThemeContext

const HamburgerButton = () => {
    const navigation = useNavigation();
    const { isDark } = useContext(ThemeContext);

    return (
        <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{
                padding: 5,
                borderRadius: 10,
                alignSelf: 'flex-start',
                margin: 2
            }}
        >
            <Ionicons
                name="menu"
                size={30}
                color={isDark ? '#fff' : '#000'} // dynamic color based on theme
            />
        </TouchableOpacity>
    );
};

export default HamburgerButton;
