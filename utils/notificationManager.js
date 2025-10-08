// utils/notificationManager.js
import * as Notifications from 'expo-notifications';
import { Platform, Alert } from 'react-native';
import useMedicineStore from '@/store/medicineStore';
import { nanoid } from 'nanoid/non-secure';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    priority: Notifications.AndroidNotificationPriority.MAX,
  }),
});

/**
 * Request notification permissions with retry logic
 */
export async function requestNotificationPermissions() {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.warn('Notification permission not granted');
      
      // Show user-friendly alert
      if (Platform.OS === 'android') {
        Alert.alert(
          'Permission Required',
          'Please enable notifications in your device settings to receive medication reminders.',
          [
            { text: 'Later', style: 'cancel' },
            { text: 'Settings', onPress: () => Notifications.openSettingsAsync?.() }
          ]
        );
      }
      
      return false;
    }

    if (Platform.OS === 'android') {
      try {
        await Notifications.setNotificationChannelAsync('medicine-reminders', {
          name: 'Medicine Reminders',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#16a34a',
          sound: 'default',
          enableVibrate: true,
          enableLights: true,
          lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
        });
      } catch (channelError) {
        console.error('Error setting notification channel:', channelError);
        // Continue anyway as this is not critical
      }
    }

    return true;
  } catch (error) {
    console.error('Error requesting notification permissions:', error);
    return false;
  }
}

/**
 * Schedule notifications for a medicine
 * @param {Object} medicine - The medicine object
 * @returns {Promise<Array>} - Array of scheduled notification IDs
 */
export async function scheduleMedicineNotifications(medicine) {
  try {
    if (!medicine.isReminder) {
      return [];
    }

    const notificationIds = [];
    const startDate = new Date(medicine.startDate);
    const today = new Date();
    
    // Ensure start date is not in the past
    if (startDate < today) {
      startDate.setTime(today.getTime());
    }

    // Schedule notifications for each time
    for (const timeString of medicine.time) {
      // Parse time string (e.g., "09:00 AM")
      const [time, period] = timeString.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      
      let hour24 = hours;
      if (period === 'PM' && hours !== 12) {
        hour24 = hours + 12;
      } else if (period === 'AM' && hours === 12) {
        hour24 = 0;
      }

      // Schedule for each day in the duration
      for (let day = 0; day < medicine.howManyDays; day++) {
        const notificationDate = new Date(startDate);
        notificationDate.setDate(startDate.getDate() + day);
        notificationDate.setHours(hour24, minutes, 0, 0);

        const now = new Date();
        
        // Only schedule if the notification time is in the future
        if (notificationDate > now) {
          const trigger = notificationDate.getTime() - now.getTime();
          
          const id = await Notifications.scheduleNotificationAsync({
            content: {
              title: '💊 Medicine Reminder',
              body: `Time to take ${medicine.name} (${medicine.dose})`,
              data: { 
                medicineId: medicine.id,
                medicineName: medicine.name,
                dose: medicine.dose,
                time: timeString,
              },
              sound: 'default',
              priority: Notifications.AndroidNotificationPriority.HIGH,
            },
            trigger: {
              seconds: Math.floor(trigger / 1000),
            },
          });

          notificationIds.push(id);
        }
      }
    }

    return notificationIds;
  } catch (error) {
    console.error('Error scheduling notifications:', error);
    return [];
  }
}

/**
 * Cancel all scheduled notifications for a medicine
 * @param {Array} notificationIds - Array of notification IDs to cancel
 */
export async function cancelMedicineNotifications(notificationIds) {
  try {
    if (!notificationIds || notificationIds.length === 0) {
      return;
    }

    for (const id of notificationIds) {
      await Notifications.cancelScheduledNotificationAsync(id);
    }
  } catch (error) {
    console.error('Error canceling notifications:', error);
  }
}

/**
 * Cancel all scheduled notifications
 */
export async function cancelAllNotifications() {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    console.error('Error canceling all notifications:', error);
  }
}

/**
 * Get all scheduled notifications
 */
export async function getAllScheduledNotifications() {
  try {
    return await Notifications.getAllScheduledNotificationsAsync();
  } catch (error) {
    console.error('Error getting scheduled notifications:', error);
    return [];
  }
}

/**
 * Setup notification listeners
 */
export function setupNotificationListeners() {
  // Listener for when notification is received while app is foregrounded
  const receivedSubscription = Notifications.addNotificationReceivedListener(notification => {
    const { addNotification } = useMedicineStore.getState();
    
    const notificationData = {
      id: nanoid(),
      title: notification.request.content.title,
      body: notification.request.content.body,
      data: notification.request.content.data,
      timestamp: new Date().toISOString(),
      read: false,
    };
    
    addNotification(notificationData);
  });

  // Listener for when user interacts with notification
  const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
    const { addNotification } = useMedicineStore.getState();
    const notification = response.notification;
    
    const notificationData = {
      id: nanoid(),
      title: notification.request.content.title,
      body: notification.request.content.body,
      data: notification.request.content.data,
      timestamp: new Date().toISOString(),
      read: false,
      interacted: true,
    };
    
    addNotification(notificationData);
  });

  return {
    receivedSubscription,
    responseSubscription,
  };
}

/**
 * Remove notification listeners
 */
export function removeNotificationListeners(subscriptions) {
  if (subscriptions?.receivedSubscription) {
    subscriptions.receivedSubscription.remove();
  }
  if (subscriptions?.responseSubscription) {
    subscriptions.responseSubscription.remove();
  }
}
