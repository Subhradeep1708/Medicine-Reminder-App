import { Calendar } from "react-native-calendars";
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { useState, useContext, useMemo } from "react";
import { ThemeContext } from '../app/_layout';
import useMedicineStore from '@/store/medicineStore';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CalendarComponent = () => {
  const [selected, setSelected] = useState('');
  const { isDark } = useContext(ThemeContext);
  const { medicines } = useMedicineStore();
  const screenWidth = Dimensions.get('window').width;

  // Helper function to generate all dates in a range
  const generateDateRange = (startDate, days) => {
    const dates = [];
    const start = new Date(startDate);
    for (let i = 0; i < days; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + i);
      dates.push(currentDate.toISOString().split('T')[0]);
    }
    return dates;
  };

  // Calculate medication statistics
  const medicationStats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const stats = {
      total: medicines.length,
      active: 0,
      completed: 0,
      upcoming: 0,
      todayCount: 0,
    };

    medicines.forEach(medicine => {
      const dateRange = generateDateRange(medicine.startDate, medicine.howManyDays);
      const lastDate = dateRange[dateRange.length - 1];

      if (dateRange.includes(today)) {
        stats.active++;
        stats.todayCount++;
      } else if (lastDate < today) {
        stats.completed++;
      } else if (medicine.startDate > today) {
        stats.upcoming++;
      }
    });

    return stats;
  }, [medicines]);

  // Generate marked dates from medicine data
  const markedDates = useMemo(() => {
    const marked = {};
    const today = new Date().toISOString().split('T')[0];

    // Process each medicine
    medicines.forEach((medicine, index) => {
      const dateRange = generateDateRange(medicine.startDate, medicine.howManyDays);
      const color = getMedicineColor(index);
      
      dateRange.forEach((date) => {
        if (!marked[date]) {
          marked[date] = {
            periods: [],
            dots: []
          };
        }

        // Add period marking for date range
        marked[date].periods.push({
          startingDay: date === dateRange[0],
          endingDay: date === dateRange[dateRange.length - 1],
          color: color,
        });

        // Add dot for medications on this date
        marked[date].dots.push({
          key: medicine.id,
          color: isDark ? '#bb86fc' : '#00adf5',
        });
      });
    });

    // Mark selected date
    if (selected && marked[selected]) {
      marked[selected].selected = true;
      marked[selected].selectedColor = isDark ? '#bb86fc' : '#00adf5';
    } else if (selected) {
      marked[selected] = {
        selected: true,
        selectedColor: isDark ? '#bb86fc' : '#00adf5',
      };
    }

    // Mark today with a special indicator
    if (marked[today]) {
      marked[today].marked = true;
      marked[today].dotColor = isDark ? '#4ade80' : '#16a34a';
    } else {
      marked[today] = {
        marked: true,
        dotColor: isDark ? '#4ade80' : '#16a34a',
      };
    }

    return marked;
  }, [medicines, selected, isDark]);

  // Get medication details for selected date
  const selectedDateMedications = useMemo(() => {
    if (!selected) return [];
    
    return medicines.filter(medicine => {
      const dateRange = generateDateRange(medicine.startDate, medicine.howManyDays);
      return dateRange.includes(selected);
    });
  }, [selected, medicines]);

  // Generate distinct colors for different medications
  const getMedicineColor = (index) => {
    const colors = [
      '#16a34a33', // green
      '#3b82f633', // blue
      '#8b5cf633', // purple
      '#f59e0b33', // amber
      '#ef444433', // red
      '#ec489933', // pink
      '#14b8a633', // teal
      '#f97316cc', // orange
    ];
    return colors[index % colors.length];
  };

  const lightTheme = {
    backgroundColor: '#ffffff',
    calendarBackground: '#ffffff',
    textSectionTitleColor: '#6b7280',
    selectedDayBackgroundColor: '#00adf5',
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#16a34a',
    dayTextColor: '#1f2937',
    textDisabledColor: '#d1d5db',
    monthTextColor: '#1f2937',
    textMonthFontWeight: 'bold',
    textDayFontSize: 14,
    textMonthFontSize: 18,
  };

  const darkTheme = {
    backgroundColor: '#121212',
    calendarBackground: '#1e1e1e',
    textSectionTitleColor: '#9ca3af',
    selectedDayBackgroundColor: '#bb86fc',
    selectedDayTextColor: '#121212',
    todayTextColor: '#4ade80',
    dayTextColor: '#f3f4f6',
    textDisabledColor: '#4b5563',
    monthTextColor: '#f3f4f6',
    textMonthFontWeight: 'bold',
    textDayFontSize: 14,
    textMonthFontSize: 18,
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: isDark ? darkTheme.backgroundColor : lightTheme.backgroundColor }}>
      <View style={{ padding: screenWidth < 360 ? 5 : 10 }}>
        <Calendar
          style={{
            borderRadius: 12,
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          }}
          firstDay={1}
          enableSwipeMonths={true}
          markingType={'multi-period'}
          onDayPress={day => setSelected(day.dateString)}
          markedDates={markedDates}
          theme={isDark ? darkTheme : lightTheme}
          // Responsive calendar configuration
          hideExtraDays={screenWidth < 360}
          hideDayNames={false}
          showWeekNumbers={false}
        />

        {/* Statistics Section */}
        {medicines.length > 0 && (
          <View style={{
            marginTop: 20,
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
            justifyContent: 'space-between',
          }}>
            {/* Active Medications */}
            <View style={{
              flex: 1,
              minWidth: screenWidth < 360 ? '100%' : '48%',
              backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
              padding: 15,
              borderRadius: 12,
              elevation: 2,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              borderLeftWidth: 4,
              borderLeftColor: '#16a34a',
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <MaterialCommunityIcons 
                  name="pill" 
                  size={24} 
                  color="#16a34a" 
                  style={{ marginRight: 8 }} 
                />
                <Text style={{
                  fontSize: 14,
                  color: isDark ? '#9ca3af' : '#6b7280',
                  fontFamily: 'SpaceGrotesk-Regular',
                }}>
                  Active Today
                </Text>
              </View>
              <Text style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: isDark ? '#ffffff' : '#1f2937',
                fontFamily: 'SpaceGrotesk-Bold',
              }}>
                {medicationStats.todayCount}
              </Text>
            </View>

            {/* Total Medications */}
            <View style={{
              flex: 1,
              minWidth: screenWidth < 360 ? '100%' : '48%',
              backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
              padding: 15,
              borderRadius: 12,
              elevation: 2,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              borderLeftWidth: 4,
              borderLeftColor: '#3b82f6',
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <MaterialCommunityIcons 
                  name="format-list-bulleted" 
                  size={24} 
                  color="#3b82f6" 
                  style={{ marginRight: 8 }} 
                />
                <Text style={{
                  fontSize: 14,
                  color: isDark ? '#9ca3af' : '#6b7280',
                  fontFamily: 'SpaceGrotesk-Regular',
                }}>
                  Total Medications
                </Text>
              </View>
              <Text style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: isDark ? '#ffffff' : '#1f2937',
                fontFamily: 'SpaceGrotesk-Bold',
              }}>
                {medicationStats.total}
              </Text>
            </View>

            {/* Completed */}
            <View style={{
              flex: 1,
              minWidth: screenWidth < 360 ? '100%' : '48%',
              backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
              padding: 15,
              borderRadius: 12,
              elevation: 2,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              borderLeftWidth: 4,
              borderLeftColor: '#8b5cf6',
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <MaterialCommunityIcons 
                  name="check-circle" 
                  size={24} 
                  color="#8b5cf6" 
                  style={{ marginRight: 8 }} 
                />
                <Text style={{
                  fontSize: 14,
                  color: isDark ? '#9ca3af' : '#6b7280',
                  fontFamily: 'SpaceGrotesk-Regular',
                }}>
                  Completed
                </Text>
              </View>
              <Text style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: isDark ? '#ffffff' : '#1f2937',
                fontFamily: 'SpaceGrotesk-Bold',
              }}>
                {medicationStats.completed}
              </Text>
            </View>

            {/* Upcoming */}
            <View style={{
              flex: 1,
              minWidth: screenWidth < 360 ? '100%' : '48%',
              backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
              padding: 15,
              borderRadius: 12,
              elevation: 2,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              borderLeftWidth: 4,
              borderLeftColor: '#f59e0b',
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <MaterialCommunityIcons 
                  name="clock-outline" 
                  size={24} 
                  color="#f59e0b" 
                  style={{ marginRight: 8 }} 
                />
                <Text style={{
                  fontSize: 14,
                  color: isDark ? '#9ca3af' : '#6b7280',
                  fontFamily: 'SpaceGrotesk-Regular',
                }}>
                  Upcoming
                </Text>
              </View>
              <Text style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: isDark ? '#ffffff' : '#1f2937',
                fontFamily: 'SpaceGrotesk-Bold',
              }}>
                {medicationStats.upcoming}
              </Text>
            </View>
          </View>
        )}

        {/* Legend Section */}
        <View style={{
          marginTop: 20,
          padding: 15,
          backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
          borderRadius: 12,
          elevation: 2,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 10,
            color: isDark ? '#f3f4f6' : '#1f2937',
            fontFamily: 'SpaceGrotesk-Bold',
          }}>
            Legend
          </Text>
          
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
              <View style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: isDark ? '#4ade80' : '#16a34a',
                marginRight: 6,
              }} />
              <Text style={{ color: isDark ? '#d1d5db' : '#6b7280', fontSize: 12 }}>Today</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
              <View style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: isDark ? '#bb86fc' : '#00adf5',
                marginRight: 6,
              }} />
              <Text style={{ color: isDark ? '#d1d5db' : '#6b7280', fontSize: 12 }}>Has Medication</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{
                width: 20,
                height: 10,
                borderRadius: 2,
                backgroundColor: '#16a34a33',
                marginRight: 6,
              }} />
              <Text style={{ color: isDark ? '#d1d5db' : '#6b7280', fontSize: 12 }}>Medication Period</Text>
            </View>
          </View>
        </View>

        {/* Selected Date Medications */}
        {selected && selectedDateMedications.length > 0 && (
          <View style={{
            marginTop: 20,
            padding: 15,
            backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
            borderRadius: 12,
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold',
              marginBottom: 10,
              color: isDark ? '#f3f4f6' : '#1f2937',
              fontFamily: 'SpaceGrotesk-Bold',
            }}>
              Medications on {new Date(selected).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>

            {selectedDateMedications.map((med, index) => (
              <View
                key={med.id}
                style={{
                  padding: 12,
                  marginBottom: 10,
                  backgroundColor: isDark ? '#2c2c2c' : '#f9fafb',
                  borderRadius: 8,
                  borderLeftWidth: 4,
                  borderLeftColor: getMedicineColor(index).replace('33', 'ff'),
                }}
              >
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: isDark ? '#ffffff' : '#1f2937',
                  fontFamily: 'SpaceGrotesk-SemiBold',
                  marginBottom: 4,
                }}>
                  {med.name}
                </Text>
                
                <Text style={{
                  fontSize: 14,
                  color: isDark ? '#d1d5db' : '#6b7280',
                  fontFamily: 'SpaceGrotesk-Regular',
                  marginBottom: 2,
                }}>
                  Dosage: {med.dose}
                </Text>

                <Text style={{
                  fontSize: 14,
                  color: isDark ? '#d1d5db' : '#6b7280',
                  fontFamily: 'SpaceGrotesk-Regular',
                  marginBottom: 2,
                }}>
                  Times: {med.time.join(', ')}
                </Text>

                <Text style={{
                  fontSize: 14,
                  color: isDark ? '#d1d5db' : '#6b7280',
                  fontFamily: 'SpaceGrotesk-Regular',
                }}>
                  Frequency: {med.howOften}
                </Text>

                {med.note && (
                  <Text style={{
                    fontSize: 12,
                    color: isDark ? '#9ca3af' : '#9ca3af',
                    fontFamily: 'SpaceGrotesk-Regular',
                    marginTop: 6,
                    fontStyle: 'italic',
                  }}>
                    Note: {med.note}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Empty State for Selected Date */}
        {selected && selectedDateMedications.length === 0 && (
          <View style={{
            marginTop: 20,
            padding: 20,
            backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
            borderRadius: 12,
            alignItems: 'center',
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
          }}>
            <Text style={{
              fontSize: 14,
              color: isDark ? '#9ca3af' : '#6b7280',
              fontFamily: 'SpaceGrotesk-Regular',
              textAlign: 'center',
            }}>
              No medications scheduled for {new Date(selected).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

export default CalendarComponent;
