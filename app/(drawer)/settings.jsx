import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Switch,
    Alert,
    StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router'; // Import the router object

const SettingsScreen = () => {
    const [settings, setSettings] = useState({
        notifications: true,
        refillReminders: true,
        soundEnabled: true,
        vibrationEnabled: true,
        theme: 'light', // 'light', 'dark', 'auto'
        reminderInterval: 5, // minutes before medication time
        snoozeTime: 10, // minutes
    });

    const [loading, setLoading] = useState(true);

    // Load settings from AsyncStorage
    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const savedSettings = await AsyncStorage.getItem('appSettings');
            if (savedSettings) {
                setSettings(JSON.parse(savedSettings));
            }
            setLoading(false);
        } catch (error) {
            console.error('Error loading settings:', error);
            setLoading(false);
        }
    };

    // Save settings to AsyncStorage
    const saveSettings = async (newSettings) => {
        try {
            await AsyncStorage.setItem('appSettings', JSON.stringify(newSettings));
            setSettings(newSettings);
        } catch (error) {
            console.error('Error saving settings:', error);
            Alert.alert('Error', 'Failed to save settings');
        }
    };

    const handleToggle = (key) => {
        const newSettings = { ...settings, [key]: !settings[key] };
        saveSettings(newSettings);
    };

    const handleThemeChange = () => {
        const themes = ['light', 'dark', 'auto'];
        const currentIndex = themes.indexOf(settings.theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        const newSettings = { ...settings, theme: themes[nextIndex] };
        saveSettings(newSettings);
    };

    const handleReminderIntervalChange = () => {
        const intervals = [5, 10, 15, 30, 60];
        const currentIndex = intervals.indexOf(settings.reminderInterval);
        const nextIndex = (currentIndex + 1) % intervals.length;
        const newSettings = { ...settings, reminderInterval: intervals[nextIndex] };
        saveSettings(newSettings);
    };

    const handleSnoozeTimeChange = () => {
        const snoozeTimes = [5, 10, 15, 30];
        const currentIndex = snoozeTimes.indexOf(settings.snoozeTime);
        const nextIndex = (currentIndex + 1) % snoozeTimes.length;
        const newSettings = { ...settings, snoozeTime: snoozeTimes[nextIndex] };
        saveSettings(newSettings);
    };

    const clearAllData = () => {
        Alert.alert(
            'Clear All Data',
            'Are you sure you want to clear all medication data? This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Clear',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await AsyncStorage.removeItem('medications');
                            Alert.alert('Success', 'All medication data has been cleared');
                        } catch (error) {
                            Alert.alert('Error', 'Failed to clear data');
                        }
                    },
                },
            ]
        );
    };

    const resetSettings = () => {
        Alert.alert(
            'Reset Settings',
            'Reset all settings to default values?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Reset',
                    onPress: () => {
                        const defaultSettings = {
                            notifications: true,
                            refillReminders: true,
                            soundEnabled: true,
                            vibrationEnabled: true,
                            theme: 'light',
                            reminderInterval: 5,
                            snoozeTime: 10,
                        };
                        saveSettings(defaultSettings);
                    },
                },
            ]
        );
    };

    const SettingItem = ({ icon, title, subtitle, rightComponent, onPress }) => (
        <TouchableOpacity style={styles.settingItem} onPress={onPress}>
            <View style={styles.settingLeft}>
                <Ionicons name={icon} size={24} color="#2E7D32" style={styles.settingIcon} />
                <View style={styles.settingText}>
                    <Text style={styles.settingTitle}>{title}</Text>
                    {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
                </View>
            </View>
            {rightComponent}
        </TouchableOpacity>
    );

    const SectionHeader = ({ title }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading settings...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#4CAF50" />
            
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()} // Changed from navigation.goBack()
                >
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                
                {/* Notification Settings */}
                <SectionHeader title="Notifications" />
                
                <SettingItem
                    icon="notifications-outline"
                    title="Enable Notifications"
                    subtitle="Receive medication reminders"
                    rightComponent={
                        <Switch
                            value={settings.notifications}
                            onValueChange={() => handleToggle('notifications')}
                            trackColor={{ false: '#ccc', true: '#4CAF50' }}
                            thumbColor={settings.notifications ? '#fff' : '#f4f3f4'}
                        />
                    }
                />

                <SettingItem
                    icon="medical-outline"
                    title="Refill Reminders"
                    subtitle="Get notified when medication is running low"
                    rightComponent={
                        <Switch
                            value={settings.refillReminders}
                            onValueChange={() => handleToggle('refillReminders')}
                            trackColor={{ false: '#ccc', true: '#4CAF50' }}
                            thumbColor={settings.refillReminders ? '#fff' : '#f4f3f4'}
                        />
                    }
                />

                <SettingItem
                    icon="volume-high-outline"
                    title="Sound"
                    subtitle="Play sound with notifications"
                    rightComponent={
                        <Switch
                            value={settings.soundEnabled}
                            onValueChange={() => handleToggle('soundEnabled')}
                            trackColor={{ false: '#ccc', true: '#4CAF50' }}
                            thumbColor={settings.soundEnabled ? '#fff' : '#f4f3f4'}
                        />
                    }
                />

                <SettingItem
                    icon="phone-portrait-outline"
                    title="Vibration"
                    subtitle="Vibrate device for notifications"
                    rightComponent={
                        <Switch
                            value={settings.vibrationEnabled}
                            onValueChange={() => handleToggle('vibrationEnabled')}
                            trackColor={{ false: '#ccc', true: '#4CAF50' }}
                            thumbColor={settings.vibrationEnabled ? '#fff' : '#f4f3f4'}
                        />
                    }
                />

                {/* Appearance Settings */}
                <SectionHeader title="Appearance" />
                
                <SettingItem
                    icon="color-palette-outline"
                    title="App Theme"
                    subtitle={`Current: ${settings.theme.charAt(0).toUpperCase() + settings.theme.slice(1)}`}
                    onPress={handleThemeChange}
                    rightComponent={
                        <Ionicons name="chevron-forward" size={20} color="#999" />
                    }
                />

                {/* Reminder Settings */}
                <SectionHeader title="Reminders" />
                
                <SettingItem
                    icon="time-outline"
                    title="Reminder Interval"
                    subtitle={`Notify ${settings.reminderInterval} minutes before medication time`}
                    onPress={handleReminderIntervalChange}
                    rightComponent={
                        <View style={styles.valueContainer}>
                            <Text style={styles.valueText}>{settings.reminderInterval}m</Text>
                            <Ionicons name="chevron-forward" size={20} color="#999" />
                        </View>
                    }
                />

                <SettingItem
                    icon="alarm-outline"
                    title="Snooze Time"
                    subtitle={`Snooze reminders for ${settings.snoozeTime} minutes`}
                    onPress={handleSnoozeTimeChange}
                    rightComponent={
                        <View style={styles.valueContainer}>
                            <Text style={styles.valueText}>{settings.snoozeTime}m</Text>
                            <Ionicons name="chevron-forward" size={20} color="#999" />
                        </View>
                    }
                />

                {/* Data Management */}
                <SectionHeader title="Data Management" />
                
                <SettingItem
                    icon="trash-outline"
                    title="Clear All Data"
                    subtitle="Remove all saved medications"
                    onPress={clearAllData}
                    rightComponent={
                        <Ionicons name="chevron-forward" size={20} color="#ff4444" />
                    }
                />

                <SettingItem
                    icon="refresh-outline"
                    title="Reset Settings"
                    subtitle="Restore default settings"
                    onPress={resetSettings}
                    rightComponent={
                        <Ionicons name="chevron-forward" size={20} color="#999" />
                    }
                />

                {/* About Section */}
                <SectionHeader title="About" />
                
                <SettingItem
                    icon="help-circle-outline"
                    title="Help & Support"
                    subtitle="Get help using the app"
                    onPress={() => router.navigate('Help')} // Changed from navigation.navigate('Help')
                    rightComponent={
                        <Ionicons name="chevron-forward" size={20} color="#999" />
                    }
                />

                <SettingItem
                    icon="information-circle-outline"
                    title="About RemindRx"
                    subtitle="Version 1.0.0"
                    onPress={() => router.navigate('About')} // Changed from navigation.navigate('About')
                    rightComponent={
                        <Ionicons name="chevron-forward" size={20} color="#999" />
                    }
                />

                {/* Footer spacing */}
                <View style={styles.footer} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#4CAF50',
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
    sectionHeader: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2E7D32',
        paddingHorizontal: 20,
        paddingTop: 25,
        paddingBottom: 10,
        backgroundColor: '#f8f9fa',
    },
    settingItem: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderBottomColor: '#e0e0e0',
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    settingIcon: {
        marginRight: 15,
    },
    settingText: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 2,
    },
    settingSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    valueText: {
        fontSize: 14,
        color: '#2E7D32',
        fontWeight: '500',
        marginRight: 5,
    },
    footer: {
        height: 30,
    },
});

export default SettingsScreen;