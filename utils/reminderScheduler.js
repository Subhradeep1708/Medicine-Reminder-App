// utils/reminderScheduler.js
import { scheduleNotification } from './notificationsWrapper';

/**
 * Schedule a medicine reminder
 * @param {Date} reminderTime
 * @returns {Promise<{status: string}>}
 */
export async function scheduleReminder(reminderTime) {
  const now = new Date();

  if (!(reminderTime instanceof Date) || isNaN(reminderTime)) {
    throw new Error('Invalid date');
  }

  if (reminderTime <= now) {
    throw new Error('Cannot schedule reminder in the past');
  }

  const trigger = reminderTime.getTime() - now.getTime();

  await scheduleNotification({
    content: {
      title: 'Medicine Reminder 💊',
      body: 'It’s time to take your medicine!',
    },
    trigger: { seconds: trigger / 1000 },
  });

  return { status: 'scheduled' };
}
