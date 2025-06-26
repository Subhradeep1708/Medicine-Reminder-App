import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import "../../global.css"
import CircularProgressBar from '@/components/CircularProgressBar'
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from "@/constants/color";
import QuickActionCard from "@/components/QuickActionCard";
import MedicineComponent from "@/components/MedicineComponent";
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';


const Home = () => {
  const insets = useSafeAreaInsets()
  return (
    <>
      <ScrollView
        style={{
          backgroundColor: COLORS.background,
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 items-center bg-green-700 p-2 rounded-b-[37]">
          <View className=" w-full flex-row justify-between p-4 " >
            <Text className=" font-spaceBold text-2xl text-white">Daily Progress</Text>
            <View className=" rounded-lg p-1 "
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
            >
              <Ionicons name="notifications-outline" size={27} color={"white"} />
            </View>
          </View>
          <View className="mt-1 ">
            <CircularProgressBar />
          </View>
        </View>
        <Text className=" font-spaceBold text-2xl text-black p-4">Quick Actions</Text>

        <View className="flex-row p-2 justify-evenly" >

          <QuickActionCard
            iconName={'add-circle-outline'}
            bgColorFrom={'#149e05'}
            bgColorTo={'#127207'}
            text={'Add Medication'}
          />

          <QuickActionCard
            iconName={'calendar-outline'}
            bgColorFrom={'#4e6ee2'}
            bgColorTo={'#3156de'}
            text={'Search Dose'}
          />

        </View>

        <View className="flex-row p-2 justify-evenly" >
          <QuickActionCard iconName={'time-outline'} bgColorFrom={'#d41983'} bgColorTo={'#bb0c6f'} text={'Log History'} />
          <QuickActionCard iconName={'medical-outline'} bgColorFrom={'#d4401f'} bgColorTo={'#c13515'} text={'Refill Tracker'} />
        </View>


        <Text className=" font-spaceBold text-2xl text-black p-4">Today&apos;s Schedule</Text>
        <MedicineComponent />
        <MedicineComponent />
        <MedicineComponent />
        <MedicineComponent />
        <MedicineComponent />

      </ScrollView>

    </>
  );
}
export default Home;
