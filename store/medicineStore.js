import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useMedicineStore = create(
    persist(
        (set) => ({
            medicines: [],
            addMedicine: (medicine) => set((state) => ({
                medicines: [...state.medicines, medicine]
            })),
            removeMedicine: (id) => set((state) => ({
                medicines: state.medicines.filter(med => med.id !== id)
            })),
            clearAll: () => set({ medicines: [] }),
        }),
        {
            name: 'medicine-storage',
            storage: AsyncStorage
        }
    ))

export default useMedicineStore
