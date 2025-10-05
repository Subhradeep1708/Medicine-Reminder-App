// __tests__/reminderScheduler.test.js
// Mock the notification wrapper before importing the scheduler
jest.mock('../utils/notificationsWrapper', () => ({
  scheduleNotification: jest.fn().mockResolvedValue('mocked-id'),
}));

const { scheduleReminder } = require('../utils/reminderScheduler');
const { scheduleNotification } = require('../utils/notificationsWrapper');

describe('scheduleReminder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('schedules reminder for a future time', async () => {
    const future = new Date(Date.now() + 60000); // 1 min in future
    const result = await scheduleReminder(future);
    expect(result.status).toBe('scheduled');
    expect(scheduleNotification).toHaveBeenCalledTimes(1);
    expect(scheduleNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        content: expect.objectContaining({
          title: 'Medicine Reminder 💊',
          body: 'It’s time to take your medicine!',
        }),
        trigger: expect.any(Object),
      })
    );
  });

  test('throws error for past time', async () => {
    const past = new Date(Date.now() - 60000);
    await expect(scheduleReminder(past)).rejects.toThrow('Cannot schedule reminder in the past');
  });

  test('throws error for invalid date', async () => {
    await expect(scheduleReminder('invalid')).rejects.toThrow('Invalid date');
  });

  test('throws error for current time', async () => {
    const now = new Date();
    await expect(scheduleReminder(now)).rejects.toThrow('Cannot schedule reminder in the past');
  });
});
