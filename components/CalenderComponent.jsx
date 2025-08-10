import { Agenda, Calendar, CalendarList } from "react-native-calendars";
import { View, Text } from 'react-native'
import { useState } from "react";

const CalenderComponent = () => {
    const [selected, setSelected] = useState('');
    return (
        <View>
            <Calendar
                style={{
                    borderRadius: 10,
                    margin: 10,
                    height: 350
                }}
                firstDay={1}
                enableSwipeMonths={true}
                markingType={'multi-dot'}
                marking={'multi-dot'}
                // monthFormat={'d  yyyy'}
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#dd99ee'
                }}

                onDayPress={day => {
                    setSelected(day.dateString);
                }}
                markedDates={{
                    [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                }}
            />
        </View>
    )
}

export default CalenderComponent