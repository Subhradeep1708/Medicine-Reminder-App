import { ScrollView, Text, View } from "react-native";
import "../../../global.css"
import CircularProgressBar from '@/components/CircularProgressBar'
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from "@/constants/color";
import QuickActionCard from "@/components/QuickActionCard";
import MedicineComponent from "@/components/MedicineComponent";
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router';
import DrawerButton from "@/components/DrawerButton";
import useMedicineStore from "@/store/medicineStore";
import { useContext } from "react";
import { ThemeContext } from "../../_layout"; // make sure path is correct

const Home = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { isDark } = useContext(ThemeContext);

  const medicines = useMedicineStore((state) => state.medicines);
  const toggleTaken = useMedicineStore((state) => state.toggleTaken);

  // Dynamic colors based on theme
  const bgColor = isDark ? "#121212" : COLORS.background;
  const textColor = isDark ? "#fff" : "#141414";
  const cardBgColor = isDark ? "#1e1e1e" : "#f0f0f0";
  const topSectionBg = isDark ? "#1f451f" : "#16a34a"; // dark green variant

  return (
    <ScrollView
      style={{
        backgroundColor: bgColor,
      }}
      contentContainerStyle={{ paddingBottom: 98 }}
      showsVerticalScrollIndicator={false}
    >

      {/* Top Circular Progress Bar */}
      <View className="flex-1 items-center p-2 rounded-b-[37] pt-6" style={{ backgroundColor: topSectionBg }}>
        <View className=" w-full flex-row justify-between p-4 " >
          <DrawerButton />
          <Text className="font-spaceBold text-2xl" style={{ color: "#fff" }}>Daily Progress</Text>
          <View className="rounded-lg" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            padding: 5,
            borderRadius: 10,
            margin: 2
          }}>
            <Ionicons name="notifications-outline" size={27} color={"white"} />
          </View>
        </View>
        <CircularProgressBar />
      </View>

      {/* Quick Action Section */}
      <Text className="mt-6 font-spaceBold text-2xl p-4" style={{ color: textColor }}>Quick Actions</Text>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="space-x-2 px-2 "
      >
        <QuickActionCard
          iconName={'add-circle-outline'}
          text={`Add\nMedication`}
          route={'/(drawer)/addmedication'}
          iconBg="bg-blue-500"
          darkMode={isDark} // pass dark mode prop
        />
        <QuickActionCard
          iconName={'calendar-outline'}
          text={'Search\nDose'}
          route={'/(tabs)/calendar'}
          iconBg="bg-orange-600"
          darkMode={isDark}
        />
        <QuickActionCard
          iconName={'time-outline'}
          text={'Log\nHistory'}
          route={'/(drawer)/allMeds'}
          iconBg="bg-cyan-600"
          darkMode={isDark}
        />
        <QuickActionCard
          iconName={'medical-outline'}
          text={'Refill Tracker'}
          iconBg="bg-pink-500"
          darkMode={isDark}
        />
      </ScrollView>

      <Text className="mt-6 font-spaceBold text-2xl p-4" style={{ color: textColor }}>
        Today&apos;s Schedule
      </Text>

      {medicines.length > 0 && medicines.slice().reverse().map((med) =>
        (<MedicineComponent
          key={med.id}
          name={med.name}
          dose={med.dose}
          time={med.time.join(' & ')}
          isTaken={med.isTaken}
          onToggle={() => toggleTaken(med.id)}
          darkMode={isDark} // pass dark mode prop
        />)
      )}

    </ScrollView>
  );
}

export default Home;
