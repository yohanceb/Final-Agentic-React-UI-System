/**
 * Food App Design System Tokens
 * Polestar color tokens for food ordering application
 */

export const FoodAppTokens = {
  brand: {
    primary: '#22C55E', // Green - Main action color (Book Order, Pizza category)
    secondary: '#FACC15', // Yellow - Ratings, stars, accents
    surface: 'rgba(255, 255, 255, 0.7)', // Blurred glass effect background
  },
  agent: {
    thinking: 'linear-gradient(90deg, #22C55E 0%, #4ADE80 50%, #22C55E 100%)',
    error: '#EF4444', // Red for errors
  },
  semantic: {
    success: '#22C55E',
    warning: '#FACC15',
    danger: '#EF4444',
    info: '#3B82F6',
  },
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  surface: {
    glass: 'rgba(255, 255, 255, 0.7)',
    glassHover: 'rgba(255, 255, 255, 0.85)',
    glassDark: 'rgba(33, 33, 33, 0.1)',
  },
} as const;

/**
 * Extended color palette for accessibility and variations
 */
export const FoodAppColorPalette = {
  primary: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E', // Base
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#145231',
  },
  secondary: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#FACC15', // Base
    600: '#F59E0B',
    700: '#D97706',
    800: '#B45309',
    900: '#78350F',
  },
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444', // Base
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },
} as const;

/**
 * Button variants using FoodApp tokens
 */
export const ButtonVariants = {
  primary: {
    base: 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700',
    agent: 'bg-green-500 text-white hover:bg-green-600',
  },
  secondary: {
    base: 'bg-yellow-400 text-gray-900 hover:bg-yellow-500 active:bg-yellow-600',
    agent: 'bg-yellow-400 text-gray-900 hover:bg-yellow-500',
  },
  agent: {
    thinking:
      'bg-gradient-to-r from-green-500 via-green-400 to-green-500 text-white hover:from-green-600 hover:via-green-500 hover:to-green-600 animate-pulse',
    error: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
  },
  ghost: {
    base: 'bg-transparent text-gray-900 border-2 border-gray-300 hover:bg-gray-100 active:bg-gray-200',
    agent: 'bg-transparent text-gray-900 border-2 border-gray-300 hover:bg-gray-100',
  },
} as const;

/**
 * Spacing tokens
 */
export const Spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '2.5rem',
} as const;

/**
 * Border radius tokens
 */
export const BorderRadius = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  full: '9999px',
} as const;

/**
 * Shadow tokens for glass effect
 */
export const Shadows = {
  glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  glassDark: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
} as const;
