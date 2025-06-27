import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const faqData = [
  { question: 'How do I add a new medication?', answer: '' },
  { question: 'How do I set up reminders?', answer: '' },
  { question: 'What if I miss a dose?', answer: '' },
];

const HelpScreen = () => {
  return (
    <ScrollView className="bg-white flex-1 pt-7 p-2">
      <View className="p-4 pb-2 flex-row justify-between items-center">
        {/* <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#141414" />
        </TouchableOpacity> */}
        <Text className="text-xl font-spaceBold p-4 text-[#141414] flex-1 text-center">Help</Text>
      </View>

      <Text className="text-[22px] font-bold text-[#141414] px-4 pt-5 pb-3">Frequently Asked Questions</Text>
      <View className="px-4 gap-3">
        {faqData.map((item, index) => (
          <View
            key={index}
            className="border border-[#e0e0e0] rounded-xl p-3"
          >
            <TouchableOpacity className="flex-row justify-between items-center">
              <Text className="text-sm font-medium text-[#141414]">{item.question}</Text>
              <Ionicons name="chevron-down" size={20} color="#141414" />
            </TouchableOpacity>
            {item.answer ? (
              <Text className="text-sm text-[#757575] pt-2">{item.answer}</Text>
            ) : null}
          </View>
        ))}
      </View>

      <Text className="text-[22px] font-bold text-[#141414] px-4 pt-5 pb-3">Tutorial</Text>
      <View className="bg-white min-h-[56px] flex-row items-center justify-between px-4">
        <Text className="text-base text-[#141414] flex-1 truncate">Watch our tutorial video</Text>
        <Ionicons name="play" size={24} color="#141414" />
      </View>

      <Text className="text-[22px] font-bold text-[#141414] px-4 pt-5 pb-3">Contact Support</Text>
      <View className="bg-white min-h-[56px] flex-row items-center justify-between px-4">
        <Text className="text-base text-[#141414] flex-1 truncate">Email us</Text>
        <Ionicons name="mail" size={24} color="#141414" />
      </View>

      <View className="h-5 bg-white" />
    </ScrollView>
  );
};

export default HelpScreen;
