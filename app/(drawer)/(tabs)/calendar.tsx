import { View, Text, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import CalenderComponent from '@/components/CalenderComponent';
import { ThemeContext } from "../../_layout";// ensure correct path

const Calendar = () => {
  const { isDark } = useContext(ThemeContext);

  // Dynamic colors
  const bgColor = isDark ? '#121212' : '#ffffff';
  const headerBg = isDark ? '#1f451f' : '#16a34a'; // dark green variant
  const textColor = isDark ? '#ffffff' : '#ffffff'; // header text stays white
  const iconColor = isDark ? '#81c784' : '#127207'; // lighter green in dark mode

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      {/* Header */}
      <View style={{ backgroundColor: headerBg, height: 98, borderBottomLeftRadius: 29, borderBottomRightRadius: 29 }}>
        <View className="flex-row items-center mt-10 py-2 px-5">
          <TouchableOpacity
            className="h-11 w-11 rounded-full items-center justify-center"
            style={{ backgroundColor: isDark ? '#2c2c2c' : '#ffffff' }}
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back-ios" size={25} color={iconColor} />
          </TouchableOpacity>
          <Text className="flex-1 font-spaceBold text-2xl pl-6" style={{ color: textColor }}>
            Medication Schedule
          </Text>
        </View>
      </View>

      {/* Calendar Component */}
      <View style={{ flex: 1 }}>
        <CalenderComponent />
      </View>
    </View>
  );
};

export default Calendar;
