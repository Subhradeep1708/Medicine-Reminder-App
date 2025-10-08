import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { ThemeContext } from '../app/_layout'; // import global ThemeContext

/**
 * MedicineComponent - Displays individual medicine information with take/taken functionality
 * @param {string} name - Name of the medicine
 * @param {string} dose - Dosage information
 * @param {string} time - Time when medicine should be taken
 * @param {boolean} isTaken - Whether the medicine has been taken
 * @param {function} onToggle - Callback function when take/taken button is pressed
 */
const MedicineComponent = ({ name, dose, time, isTaken, onToggle }) => {
    const { isDark } = useContext(ThemeContext);

    return (
        <View className={`flex-row py-4 rounded-xl mx-4 my-2 items-center ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <View className='bg-orange-100 p-3 ml-5 rounded-full'>
                <Ionicons name="medical" size={28} color="orange" />
            </View>

            <View className='flex-1 flex-row justify-between items-center px-4'>
                <View>
                    <Text className={`${isDark ? 'text-white' : 'text-black'} font-spaceSemiBold text-lg`}>{name}</Text>
                    <Text className={`${isDark ? 'text-gray-400' : 'text-gray-500'} font-spaceRegular text-sm`}>Dosage: {dose}</Text>
                    <View className='flex-row items-center'>
                        <Ionicons name='time-outline' size={16} color={isDark ? '#ccc' : '#555'} />
                        <Text className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mx-2 font-spaceRegular`}>
                            {time}
                        </Text>
                    </View>
                </View>

                <View>
                    {!isTaken ? (
                        <TouchableOpacity
                            onPress={onToggle}
                            className='bg-orange-500 p-2 px-6 rounded-2xl'
                            accessibilityLabel={`Mark ${name} as taken`}
                            accessibilityHint="Double tap to mark this medicine as taken"
                            accessibilityRole="button"
                        >
                            <Text className='text-white font-spaceSemiBold'>Take</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={onToggle}
                            className='p-2 px-6 rounded-2xl flex-row items-center'
                            style={{ backgroundColor: isDark ? '#264d26' : '#e6f4ea' }}
                            accessibilityLabel={`${name} has been taken`}
                            accessibilityHint="Double tap to mark this medicine as not taken"
                            accessibilityRole="button"
                        >
                            <Ionicons name='checkmark-circle' size={18} color={isDark ? '#7ed67e' : 'green'} />
                            <Text className={`${isDark ? 'text-green-300' : 'text-green-500'} font-spaceSemiBold pl-2`}>
                                Taken
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
};

MedicineComponent.propTypes = {
    name: PropTypes.string.isRequired,
    dose: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    isTaken: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
};

export default MedicineComponent;
