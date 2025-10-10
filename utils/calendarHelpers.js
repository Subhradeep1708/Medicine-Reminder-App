/**
 * Calendar Helper Functions
 * Utility functions for calendar operations and medication schedule calculations
 */

/**
 * Generates an array of date strings from a start date for a specified number of days
 * @param {string} startDate - ISO date string (YYYY-MM-DD)
 * @param {number} days - Number of days to generate
 * @returns {string[]} Array of ISO date strings
 */
export const generateDateRange = (startDate, days) => {
  const dates = [];
  const start = new Date(startDate);
  
  for (let i = 0; i < days; i++) {
    const currentDate = new Date(start);
    currentDate.setDate(start.getDate() + i);
    dates.push(currentDate.toISOString().split('T')[0]);
  }
  
  return dates;
};

/**
 * Gets a color from the medication color palette
 * @param {number} index - Index of the medication
 * @returns {string} Hex color code with alpha
 */
export const getMedicineColor = (index) => {
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

/**
 * Gets the full opacity version of a medicine color
 * @param {string} color - Color with alpha channel
 * @returns {string} Color with full opacity (ff)
 */
export const getFullOpacityColor = (color) => {
  return color.replace('33', 'ff').replace('cc', 'ff');
};

/**
 * Checks if a date is today
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @returns {boolean} True if date is today
 */
export const isToday = (dateString) => {
  const today = new Date().toISOString().split('T')[0];
  return dateString === today;
};

/**
 * Checks if a date is in the past
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @returns {boolean} True if date is in the past
 */
export const isPastDate = (dateString) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(dateString);
  return date < today;
};

/**
 * Checks if a date is in the future
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @returns {boolean} True if date is in the future
 */
export const isFutureDate = (dateString) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(dateString);
  return date > today;
};

/**
 * Formats a date string to a more readable format
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString, options = {}) => {
  const defaultOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { ...defaultOptions, ...options });
};

/**
 * Gets all medications scheduled for a specific date
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @param {Array} medicines - Array of medicine objects
 * @returns {Array} Filtered array of medicines for the date
 */
export const getMedicationsForDate = (dateString, medicines) => {
  return medicines.filter(medicine => {
    const dateRange = generateDateRange(medicine.startDate, medicine.howManyDays);
    return dateRange.includes(dateString);
  });
};

/**
 * Gets the count of medications for each date in a month
 * @param {number} year - Year
 * @param {number} month - Month (0-11)
 * @param {Array} medicines - Array of medicine objects
 * @returns {Object} Object with dates as keys and counts as values
 */
export const getMedicationCountByMonth = (year, month, medicines) => {
  const counts = {};
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day).toISOString().split('T')[0];
    counts[date] = getMedicationsForDate(date, medicines).length;
  }
  
  return counts;
};

/**
 * Calculates medication adherence statistics
 * @param {Array} medicines - Array of medicine objects
 * @returns {Object} Statistics object with total, active, and completed counts
 */
export const getMedicationStats = (medicines) => {
  const today = new Date().toISOString().split('T')[0];
  
  const stats = {
    total: medicines.length,
    active: 0,
    completed: 0,
    upcoming: 0,
  };
  
  medicines.forEach(medicine => {
    const dateRange = generateDateRange(medicine.startDate, medicine.howManyDays);
    const lastDate = dateRange[dateRange.length - 1];
    
    if (dateRange.includes(today)) {
      stats.active++;
    } else if (lastDate < today) {
      stats.completed++;
    } else {
      stats.upcoming++;
    }
  });
  
  return stats;
};

/**
 * Gets the next upcoming medication time for today
 * @param {Array} medicines - Array of medicine objects
 * @returns {Object|null} Next medication object with time, or null
 */
export const getNextMedicationTime = (medicines) => {
  const today = new Date().toISOString().split('T')[0];
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  const todayMeds = getMedicationsForDate(today, medicines);
  let nextMed = null;
  let minTimeDiff = Infinity;
  
  todayMeds.forEach(medicine => {
    medicine.time.forEach(timeString => {
      const [time, period] = timeString.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      
      // Convert to 24-hour format
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      
      const medTime = hours * 60 + minutes;
      const timeDiff = medTime - currentTime;
      
      if (timeDiff > 0 && timeDiff < minTimeDiff) {
        minTimeDiff = timeDiff;
        nextMed = {
          medicine,
          time: timeString,
          minutesUntil: timeDiff,
        };
      }
    });
  });
  
  return nextMed;
};

/**
 * Groups medications by their frequency
 * @param {Array} medicines - Array of medicine objects
 * @returns {Object} Object with frequency as keys and arrays of medicines as values
 */
export const groupMedicationsByFrequency = (medicines) => {
  const grouped = {};
  
  medicines.forEach(medicine => {
    const frequency = medicine.howOften || 'Unspecified';
    if (!grouped[frequency]) {
      grouped[frequency] = [];
    }
    grouped[frequency].push(medicine);
  });
  
  return grouped;
};

/**
 * Checks if there are any medication conflicts (same time)
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @param {Array} medicines - Array of medicine objects
 * @returns {Array} Array of conflict objects
 */
export const getMedicationConflicts = (dateString, medicines) => {
  const conflicts = [];
  const meds = getMedicationsForDate(dateString, medicines);
  const timeMap = {};
  
  meds.forEach(medicine => {
    medicine.time.forEach(time => {
      if (!timeMap[time]) {
        timeMap[time] = [];
      }
      timeMap[time].push(medicine);
    });
  });
  
  Object.entries(timeMap).forEach(([time, medList]) => {
    if (medList.length > 1) {
      conflicts.push({
        time,
        medications: medList,
      });
    }
  });
  
  return conflicts;
};

/**
 * Exports calendar data for a date range
 * @param {string} startDate - ISO date string
 * @param {string} endDate - ISO date string
 * @param {Array} medicines - Array of medicine objects
 * @returns {Array} Array of date objects with medication details
 */
export const exportCalendarData = (startDate, endDate, medicines) => {
  const data = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateString = d.toISOString().split('T')[0];
    const meds = getMedicationsForDate(dateString, medicines);
    
    data.push({
      date: dateString,
      formattedDate: formatDate(dateString),
      medicationCount: meds.length,
      medications: meds.map(m => ({
        name: m.name,
        dose: m.dose,
        times: m.time,
        frequency: m.howOften,
      })),
    });
  }
  
  return data;
};
