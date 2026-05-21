// Mock data for charts and statistics

// Dashboard stats
export const dashboardStats = {
  totalUsers: 2847,
  activeUsers: 1856,
  totalPosts: 3421,
  totalComments: 8923,
  successRate: 94,
  securityLevel: 99.9,
  userGrowth: 12,
  postGrowth: 8,
};

// Activity chart data
export const activityChartData = {
  weekly: [
    { day: 'Mon', users: 240, posts: 120, engagement: 65 },
    { day: 'Tue', users: 300, posts: 150, engagement: 68 },
    { day: 'Wed', users: 280, posts: 180, engagement: 72 },
    { day: 'Thu', users: 350, posts: 200, engagement: 75 },
    { day: 'Fri', users: 400, posts: 250, engagement: 78 },
    { day: 'Sat', users: 320, posts: 190, engagement: 82 },
    { day: 'Sun', users: 250, posts: 140, engagement: 85 },
  ],
  monthly: [
    { week: 'Week 1', users: 12500, posts: 6500, engagement: 68 },
    { week: 'Week 2', users: 13200, posts: 7200, engagement: 71 },
    { week: 'Week 3', users: 14100, posts: 7800, engagement: 74 },
    { week: 'Week 4', users: 15200, posts: 8500, engagement: 78 },
  ],
  yearly: [
    { month: 'Jan', users: 125000, posts: 68000, engagement: 68 },
    { month: 'Feb', users: 132000, posts: 72000, engagement: 71 },
    { month: 'Mar', users: 141000, posts: 78000, engagement: 74 },
    { month: 'Apr', users: 152000, posts: 85000, engagement: 78 },
    { month: 'May', users: 158000, posts: 89000, engagement: 81 },
    { month: 'Jun', users: 165000, posts: 94000, engagement: 84 },
  ],
};

// Department distribution
export const departmentData = [
  { name: 'Command', value: 35, color: '#7C9A92' },
  { name: 'Intelligence', value: 25, color: '#8BA3C7' },
  { name: 'Operations', value: 20, color: '#2C3E50' },
  { name: 'Support', value: 12, color: '#5E7D74' },
  { name: 'Logistics', value: 8, color: '#6B87AB' },
];

// Recent activities
export const recentActivities = [
  { id: 1, user: 'Col. James Morrison', action: 'Authorized mission deployment', time: '2 min ago', type: 'success' },
  { id: 2, user: 'Gen. Sarah Chen', action: 'Updated security protocols', time: '15 min ago', type: 'warning' },
  { id: 3, user: 'Lt. Marcus Wright', action: 'Completed training simulation', time: '1 hour ago', type: 'info' },
  { id: 4, user: 'Adm. Victoria Reyes', action: 'System maintenance scheduled', time: '3 hours ago', type: 'info' },
  { id: 5, user: 'Capt. David Kim', action: 'New intelligence report', time: '5 hours ago', type: 'success' },
  { id: 6, user: 'Maj. Lisa Thompson', action: 'Equipment request approved', time: '6 hours ago', type: 'success' },
];

// Top users data
export const topUsers = [
  { id: 1, name: 'John Doe', role: 'Commander', score: 9850, avatar: 'JD' },
  { id: 2, name: 'Jane Smith', role: 'General', score: 9720, avatar: 'JS' },
  { id: 3, name: 'Mike Johnson', role: 'Colonel', score: 9640, avatar: 'MJ' },
  { id: 4, name: 'Sarah Williams', role: 'Major', score: 9510, avatar: 'SW' },
  { id: 5, name: 'Robert Brown', role: 'Captain', score: 9430, avatar: 'RB' },
];

// System metrics
export const systemMetrics = [
  { label: 'CPU Usage', value: 45, unit: '%', color: '#7C9A92', status: 'normal' },
  { label: 'Memory Usage', value: 62, unit: '%', color: '#8BA3C7', status: 'warning' },
  { label: 'Storage', value: 38, unit: '%', color: '#2C3E50', status: 'normal' },
  { label: 'Network', value: 78, unit: 'Mbps', color: '#5E7D74', status: 'normal' },
  { label: 'Database', value: 25, unit: '%', color: '#6B87AB', status: 'normal' },
  { label: 'Cache', value: 12, unit: '%', color: '#9BB5AD', status: 'normal' },
];

// Server status
export const serverStatus = [
  { name: 'API Server', status: 'operational', uptime: '99.9%', response: '120ms' },
  { name: 'Database', status: 'operational', uptime: '99.95%', response: '45ms' },
  { name: 'Cache Server', status: 'operational', uptime: '99.99%', response: '8ms' },
  { name: 'CDN', status: 'degraded', uptime: '98.5%', response: '210ms' },
  { name: 'Load Balancer', status: 'operational', uptime: '99.98%', response: '15ms' },
];

// Upcoming events
export const upcomingEvents = [
  { id: 1, title: 'Team Meeting', time: '10:00 AM', date: 'Today', attendees: 12, location: 'Conference Room A' },
  { id: 2, title: 'Project Review', time: '2:00 PM', date: 'Today', attendees: 8, location: 'Virtual' },
  { id: 3, title: 'Training Session', time: '11:00 AM', date: 'Tomorrow', attendees: 25, location: 'Training Hall' },
  { id: 4, title: 'Security Briefing', time: '9:00 AM', date: 'Feb 20, 2024', attendees: 15, location: 'Command Center' },
];

