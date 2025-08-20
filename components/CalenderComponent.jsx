import { Agenda, Calendar, CalendarList } from "react-native-calendars";
import { View, Text } from 'react-native';
import { useState, useContext } from "react";
import { ThemeContext } from '../app/_layout';

const CalendarComponent = () => {
  const [selected, setSelected] = useState('');
  const { isDark } = useContext(ThemeContext); // global dark mode

  const lightTheme = {
    backgroundColor: '#ffffff',
    calendarBackground: '#ffffff',
    textSectionTitleColor: '#b6c1cd',
    selectedDayBackgroundColor: '#00adf5',
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#00adf5',
    dayTextColor: '#2d4150',
    textDisabledColor: '#dd99ee'
  };

  const darkTheme = {
    backgroundColor: '#121212',
    calendarBackground: '#1e1e1e',
    textSectionTitleColor: '#ffffff',
    selectedDayBackgroundColor: '#bb86fc',
    selectedDayTextColor: '#121212',
    todayTextColor: '#bb86fc',
    dayTextColor: '#ffffff',
    textDisabledColor: '#555555'
  };

  return (
    <View style={{ flex: 1, backgroundColor: isDark ? darkTheme.backgroundColor : lightTheme.backgroundColor }}>
      <Calendar
        style={{
          borderRadius: 10,
          margin: 10,
          height: 350
        }}
        firstDay={1}
        enableSwipeMonths={true}
        markingType={'multi-dot'}
        onDayPress={day => setSelected(day.dateString)}
        markedDates={{
          [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
        }}
        theme={isDark ? darkTheme : lightTheme} // dark mode now applied
      />
    </View>
  )
}

export default CalendarComponent;
