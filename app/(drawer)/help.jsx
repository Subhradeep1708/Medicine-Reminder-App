import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { ThemeContext } from '../_layout';

const faqData = [
  { question: 'How do I add a new medication?', answer: '' },
  { question: 'How do I set up reminders?', answer: '' },
  { question: 'What if I miss a dose?', answer: '' },
];

const HelpScreen = () => {
  const { isDark } = useContext(ThemeContext);

  const bgColor = isDark ? '#121212' : '#fff';
  const textColor = isDark ? '#fff' : '#141414';
  const borderColor = isDark ? '#333' : '#e0e0e0';
  const subTextColor = isDark ? '#aaa' : '#757575';

  return (
    <ScrollView style={{ backgroundColor: bgColor, flex: 1, paddingTop: 28, paddingHorizontal: 8 }}>
      <View style={{ paddingVertical: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontFamily: 'SpaceGrotesk-Bold', color: textColor, flex: 1, textAlign: 'center', padding: 8 }}>Help</Text>
      </View>

      <Text style={{ fontSize: 22, fontWeight: 'bold', color: textColor, paddingHorizontal: 16, paddingTop: 20, paddingBottom: 12 }}>Frequently Asked Questions</Text>
      <View style={{ paddingHorizontal: 16, gap: 12 }}>
        {faqData.map((item, index) => (
          <View key={index} style={{ borderWidth: 1, borderColor: borderColor, borderRadius: 12, padding: 12 }}>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 14, fontFamily: 'SpaceGrotesk-Medium', color: textColor }}>{item.question}</Text>
              <Ionicons name="chevron-down" size={20} color={textColor} />
            </TouchableOpacity>
            {item.answer ? (
              <Text style={{ fontSize: 14, color: subTextColor, paddingTop: 8 }}>{item.answer}</Text>
            ) : null}
          </View>
        ))}
      </View>

      <Text style={{ fontSize: 22, fontWeight: 'bold', color: textColor, paddingHorizontal: 16, paddingTop: 20, paddingBottom: 12 }}>Tutorial</Text>
      <View style={{ backgroundColor: bgColor, minHeight: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 16, color: textColor, flex: 1, overflow: 'hidden' }}>Watch our tutorial video</Text>
        <Ionicons name="play" size={24} color={textColor} />
      </View>

      <Text style={{ fontSize: 22, fontWeight: 'bold', color: textColor, paddingHorizontal: 16, paddingTop: 20, paddingBottom: 12 }}>Contact Support</Text>
      <View style={{ backgroundColor: bgColor, minHeight: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 16, color: textColor, flex: 1, overflow: 'hidden' }}>Email us</Text>
        <Ionicons name="mail" size={24} color={textColor} />
      </View>

      <View style={{ height: 20, backgroundColor: bgColor }} />
    </ScrollView>
  );
};

export default HelpScreen;
