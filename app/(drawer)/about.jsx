import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ThemeContext } from '../_layout';

const About = () => {
  const { isDark } = useContext(ThemeContext);

  // Colors dynamically based on theme
  const bgColor = isDark ? '#121212' : '#f8f9fa';
  const textColor = isDark ? '#ffffff' : '#141414';
  const cardBgColor = isDark ? '#1e1e1e' : '#ffffff';
  const borderColor = isDark ? '#333333' : '#e5e7eb';
  const headerBgColor = isDark ? '#1e1e1e' : '#4CAF50';
  const headerTextColor = isDark ? '#ffffff' : '#ffffff';
  const sectionTitleColor = isDark ? '#4CAF50' : '#2E7D32';

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar 
        barStyle={isDark ? "light-content" : "dark-content"} 
        backgroundColor={headerBgColor} 
      />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: headerBgColor }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={headerTextColor} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: headerTextColor }]}>About</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* App Info Section */}
        <View style={[styles.appInfoSection, { backgroundColor: cardBgColor }]}>
          <View style={[styles.appIcon, { backgroundColor: isDark ? '#2E7D32' : '#E8F5E8' }]}>
            <Ionicons name="medical" size={60} color="#4CAF50" />
          </View>
          <Text style={[styles.appName, { color: sectionTitleColor }]}>Medicine Tracker</Text>
          <Text style={[styles.appTagline, { color: isDark ? '#cccccc' : '#666666' }]}>Your Personal Medication Companion</Text>
        </View>

        {/* Section 1 - Medicine Tracker */}
        <View style={[styles.section, { backgroundColor: cardBgColor }]}>
          <Text style={[styles.sectionTitle, { color: sectionTitleColor }]}>Medicine Tracker</Text>
          <Text style={[styles.description, { color: textColor }]}>
            Medicine Tracker is designed to help you manage your medications effectively.
            It allows you to track your dosages, set reminders, and monitor your progress.
            Our goal is to make medication management simple and stress-free.
          </Text>
        </View>

        {/* Section 2 - Developers */}
        <View style={[styles.section, { backgroundColor: cardBgColor }]}>
          <Text style={[styles.sectionTitle, { color: sectionTitleColor }]}>Developers</Text>
          <Text style={[styles.description, { color: textColor }]}>
            This app was developed by Subhradeep Sardar.
            I strive to provide a reliable and user-friendly tool for managing your medications.
          </Text>
        </View>

        {/* Section 3 - Acknowledgments */}
        <View style={[styles.section, { backgroundColor: cardBgColor }]}>
          <Text style={[styles.sectionTitle, { color: sectionTitleColor }]}>Acknowledgments</Text>
          <Text style={[styles.description, { color: textColor }]}>
            We would like to thank our users for their valuable feedback and support.
            Your input helps us continuously improve Medicine Tracker and make it a better resource for everyone.
          </Text>
        </View>

        <View style={styles.footer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    fontFamily: 'Space-Bold',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  appInfoSection: {
    alignItems: 'center',
    paddingVertical: 30,
    marginBottom: 20,
  },
  appIcon: {
    width: 100,
    height: 100,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  appName: {
    fontSize: 28,
    fontFamily: 'Space-Bold',
    marginBottom: 5,
  },
  appTagline: {
    fontSize: 16,
    fontFamily: 'Space-Regular',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Space-Bold',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Space-Regular',
    lineHeight: 22,
  },
  footer: {
    height: 20,
  },
});

export default About;