// Notifications
export const notifications = [
  { id: 1, message: 'New user registered', time: '5 min ago', read: false, type: 'info' },
  { id: 2, message: 'System update completed', time: '1 hour ago', read: false, type: 'success' },
  { id: 3, message: 'Security alert', time: '2 hours ago', read: true, type: 'warning' },
  { id: 4, message: 'Backup completed', time: '5 hours ago', read: true, type: 'success' },
  { id: 5, message: 'New report available', time: '1 day ago', read: false, type: 'info' },
];

// Weather data
export const weatherData = {
  temp: 22,
  condition: 'Sunny',
  location: 'Command Center',
  humidity: 65,
  windSpeed: 12,
  feelsLike: 24,
  forecast: [
    { day: 'Mon', temp: 22, condition: 'Sunny' },
    { day: 'Tue', temp: 20, condition: 'Cloudy' },
    { day: 'Wed', temp: 18, condition: 'Rainy' },
    { day: 'Thu', temp: 21, condition: 'Sunny' },
    { day: 'Fri', temp: 23, condition: 'Sunny' },
  ],
};

// Browser stats
export const browserStats = [
  { name: 'Chrome', percentage: 65, color: '#7C9A92' },
  { name: 'Firefox', percentage: 20, color: '#8BA3C7' },
  { name: 'Safari', percentage: 10, color: '#2C3E50' },
  { name: 'Edge', percentage: 5, color: '#5E7D74' },
];

// Device stats
export const deviceStats = [
  { name: 'Desktop', percentage: 45, color: '#7C9A92' },
  { name: 'Mobile', percentage: 35, color: '#8BA3C7' },
  { name: 'Tablet', percentage: 20, color: '#2C3E50' },
];

// Geographic distribution
export const geoDistribution = [
  { country: 'United States', percentage: 45, users: 1280 },
  { country: 'United Kingdom', percentage: 20, users: 570 },
  { country: 'Canada', percentage: 15, users: 427 },
  { country: 'Australia', percentage: 10, users: 285 },
  { country: 'Germany', percentage: 5, users: 142 },
  { country: 'Others', percentage: 5, users: 143 },
];

// System logs
export const systemLogs = [
  { id: 1, type: 'auth', action: 'Login', user: 'john.doe@example.com', timestamp: '2024-01-15 10:30:00', ip: '192.168.1.1', status: 'success' },
  { id: 2, type: 'auth', action: 'Logout', user: 'jane.smith@example.com', timestamp: '2024-01-15 11:45:00', ip: '192.168.1.2', status: 'success' },
  { id: 3, type: 'data', action: 'Update', user: 'admin@system.com', timestamp: '2024-01-15 12:00:00', ip: '192.168.1.100', status: 'success' },
  { id: 4, type: 'security', action: 'Permission Change', user: 'security@system.com', timestamp: '2024-01-15 13:15:00', ip: '192.168.1.50', status: 'warning' },
  { id: 5, type: 'data', action: 'Delete', user: 'moderator@system.com', timestamp: '2024-01-15 14:30:00', ip: '192.168.1.75', status: 'error' },
];

// Mock user data
export const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    status: 'active',
    department: 'Command',
    avatar: 'https://ui-avatars.com/api/?background=7C9A92&color=fff&name=John+Doe',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'user',
    status: 'active',
    department: 'Intelligence',
    avatar: 'https://ui-avatars.com/api/?background=8BA3C7&color=fff&name=Jane+Smith',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'moderator',
    status: 'inactive',
    department: 'Operations',
    avatar: 'https://ui-avatars.com/api/?background=2C3E50&color=fff&name=Mike+Johnson',
  },
];

// Mock posts
export const mockPosts = [
  {
    id: 1,
    title: 'Introduction to Military Strategy',
    content: 'This post covers the fundamentals of modern military strategy...',
    author: 'John Doe',
    category: 'Strategy',
    likes: 234,
    comments: 45,
    views: 1234,
    date: '2024-01-10',
  },
  {
    id: 2,
    title: 'Cybersecurity Best Practices',
    content: 'Essential cybersecurity practices for military personnel...',
    author: 'Jane Smith',
    category: 'Security',
    likes: 189,
    comments: 32,
    views: 987,
    date: '2024-01-12',
  },
  {
    id: 3,
    title: 'Leadership in Crisis',
    content: 'How to lead effectively during critical situations...',
    author: 'Mike Johnson',
    category: 'Leadership',
    likes: 456,
    comments: 78,
    views: 2345,
    date: '2024-01-08',
  },
];

// Export all mock data
export const mockData = {
  dashboardStats,
  activityChartData,
  departmentData,
  recentActivities,
  topUsers,
  systemMetrics,
  serverStatus,
  upcomingEvents,
  notifications,
  weatherData,
  browserStats,
  deviceStats,
  geoDistribution,
  systemLogs,
  mockUsers,
  mockPosts,
};