import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import useMedicineStore from "@/store/medicineStore";
import MedicineComponent from '../../../components/MedicineComponent';
import { ThemeContext } from '../../_layout'; // adjust path if needed
import { useContext } from 'react';

const AllMeds = () => {
  const medicines = useMedicineStore((state) => state.medicines);
  const toggleTaken = useMedicineStore((state) => state.toggleTaken);
  const { isDark } = useContext(ThemeContext);

  // Dynamic colors
  const bgColor = isDark ? '#121212' : '#ffffff';
  const headerBg = isDark ? '#1f451f' : '#16a34a'; // darker green for dark mode
  const textColor = '#ffffff'; // header text remains white
  const iconBg = isDark ? '#2c2c2c' : '#ffffff'; // button background in dark mode
  const iconColor = isDark ? '#81c784' : '#127207'; // icon color
  const emptyTextColor = isDark ? '#aaaaaa' : '#666666';

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      {/* Header */}
      <View style={{ backgroundColor: headerBg, height: 98, borderBottomLeftRadius: 29, borderBottomRightRadius: 29 }}>
        <View className='flex-row items-center mt-10 py-2 px-5'>
          <TouchableOpacity
            className='h-11 w-11 rounded-full items-center justify-center'
            style={{ backgroundColor: iconBg }}
            onPress={() => router.back()}
          >
            <MaterialIcons name='arrow-back-ios' size={25} color={iconColor} />
          </TouchableOpacity>
          <Text className='flex-1 font-spaceBold text-2xl pl-6' style={{ color: textColor }}>
            All Medication
          </Text>
        </View>
      </View>

      {/* Medicines List */}
      <ScrollView className='p-4'>
        {medicines.length === 0 ? (
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 60 }}>
            <MaterialIcons name="medication" size={64} color={emptyTextColor} />
            <Text style={{ color: emptyTextColor, fontSize: 16, marginTop: 16, fontFamily: 'SpaceGrotesk-Regular' }}>
              No medications added yet
            </Text>
          </View>
        ) : (
          medicines.map((med) => (
            <MedicineComponent
              key={med.id}
              name={med.name}
              dose={med.dose}
              time={med.time.join(' & ')}
              isTaken={med.isTaken}
              onToggle={() => toggleTaken(med.id)}
              darkMode={isDark}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default AllMeds;
