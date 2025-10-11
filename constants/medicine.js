// Medicine Component Constants
export const MEDICINE_CONSTANTS = {
  PROGRESS: {
    DEFAULT_CURRENT_DOSES: 7,
    DEFAULT_TOTAL_DOSES: 10,
    ANIMATION_DURATION: 3000, // Reduced for better UX
    RADIUS: 99,
    STROKE_WIDTH: 13,
  },
  VALIDATION: {
    MIN_PASSWORD_LENGTH: 8,
  },
  UI: {
    ICON_SIZE: {
      small: 16,
      medium: 18,
      large: 28,
      xlarge: 32,
    },
    FONT_SIZE: {
      title: 43,
      subtitle: 16,
      caption: 12,
      body: 14,
    },
    SPACING: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    BORDER_RADIUS: {
      sm: 8,
      md: 12,
      lg: 16,
      xl: 20,
    },
    ANIMATION: {
      fast: 150,
      normal: 250,
      slow: 400,
    },
  },
};

// Theme-specific color constants
export const THEME_COLORS = {
  LIGHT: {
    inactive_stroke: '#e5ebe8',
    active_stroke: '#f1f1f1de',
    background: '#ffffff',
    text: '#000000',
    card: '#ffffff',
    border: '#e5e7eb',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  DARK: {
    inactive_stroke: '#555555',
    active_stroke: '#bb86fc',
    background: '#121212',
    text: '#ffffff',
    card: '#1f2937',
    border: '#374151',
    shadow: 'rgba(255, 255, 255, 0.1)',
  },
  STATUS: {
    success: '#16a34a',
    warning: '#eab308',
    error: '#dc2626',
    info: '#3b82f6',
    success_light: '#dcfce7',
    warning_light: '#fef3c7',
    error_light: '#fee2e2',
    info_light: '#dbeafe',
  },
};