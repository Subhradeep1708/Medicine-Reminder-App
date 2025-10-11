import { View, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity, TextInput, Platform, Alert } from 'react-native'
import { useState, useContext } from 'react'
import { COLORS } from '@/constants/color'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import AddMedsCard from '../../components/AddMedsChooseCard'
import Slider from '@react-native-community/slider';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Switch } from 'react-native-paper'
import { nanoid } from 'nanoid/non-secure'
import useMedicineStore from '@/store/medicineStore'
import { ThemeContext } from '../_layout' // import your ThemeContext
import { scheduleMedicineNotifications } from '@/utils/notificationManager'

const MedicationScreen = () => {
    const { addMedicine } = useMedicineStore();
    const { isDark } = useContext(ThemeContext); // dark mode value

    // all the datas 
    const [name, setName] = useState("")
    const [dose, setDose] = useState("")
    const [sliderValue, setSliderValue] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [time, setTime] = useState([]);
    const [tempValue, setTempValue] = useState(0);
    const [selectedTimes, setSelectedTimes] = useState("")
    const [isReminderSwitchOn, setIsReminderSwitchOn] = useState(false);
    const [isRefillSwitchOn, setIsRefillSwitchOn] = useState(false);
    const [note, setNote] = useState("")

    const onToggleReminderSwitch = () => setIsReminderSwitchOn(!isReminderSwitchOn);
    const onToggleRefillSwitch = () => setIsRefillSwitchOn(!isRefillSwitchOn);

    const howOftenOptions = [
        { id: 1, text: 'Once daily', icon: 'sunny-outline' },
        { id: 2, text: 'Twice daily', icon: 'sync-outline' },
        { id: 3, text: 'Thrice daily', icon: 'time-outline' },
        { id: 4, text: 'Four times daily', icon: 'repeat-outline' },
        { id: 5, text: 'Five times daily', icon: 'reload-outline' },
        { id: 6, text: 'As needed', icon: 'calendar-outline' },
    ]

    const resetForm = () => {
        setName('');
        setDose('');
        setSliderValue(0);
        setStartDate(new Date());
        setTime([new Date()]);
        setTempValue(0);
        setSelectedTimes('');
        setIsReminderSwitchOn(false);
        setIsRefillSwitchOn(false);
        setNote('');
    };

    const handleSubmit = async () => {
        if (!name.trim() || !dose.trim() || sliderValue <= 0 || time.length === 0) {
            Alert.alert("Missing Information", "Please fill out all required fields.");
            return;
        }

        const newMedicine = {
            id: nanoid(),
            name,
            dose,
            time: time.map(t => t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })),
            howOften: selectedTimes,
            howManyDays: sliderValue,
            startDate: startDate.toISOString().split('T')[0],
            isReminder: isReminderSwitchOn,
            isRefill: isRefillSwitchOn,
            note,
            isTaken: false,
            notificationIds: [],
        };

        // Schedule notifications if reminders are enabled
        if (isReminderSwitchOn) {
            try {
                const notificationIds = await scheduleMedicineNotifications(newMedicine);
                newMedicine.notificationIds = notificationIds;
                
                if (notificationIds.length > 0) {
                    Alert.alert(
                        "Success", 
                        `Medication added! ${notificationIds.length} reminder(s) scheduled.`,
                        [{ text: "OK" }]
                    );
                } else {
                    Alert.alert(
                        "Success", 
                        "Medication added, but no reminders were scheduled (check if times are in the future).",
                        [{ text: "OK" }]
                    );
                }
            } catch (error) {
                console.error("Error scheduling notifications:", error);
                Alert.alert(
                    "Partial Success", 
                    "Medication added, but there was an error scheduling reminders.",
                    [{ text: "OK" }]
                );
            }
        } else {
            Alert.alert("Success", "Medication added successfully!", [{ text: "OK" }]);
        }

        addMedicine(newMedicine);
        resetForm();
        router.back();
    }

    const showDatePicker = () => {
        DateTimePickerAndroid.open({
            value: new Date(),
            mode: 'date',
            is24Hour: true,
            display: 'calendar',
            onChange: (event, date) => {
                if (date) setStartDate(date);
            },
        });
    };

    const showTimePicker = () => {
        DateTimePickerAndroid.open({
            value: new Date(),
            mode: 'time',
            is24Hour: false,
            display: 'clock',
            onChange: (event, selectedTime) => {
                if (selectedTime instanceof Date) {
                    setTime(prev => {
                        const exists = prev.find(t => t.getHours() === selectedTime.getHours() && t.getMinutes() === selectedTime.getMinutes());
                        if (!exists) return [...prev, selectedTime];
                        return prev;
                    });
                }
            }
        })
    }

    // Dark mode styles
    const bgColor = isDark ? '#121212' : COLORS.background;
    const cardBg = isDark ? '#1e1e1e' : 'white';
    const textColor = isDark ? '#fff' : '#000';
    const subTextColor = isDark ? '#aaa' : '#000';
    const borderColor = isDark ? '#333' : COLORS.border;

    return (
        <View style={{ flex: 1, backgroundColor: bgColor }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
            >
                <ScrollView
                    contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 180 : 140 }}
                    keyboardShouldPersistTaps="handled"
                    removeClippedSubviews={true}
                >
                    {/* header */}
                    <View style={{ backgroundColor: '#28a745', height: 98, borderBottomLeftRadius: 29, borderBottomRightRadius: 29 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 40, paddingVertical: 8, paddingHorizontal: 20 }}>
                            <TouchableOpacity
                                style={{ height: 44, width: 44, borderRadius: 22, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => router.back()}
                            >
                                <MaterialIcons name='arrow-back-ios' size={25} color={'#127207'} />
                            </TouchableOpacity>
                            <Text style={{ flex: 1, fontFamily: 'SpaceGrotesk-Bold', fontSize: 22, color: 'white', paddingLeft: 16 }}>New Medication</Text>
                        </View>
                    </View>

                    {/* drug name and dosage */}
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <View style={{ width: '90%', borderWidth: 2, borderRadius: 30, padding: 8, marginTop: 16, borderColor: borderColor, backgroundColor: cardBg }}>
                            <TextInput
                                value={name}
                                onChangeText={setName}
                                autoCapitalize="words"
                                keyboardType='default'
                                placeholder="Drug Name"
                                placeholderTextColor={subTextColor}
                                style={{ fontFamily: 'SpaceGrotesk-Regular', color: textColor }}
                            />
                        </View>
                        <View style={{ width: '90%', borderWidth: 2, borderRadius: 30, padding: 8, marginBottom: 16, borderColor: borderColor, backgroundColor: cardBg }}>
                            <TextInput
                                value={dose}
                                onChangeText={setDose}
                                keyboardType='default'
                                placeholder="Dosage (e.g. 500mg)"
                                placeholderTextColor={subTextColor}
                                style={{ fontFamily: 'SpaceGrotesk-Regular', color: textColor }}
                            />
                        </View>
                    </View>

                    {/* How Often Section */}
                    <Text style={{ fontFamily: 'SpaceGrotesk-Bold', fontSize: 22, color: textColor, padding: 16 }}>How Often?</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginHorizontal: 16, marginVertical: 8 }}>
                        {howOftenOptions.map(({ text, icon }, index) => (
                            <AddMedsCard
                                key={index}
                                icon={icon}
                                text={text}
                                selected={selectedTimes === text}
                                onPress={() => setSelectedTimes(text)}
                            />
                        ))}
                    </View>

                    {/* Date Section */}
                    <Text style={{ fontFamily: 'SpaceGrotesk-Bold', fontSize: 22, color: textColor, padding: 16 }}>For How Long?</Text>
                    <TouchableOpacity
                        onPress={showDatePicker}
                        style={{ backgroundColor: '#28a745', paddingVertical: 16, paddingHorizontal: 16, marginHorizontal: 16, marginVertical: 16, borderRadius: 16 }}
                    >
                        <Text style={{ textAlign: 'center', fontFamily: 'SpaceGrotesk-Bold', fontSize: 18, color: 'white' }}>Start On : {startDate.toDateString()}</Text>
                    </TouchableOpacity>

                    {/* Days slider */}
                    <Text style={{ fontFamily: 'SpaceGrotesk-Medium', fontSize: 18, textAlign: 'center', marginBottom: 12, color: textColor }}>For {tempValue} days</Text>
                    <Slider
                        value={sliderValue}
                        step={1}
                        minimumValue={0}
                        maximumValue={40}
                        minimumTrackTintColor="#ffffff"
                        maximumTrackTintColor="#17f455"
                        onValueChange={setTempValue}
                        onSlidingComplete={(val) => setSliderValue(Math.round(val))}
                        style={{ height: 30, marginLeft: 12, marginRight: 12 }}
                    />

                    {/* Medication Time Section */}
                    <Text style={{ fontFamily: 'SpaceGrotesk-Bold', fontSize: 22, color: textColor, padding: 16 }}>Medication Time</Text>
                    <TouchableOpacity
                        onPress={showTimePicker}
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, marginHorizontal: 16, marginVertical: 16, borderRadius: 16, borderWidth: 1, borderColor: borderColor, backgroundColor: cardBg }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ borderRadius: 30, padding: 4, height: 48, width: 48, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
                                <Ionicons name="time-outline" size={25} color="green" />
                            </View>
                            {time.length > 0 ? (
                                <Text style={{ fontFamily: 'SpaceGrotesk-Bold', fontSize: 18, marginLeft: 16, color: textColor }}>
                                    {time[time.length - 1].toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                </Text>
                            ) : (
                                <Text style={{ fontFamily: 'SpaceGrotesk-Regular', fontSize: 16, marginLeft: 16, color: subTextColor }}>No time selected</Text>
                            )}
                        </View>
                        <Ionicons name="chevron-forward-outline" size={25} color="green" />
                    </TouchableOpacity>

                    {/* Show all times */}
                    {time.length > 0 && (
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 16, gap: 8 }}>
                            {time.filter(Boolean).map((item, index) => (
                                <View key={index} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ borderRadius: 12, padding: 4, height: 32, width: 80, alignItems: 'center', justifyContent: 'center', backgroundColor: '#67e379ca' }}>
                                        <Text style={{ color: textColor }}>{item.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Reminder Switch */}
                    <View style={{ flex: 1, padding: 16, marginHorizontal: 16, marginVertical: 16, borderRadius: 16, borderWidth: 1, borderColor: borderColor, backgroundColor: cardBg }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                            <View style={{ borderRadius: 30, padding: 4, height: 48, width: 48, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
                                <Ionicons name='notifications' size={25} color={'green'} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontFamily: 'SpaceGrotesk-Bold', fontSize: 18, paddingLeft: 12, color: textColor }}>Reminders</Text>
                                <Text style={{ fontFamily: 'SpaceGrotesk-Regular', paddingLeft: 12, color: subTextColor }}>Get notified when it&apos;s time to take your medicine</Text>
                            </View>
                            <Switch value={isReminderSwitchOn} onValueChange={onToggleReminderSwitch} color='green' />
                        </View>
                    </View>

                    {/* Refill Switch */}
                    <View style={{ flex: 1, padding: 16, marginHorizontal: 16, marginVertical: 16, borderRadius: 16, borderWidth: 1, borderColor: borderColor, backgroundColor: cardBg }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                            <View style={{ borderRadius: 30, padding: 4, height: 48, width: 48, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
                                <Ionicons name='reload-outline' size={25} color={'green'} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontFamily: 'SpaceGrotesk-Bold', fontSize: 18, paddingLeft: 12, color: textColor }}>Refill Tracking</Text>
                                <Text style={{ fontFamily: 'SpaceGrotesk-Regular', paddingLeft: 12, color: subTextColor }}>Get notified when you need to refill</Text>
                            </View>
                            <Switch value={isRefillSwitchOn} onValueChange={onToggleRefillSwitch} color='green' />
                        </View>
                    </View>

                    {/* Notes */}
                    <View style={{ marginHorizontal: 16, marginVertical: 16, borderWidth: 2, borderRadius: 30, padding: 8, backgroundColor: cardBg, borderColor: borderColor }}>
                        <TextInput
                            value={note}
                            onChangeText={setNote}
                            placeholder="Add notes or special Instructions..."
                            placeholderTextColor={subTextColor}
                            multiline
                            numberOfLines={4}
                            style={{ height: 100, textAlignVertical: 'top', color: textColor, fontFamily: 'SpaceGrotesk-Regular' }}
                        />
                    </View>

                </ScrollView>

                {/* Footer Buttons */}
                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, gap: 8, backgroundColor: cardBg, borderTopWidth: 1, borderColor: borderColor, borderTopLeftRadius: 18, borderTopRightRadius: 18 }}>
                    <TouchableOpacity
                        style={{ backgroundColor: '#28a745', paddingVertical: 16, borderRadius: 16, alignItems: 'center' }}
                        onPress={handleSubmit}
                    >
                        <Text style={{ color: 'white', fontFamily: 'SpaceGrotesk-Bold', fontSize: 18 }}>Add Medication</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ borderWidth: 1.5, borderColor: '#dc3545', paddingVertical: 12, borderRadius: 16, alignItems: 'center' }}
                        onPress={() => { resetForm(); router.back() }}
                    >
                        <Text style={{ color: '#dc3545', fontFamily: 'SpaceGrotesk-Bold', fontSize: 18 }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default MedicationScreen
