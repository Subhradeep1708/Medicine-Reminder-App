import { View, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity, TextInput, Platform } from 'react-native'
import { useState } from 'react'
import { COLORS } from '@/constants/color'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import AddMedsCard from '../../components/AddMedsChooseCard'
import Slider from '@react-native-community/slider';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Switch } from 'react-native-paper'
import { nanoid } from 'nanoid/non-secure'
import useMedicineStore from '@/store/medicineStore'

const MedicationScreen = () => {
    const { medicines, addMedicine, removeMedicine, clearAll } = useMedicineStore();

    const handleSubmit = () => {
        const newMedicine = {
            id: nanoid(),
            name: 'Paracetamol',
            dose: '500mg',
            time: ['08:00 AM', '08:00 PM'],
            howOften: 'Every 12 hours',
            startDate: '2025-07-14',
            durationDays: 5
        };
        console.log("Adding new medicine:", medicines);
        
        addMedicine(newMedicine);
        router.back();
    }


    const showDatePicker = () => {
        DateTimePickerAndroid.open({
            value: new Date(),
            mode: 'date',
            is24Hour: true,
            display: 'calendar',
            onChange: (event, date) => {
                if (date) {
                    // Handle selected date here
                    setDate(date)
                }
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
                if (selectedTime) {
                    setTime(prev => [...prev, selectedTime]);
                }
            },
        })
    }

    const [isReminderSwitchOn, setIsReminderSwitchOn] = useState(false);
    const [isRefillSwitchOn, setIsRefillSwitchOn] = useState(false);

    const onToggleReminderSwitch = () => setIsReminderSwitchOn(!isReminderSwitchOn);
    const onToggleRefillSwitch = () => setIsRefillSwitchOn(!isRefillSwitchOn);

    const [value, setValue] = useState(0);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState([new Date()]);
    const [tempValue, setTempValue] = useState(7);

    return (
        <View className="" style={{ flex: 1, backgroundColor: COLORS.background }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
            >
                <ScrollView
                    contentContainerStyle={{
                        paddingBottom: Platform.OS === 'ios' ? 180 : 140,
                    }}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* header */}
                    <View className='bg-green-700 h-[98] rounded-b-[29]'>
                        <View className='flex-row items-center mt-10 py-2 px-5 '>
                            <TouchableOpacity
                                className='h-11 w-11 rounded-full bg-white items-center justify-center'
                                onPress={() => router.back()}
                            >
                                <MaterialIcons name='arrow-back-ios' size={25}
                                    color={'#127207'}
                                    className='items-center justify-center content-center left-1'
                                />
                            </TouchableOpacity>
                            <Text className='flex-1 font-spaceBold text-2xl pl-6 text-white '>New Medication</Text>
                        </View>
                    </View>

                    {/* drug name and dosage */}
                    <View className="flex-1 items-center justify-center gap-2">
                        <View
                            className="w-[90%] border-2 rounded-3xl p-2 mt-2"
                            style={{
                                borderColor: COLORS.border,
                                backgroundColor: 'white'
                            }}
                        >
                            <TextInput
                                value={""}
                                className="font-spaceRegular"
                                autoCapitalize="none"
                                keyboardType='default'
                                placeholder="Drug Name"
                            />
                        </View>
                        <View className="w-[90%] border-2 rounded-3xl p-2 mb-4" style={{
                            borderColor: COLORS.border,
                            backgroundColor: 'white'
                        }}>
                            <TextInput
                                value={""}
                                className="font-spaceRegular"
                                keyboardType='default'
                                placeholder="Dosage (e.g. 500mg)"
                            // onChangeText={(password) => setPassword(password)}
                            />
                        </View>
                    </View>

                    {/* How Often Section */}
                    <Text className=" font-spaceBold text-2xl text-black p-4">How Often?</Text>
                    <View>
                        <View className='flex-row justify-around p-2'>
                            <AddMedsCard icon={'sunny-outline'} text={'Once daily'} />
                            <AddMedsCard icon={'sync-outline'} text={'Twice daily'} />
                        </View>
                        <View className='flex-row justify-around p-2'>
                            <AddMedsCard icon={'time-outline'} text={'Thrice daily'} />
                            <AddMedsCard icon={'repeat-outline'} text={'Four times daily'} />
                        </View>
                        <View className='flex-1 justify-around p-2 flex-row'>
                            <AddMedsCard icon={'reload-outline'} text={'Five times daily'} />
                            <AddMedsCard icon={'calendar-outline'} text={'As nedded'} />
                        </View>
                    </View>

                    {/* Time Section */}
                    <Text className=" font-spaceBold text-2xl text-black p-4">For How Long?</Text>

                    <TouchableOpacity
                        onPress={showDatePicker}
                        className="bg-green-700 px-4 py-4 mx-4 my-4 rounded-xl   "
                    >
                        <Text
                            className='text-white font-spaceBold text-center text-xl'
                        >Start On : {date.toDateString()}</Text>
                    </TouchableOpacity>

                    <Text
                        className='font-spaceMedium flex-1 mb-3 text-center text-xl'
                    >
                        For {tempValue} days
                    </Text>
                    <Slider
                        value={value}
                        // className='h-10'
                        step={1}
                        minimumValue={0}
                        maximumValue={40}
                        minimumTrackTintColor="#ffffff"
                        maximumTrackTintColor="#17f455"
                        onValueChange={setTempValue}
                        onSlidingComplete={(val) => {
                            setValue(Math.round(val));
                        }}
                        style={{ height: 30, marginLeft: 12, marginRight: 12 }}
                    />

                    <Text className=" font-spaceBold text-2xl text-black p-4">Medication Time</Text>

                    <TouchableOpacity
                        onPress={showTimePicker}
                        className="flex-row items-center justify-between px-4 py-4 mx-4 my-4 rounded-xl"
                        style={{
                            borderColor: COLORS.border,
                            backgroundColor: 'white'
                        }}
                    >
                        {/* Left Section: Icon + Time */}
                        <View className="flex-row items-center">
                            <View
                                className="rounded-full p-1 h-12 w-12 items-center justify-center"
                                style={{ backgroundColor: '#f0f0f0' }}
                            >
                                <Ionicons name="time-outline" size={25} color="green" />
                            </View>
                            <Text className="font-spaceBold text-xl text-center ml-4">
                                {time[time.length - 1].toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true,
                                })}
                            </Text>
                        </View>

                        {/* Right Arrow Icon */}
                        <Ionicons name="chevron-forward-outline" size={25} color="green" />
                    </TouchableOpacity>

                    <View className='flex-row flex-wrap mx-4 gap-2 '>
                        {time.map((item, index) => (
                            <View key={index} className="items-center justify-center">
                                <View className="rounded-lg p-1 h-8 w-20 items-center justify-center"
                                    style={{ backgroundColor: '#67e379ca' }}
                                >
                                    <Text className="text-center">
                                        {item.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>


                    {/* Reminder switch */}
                    <View
                        className="flex-1 px-4 py-4 mx-4 my-4 rounded-xl  "
                        style={{
                            borderColor: COLORS.border,
                            backgroundColor: 'white'
                        }}
                    >
                        <View className='flex-row items-center justify-between gap-2'>
                            <View className="rounded-full p-1 h-12 w-12 items-center justify-center "
                                style={{ backgroundColor: '#f0f0f0' }}
                            >
                                <Ionicons name='notifications' size={25} color={'green'} />
                            </View>
                            <View className='flex-1'>

                                <Text
                                    className='ml-0 font-spaceBold text-xl pl-3'
                                >
                                    Reminders
                                </Text>
                                <Text
                                    className='ml-0 font-spaceRegular  pl-3'
                                >
                                    Get notified when it&apos;s time to take your medicine
                                </Text>
                            </View>
                            <Switch value={isReminderSwitchOn} onValueChange={onToggleReminderSwitch}
                                color='green'
                            />
                        </View>
                    </View>

                    {/* Refill switch */}
                    <View
                        className="flex-1 px-4 py-4 mx-4 my-4 rounded-xl  "
                        style={{
                            borderColor: COLORS.border,
                            backgroundColor: 'white'
                        }}
                    >
                        <View className='flex-row items-center justify-between gap-2'>
                            <View className="rounded-full p-1 h-12 w-12 items-center justify-center "
                                style={{ backgroundColor: '#f0f0f0' }}
                            >
                                <Ionicons name='reload-outline' size={25} color={'green'} />
                            </View>
                            <View className='flex-1'>

                                <Text
                                    className='ml-0 font-spaceBold text-xl pl-3'
                                >
                                    Refill Tracking
                                </Text>
                                <Text
                                    className='ml-0 font-spaceRegular  pl-3'
                                >
                                    Get notified when you need to refill
                                </Text>
                            </View>
                            <Switch value={isRefillSwitchOn} onValueChange={onToggleRefillSwitch}
                                color='green'
                            />
                        </View>
                    </View>
                    <View
                        className="mx-4 my-4 border-2 rounded-3xl p-2"
                        style={{
                            borderColor: COLORS.border,
                            backgroundColor: 'white'
                        }}
                    >
                        <TextInput
                            value={""}
                            className="font-spaceRegular"
                            autoCapitalize="none"
                            keyboardType='default'
                            placeholder="Add notes or special Instructions..."
                            multiline
                        />
                    </View>


                </ScrollView>
                <View
                    className="flex-col justify-between px-4 py-4 bg-white"
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        borderTopWidth: 1,
                        borderColor: COLORS.border,
                        borderTopLeftRadius: 18,
                        borderTopRightRadius: 18,
                        gap: 8,
                    }}
                >

                    <TouchableOpacity
                        className=" gap-y-6 bg-green-700 py-4 rounded-xl items-center"
                        onPress={handleSubmit}
                    >
                        <Text className="text-white font-spaceBold text-lg">Add Medication</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className=" gap-y-6 border-[2px] border-red-700  py-3 rounded-xl items-center"
                        onPress={() => {/* Cancel or Back */ }}
                    >
                        <Text className="text-red-500 font-spaceBold text-lg">Cancel</Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>

        </View>
    )
}

export default MedicationScreen