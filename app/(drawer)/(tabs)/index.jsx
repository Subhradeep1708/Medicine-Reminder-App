import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import "../../../global.css"
import CircularProgressBar from '@/components/CircularProgressBar'
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from "@/constants/color";
import QuickActionCard from "@/components/QuickActionCard";
import MedicineComponent from "@/components/MedicineComponent";
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router';
import DrawerButton from "@/components/DrawerButton";
import { LinearGradient } from "expo-linear-gradient";
import MedicationScreen from '../addmedication.jsx'
const Home = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets()

  // return <MedicationScreen />

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: COLORS.background,
        }}
        contentContainerStyle={{ paddingBottom: 98 }}
        showsVerticalScrollIndicator={false}
      >


        <View className="flex-1 items-center bg-green-600 p-2 rounded-b-[37] pt-6">
          <View className=" w-full flex-row justify-between p-4 " >
            <DrawerButton />
            <Text className=" font-spaceBold text-2xl text-white align-middle">Daily Progress</Text>
            <View className="rounded-lg p-4 "
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                padding: 5,
                // backgroundColor: "#e5e5e5",
                borderRadius: 10,
                alignSelf: 'flex-start', // Optional: aligns left
                margin: 2
              }}
            >
              <Ionicons name="notifications-outline" size={27} color={"white"} className="outline-8 outline-white" />
            </View>
          </View>
          <View className="">
            <CircularProgressBar />
          </View>
        </View>
        <Text className="mt-6 font-spaceBold text-2xl text-black p-4">Quick Actions</Text>




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
          />

          <QuickActionCard
            iconName={'calendar-outline'}
            text={'Search\nDose'}
            iconBg="bg-orange-600"
          />
          <QuickActionCard
            iconName={'time-outline'}
            text={'Log\nHistory'}
            iconBg="bg-cyan-600"
          />
          <QuickActionCard
            iconName={'medical-outline'}
            text={'Refill Tracker'}
            iconBg="bg-pink-500"
          />

        </ScrollView>

      

        <Text className="mt-6 font-spaceBold text-2xl text-black p-4">
          Today&apos;s Schedule
        </Text>
        <MedicineComponent />
        <MedicineComponent />
        <MedicineComponent />
        <MedicineComponent />

      </ScrollView>

    </>
  );
}
export default Home;
