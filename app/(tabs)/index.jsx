import { ScrollView, Text, View } from "react-native";
import "../../global.css"
import CircularProgressBar from '@/components/CircularProgressBar'
import { Ionicons } from '@expo/vector-icons';

const Home = () => {
  return (
    <>
      <ScrollView>
        <View className="flex-1 items-center bg-green-500 p-2 rounded-b-[40]">
          <View className=" w-full flex-row justify-between p-4" >
            <Text className=" font-spaceSemiBold text-2xl text-white">Daily Progress</Text>
            <Ionicons name="notifications-outline" size={30} color={"white"} />
          </View>
          <View className="mt-4 ">
            <CircularProgressBar />
          </View>
        </View>
      </ScrollView>
    </>
  );
}
export default Home;
