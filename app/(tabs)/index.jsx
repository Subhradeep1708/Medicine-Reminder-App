import { Text, View } from "react-native";
import "../../global.css"
import CircularProgressBar from '@/components/CircularProgressBar'
export default function Index() {
  return (
    <View
      className="flex-1 justify-center items-center bg-slate-900"
    >
      <CircularProgressBar />
    </View>
  );
}
