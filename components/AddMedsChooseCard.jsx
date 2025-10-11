import { Ionicons } from '@expo/vector-icons'
import { useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { ThemeContext } from '../app/_layout' // import global theme

const AddMedsCard = ({ icon, text, selected, onPress }) => {
    const { isDark } = useContext(ThemeContext); // use global dark mode

    return (
        <View
            style={{
                backgroundColor: !selected
                    ? isDark ? '#1e1e1e' : 'white'  // dark mode background
                    : '#28a71a',
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                width: 170,
                height: 100,
                justifyContent: 'center',
            }}
        >
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.6}
            >
                <View className="gap-x-1">
                    <View
                        className="rounded-full p-1 h-14 w-14 items-center justify-center mx-auto"
                        style={{ backgroundColor: isDark ? '#333' : '#f0f0f0' }} // dark mode circle
                    >
                        <Ionicons name={icon} size={28} color={isDark ? 'white' : 'black'} />
                    </View>
                    <Text
                        className="text-center font-spaceSemiBold text-base mt-2"
                        style={{
                            color: !selected
                                ? isDark ? 'white' : 'black'  // dark mode text
                                : 'white'
                        }}
                    >
                        {text}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default AddMedsCard
