// utils/testNotification.js
import * as Notifications from 'expo-notifications';
import useMedicineStore from '@/store/medicineStore';
import { nanoid } from 'nanoid/non-secure';

/**
 * Send a test notification immediately
 */
export async function sendTestNotification() {
  try {
    const { addNotification } = useMedicineStore.getState();

    // Schedule a notification for 2 seconds from now
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: '💊 Test Notification',
        body: 'This is a test reminder for your medicine app!',
        data: { 
          test: true,
          medicineName: 'Test Medicine',
          dose: '500mg',
        },
        sound: 'default',
      },
      trigger: {
        seconds: 2,
      },
    });

    // Add to notification history
    const notificationData = {
      id: nanoid(),
      title: '💊 Test Notification',
      body: 'This is a test reminder for your medicine app!',
      data: { 
        test: true,
        medicineName: 'Test Medicine',
        dose: '500mg',
      },
      timestamp: new Date().toISOString(),
      read: false,
    };
    
    addNotification(notificationData);

    return { success: true, notificationId };
  } catch (error) {
    console.error('Error sending test notification:', error);
    return { success: false, error };
  }
}
