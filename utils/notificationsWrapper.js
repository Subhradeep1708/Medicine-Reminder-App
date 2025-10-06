// utils/notificationsWrapper.js
import * as Notifications from 'expo-notifications';

/**
 * Wrapper for scheduling notifications
 * Allows mocking in tests
 */
export const scheduleNotification = (options) => {
  return Notifications.scheduleNotificationAsync(options);
};
