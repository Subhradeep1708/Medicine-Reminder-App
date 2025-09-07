import { ScrollView, Text, View, TouchableOpacity, StyleSheet, StatusBar, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { ThemeContext } from '../_layout';
import { router } from 'expo-router'; // Import the router object

const faqData = [
  { question: 'How do I add a new medication?', answer: 'Tap the "Add Medication" button on the home screen. Fill in the medication name, dosage, frequency, and set your reminder times. Don\'t forget to enable notifications!' },
  { question: 'How do I set up reminders?', answer: 'When adding a medication, you can set multiple reminder times. Choose from preset times or set custom times. Make sure to enable the "Reminders" toggle to receive notifications.' },
  { question: 'What if I miss a dose?', answer: 'If you miss a dose, the app will show it as "missed" in your history. You can mark it as taken late or skip it entirely. Always consult your healthcare provider about missed doses.' },
];

const HelpScreen = () => {
  const { isDark } = useContext(ThemeContext);
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const resourceLinks = [
    {
      title: 'Watch our tutorial video',
      icon: 'play',
      action: () => Alert.alert('Tutorial Video', 'Link to tutorial video will open.'),
      color: isDark ? '#fff' : '#141414'
    },
    {
      title: 'Email us',
      icon: 'mail',
      action: () => Linking.openURL('mailto:support@app.com'),
      color: isDark ? '#fff' : '#141414'
    },
  ];

  const bgColor = isDark ? '#121212' : '#f8f9fa';
  const cardBgColor = isDark ? '#1e1e1e' : '#fff';
  const textColor = isDark ? '#fff' : '#141414';
  const subTextColor = isDark ? '#aaa' : '#757575';
  const headerBgColor = isDark ? '#333' : '#4CAF50';
  const sectionHeaderTextColor = isDark ? '#81c784' : '#2E7D32';
  const iconColor = isDark ? '#fff' : '#666';

  const ResourceLink = ({ resource }) => (
    <TouchableOpacity 
      style={[styles.resourceItem, { backgroundColor: cardBgColor }]}
      onPress={resource.action}
    >
      <Ionicons name={resource.icon} size={24} color={resource.color} />
      <Text style={[styles.resourceText, { color: textColor }]}>{resource.title}</Text>
      <Ionicons name="chevron-forward" size={20} color={iconColor} />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={headerBgColor} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: headerBgColor }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* FAQ Sections */}
        <Text style={[styles.sectionHeaderText, { color: sectionHeaderTextColor }]}>Frequently Asked Questions</Text>
        <View style={styles.faqContainer}>
          {faqData.map((item, index) => (
            <View key={index} style={[styles.faqSection, { backgroundColor: cardBgColor }]}>
              <TouchableOpacity
                style={styles.faqHeader}
                onPress={() => toggleSection(index)}
              >
                <Text style={[styles.faqQuestion, { color: textColor }]}>{item.question}</Text>
                <Ionicons name={expandedSections[index] ? 'chevron-up' : 'chevron-down'} size={20} color={iconColor} />
              </TouchableOpacity>
              {expandedSections[index] && item.answer ? (
                <View style={styles.faqContent}>
                  <Text style={[styles.faqAnswer, { color: subTextColor }]}>{item.answer}</Text>
                </View>
              ) : null}
            </View>
          ))}
        </View>
        
        {/* Additional Resources */}
        <View style={styles.resourcesContainer}>
          <Text style={[styles.sectionHeaderText, { color: sectionHeaderTextColor }]}>Tutorial</Text>
          <ResourceLink resource={resourceLinks[0]} />
        </View>

        <View style={styles.resourcesContainer}>
          <Text style={[styles.sectionHeaderText, { color: sectionHeaderTextColor }]}>Contact Support</Text>
          <ResourceLink resource={resourceLinks[1]} />
        </View>
        
        <View style={styles.footer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  quickActionsContainer: {
    paddingBottom: 10,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quickActionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  faqContainer: {
    paddingHorizontal: 15,
  },
  faqSection: {
    marginHorizontal: 5,
    marginBottom: 10,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    paddingRight: 10,
  },
  faqContent: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  faqAnswer: {
    fontSize: 14,
    lineHeight: 20,
  },
  resourcesContainer: {
    paddingBottom: 20,
  },
  resourceItem: {
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  resourceText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 15,
  },
  noticeContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    borderLeftWidth: 4,
  },
  noticeText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    lineHeight: 20,
  },
  noticeTitle: {
    fontWeight: '600',
  },
  footer: {
    height: 20,
  },
});

export default HelpScreen;