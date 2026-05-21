// Application constants

// App Configuration
export const APP_CONFIG = {
  NAME: 'Army Command Portal',
  VERSION: '1.0.0',
  DESCRIPTION: 'Professional Military Management System',
  COMPANY: 'Command Tech Solutions',
  YEAR: new Date().getFullYear(),
};

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://jsonplaceholder.typicode.com',
  TIMEOUT: 30000,
  RETRY_COUNT: 3,
  RETRY_DELAY: 1000,
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  PAGE_SIZES: [10, 20, 50, 100],
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  USER: 'user',
  GUEST: 'guest',
};

// User Status
export const USER_STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  SUSPENDED: 'Suspended',
  PENDING: 'Pending',
};

// Departments
export const DEPARTMENTS = [
  'Command',
  'Intelligence',
  'Operations',
  'Support',
  'Logistics',
  'Training',
  'Administration',
  'Technology',
];

// Post Categories
export const POST_CATEGORIES = [
  'Technology',
  'Security',
  'Strategy',
  'Leadership',
  'Innovation',
  'Training',
  'Operations',
  'Intelligence',
];

// Activity Types
export const ACTIVITY_TYPES = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  VIEW: 'view',
  EXPORT: 'export',
  IMPORT: 'import',
};

// Notification Types
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};

// Chart Colors
export const CHART_COLORS = {
  PRIMARY: '#7C9A92',
  SECONDARY: '#8BA3C7',
  TERTIARY: '#2C3E50',
  SUCCESS: '#27ae60',
  WARNING: '#f39c12',
  ERROR: '#e74c3c',
  INFO: '#3498db',
  GRADIENT: ['#7C9A92', '#8BA3C7', '#2C3E50', '#5E7D74', '#6B87AB'],
};

// Theme Colors
export const THEME_COLORS = {
  light: {
    primary: '#2C3E50',
    secondary: '#7C9A92',
    accent: '#8BA3C7',
    background: '#FDFBF7',
    surface: '#FFFFFF',
    text: '#2C3E50',
    textSecondary: '#6B7B8D',
    border: 'rgba(44, 62, 80, 0.1)',
  },
  dark: {
    primary: '#E8EDF2',
    secondary: '#9BB5AD',
    accent: '#AFC1DB',
    background: '#1A252F',
    surface: '#2C3E50',
    text: '#FDFBF7',
    textSecondary: '#9BA8B5',
    border: 'rgba(253, 251, 247, 0.1)',
  },
};

// Breakpoints for responsive design
export const BREAKPOINTS = {
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1024,
  WIDE: 1280,
  FULL: 1440,
};

// Date Formats
export const DATE_FORMATS = {
  FULL: 'MMMM DD, YYYY',
  LONG: 'MMM DD, YYYY',
  MEDIUM: 'MM/DD/YYYY',
  SHORT: 'MM/DD/YY',
  TIME: 'HH:mm:ss',
  DATE_TIME: 'MM/DD/YYYY HH:mm:ss',
  ISO: 'YYYY-MM-DDTHH:mm:ss.sssZ',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  IS_AUTHENTICATED: 'isAuthenticated',
  FAVORITE_USERS: 'favoriteUsers',
  USER_SETTINGS: 'userSettings',
  THEME: 'theme',
  LANGUAGE: 'language',
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNOUT: '/signout',
  DASHBOARD: '/dashboard',
  USERS: '/users',
  USER_DETAILS: '/users/:id',
  ANALYTICS: '/analytics',
  FORMS: '/forms',
  ADMIN: '/admin',
  POSTS: '/posts',
  LOGS: '/logs',
  FAVORITES: '/favorites',
  PORTFOLIO: '/portfolio',
};

// Form Validation Patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/,
  ZIP_CODE: /^\d{5}(-\d{4})?$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  USERNAME: /^[a-zA-Z0-9_]{3,20}$/,
};

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_PASSWORD: 'Password must contain uppercase, lowercase, number and special character',
  PASSWORD_MISMATCH: 'Passwords do not match',
  NETWORK_ERROR: 'Network error. Please check your connection',
  SERVER_ERROR: 'Server error. Please try again later',
  UNAUTHORIZED: 'Unauthorized access. Please login again',
  NOT_FOUND: 'Resource not found',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  LOGOUT_SUCCESS: 'Logged out successfully',
  SAVE_SUCCESS: 'Changes saved successfully',
  DELETE_SUCCESS: 'Deleted successfully',
  CREATE_SUCCESS: 'Created successfully',
  UPDATE_SUCCESS: 'Updated successfully',
  COPY_SUCCESS: 'Copied to clipboard',
};

// Default Avatar Colors
export const AVATAR_COLORS = [
  '#7C9A92', '#8BA3C7', '#2C3E50', '#5E7D74', 
  '#6B87AB', '#9BB5AD', '#AFC1DB', '#4A627A',
];

// Default Meta Tags
export const META_TAGS = {
  title: 'Army Command Portal',
  description: 'Professional Military Management System',
  keywords: 'army, command, portal, military, management',
  author: 'Command Tech Solutions',
};

// Time periods for analytics
export const TIME_PERIODS = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
  ALL: 'all',
};

// Sort options
export const SORT_OPTIONS = {
  ASC: 'asc',
  DESC: 'desc',
};

// Filter operators
export const FILTER_OPERATORS = {
  EQUALS: 'eq',
  NOT_EQUALS: 'ne',
  CONTAINS: 'contains',
  STARTS_WITH: 'sw',
  ENDS_WITH: 'ew',
  GREATER_THAN: 'gt',
  LESS_THAN: 'lt',
  BETWEEN: 'between',
};