import { View, Text, TouchableOpacity } from 'react-native'
import { useState } from 'react';
import  { DateType, useDefaultClassNames } from 'react-native-ui-datepicker';
import { COLORS } from '@/constants/color';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import CalenderComponent from '@/components/CalenderComponent';

const Calendar = () => {
    // const defaultStyles = useDefaultStyles();    
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.background }}>
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
                    <Text className='flex-1 font-spaceBold text-2xl pl-6 text-white '>
                        Medication Schedule
                    </Text>
                </View>
            </View>

            <View className='p-4 '>

                {/* <DateTimePicker
                    mode="single"
                    showOutsideDays={true}
                    date={selected}
                    minDate={today}
                    onChange={({ date }) => setSelected(date)}
                    containerHeight={330}
                    navigationPosition='right'
                    classNames={{
                        ...defaultClassNames,
                        day_cell: ' text-white  font-semibold', // Style for each day cell
                        header: 'bg-green-700 text-white rounded-xl', // Style for the header
                        month_label: 'text-white font-bold', // Style for the month label
                        today: 'text-white bg-green-700/80 rounded-full ', // Add a border to today's date
                        selected: 'text-white border-2  border-cyan-500/80 rounded-full', // Highlight the selected day
                        selected_label: "text-cyan-700 ", // Highlight the selected day label
                        day: `${defaultClassNames.day} hover:bg-blue-100`, // Change background color on hover
                        disabled: 'opacity-50', // Make disabled dates appear more faded
                    }}
                    // styles={defaultStyles}
                    timeZone='UTC'
                /> */}
                <CalenderComponent />
            </View>
        </View>
    )
}

export default Calendar