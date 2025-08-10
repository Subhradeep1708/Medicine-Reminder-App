import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { COLORS } from '../../../constants/color';
import useMedicineStore from "@/store/medicineStore";
import MedicineComponent from '../../../components/MedicineComponent';

const AllMeds = () => {
    const medicines = useMedicineStore((state) => state.medicines);

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
                        All Medication
                    </Text>
                </View>
            </View>

            <ScrollView className='p-4 '>
                {
                    medicines.map((med, index) => (
                        <MedicineComponent
                            key={index}
                            medicine={med}
                            toggleTaken={med.toggleTaken}
                        />
                    ))
                }
            </ScrollView>
        </View>
    )
}

export default AllMeds