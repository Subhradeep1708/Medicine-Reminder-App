import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useMedicineStore = create(
    persist(
        (set) => ({
            medicines: [],
            notifications: [],
            
            addMedicine: (medicine) =>
                set((state) => ({
                    medicines: [...state.medicines, medicine],
                })),
            removeMedicine: (id) =>
                set((state) => ({
                    medicines: state.medicines.filter((med) => med.id !== id),
                })),
            toggleTaken: (id) =>
                set((state) => ({
                    medicines: state.medicines.map((med) =>
                        med.id === id ? { ...med, isTaken: !med.isTaken } : med
                    )
                })),
            clearAll: () => set({ medicines: [] }),
            
            // Notification actions
            addNotification: (notification) =>
                set((state) => ({
                    notifications: [notification, ...state.notifications],
                })),
            markNotificationAsRead: (id) =>
                set((state) => ({
                    notifications: state.notifications.map((notif) =>
                        notif.id === id ? { ...notif, read: true } : notif
                    ),
                })),
            markAllNotificationsAsRead: () =>
                set((state) => ({
                    notifications: state.notifications.map((notif) => ({
                        ...notif,
                        read: true,
                    })),
                })),
            clearAllNotifications: () =>
                set({ notifications: [] }),
            removeNotification: (id) =>
                set((state) => ({
                    notifications: state.notifications.filter((notif) => notif.id !== id),
                })),
        }),
        {
            name: 'medicine-storage',
            storage: {
                getItem: async (key) => {
                    const value = await AsyncStorage.getItem(key);
                    return value ? JSON.parse(value) : null;
                },
                setItem: async (key, value) => {
                    await AsyncStorage.setItem(key, JSON.stringify(value));
                },
                removeItem: async (key) => {
                    await AsyncStorage.removeItem(key);
                },
            },
            serialize: false,
            deserialize: false,
        }
    )
);

export default useMedicineStore;
