import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUsers, 
  FaUserPlus, 
  FaFileAlt, 
  FaComments,
  FaChartLine, 
  FaBell, 
  FaCog, 
  FaShieldAlt,
  FaGlobe,
  FaDatabase,
  FaCloudUploadAlt,
  FaRocket,
  FaTrophy,
  FaClock,
  FaCalendarAlt,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLink,
  FaStar,
  FaHeart,
  FaThumbsUp,
  FaShare,
  FaEye,
  FaDownload,
  FaPrint,
  FaSearch,
  FaFilter,
  FaSort,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaUndo,
  FaRedo,
  FaCopy,
  FaCut,
  FaPaste,
  FaLock,
  FaUnlock,
  FaKey,
  FaQrcode,
  FaBarcode,
  FaCamera,
  FaVideo,
  FaMusic,
  FaImage,
  FaFile,
  FaFolder,
  FaFolderOpen,
  FaHome,
  FaInfoCircle,
  FaQuestionCircle,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaSync,
  FaUpload,
  FaBackward,
  FaForward,
  FaStepBackward,
  FaStepForward,
  FaPlay,
  FaPause,
  FaStop,
  FaVolumeUp,
  FaVolumeDown,
  FaVolumeMute,
  FaBatteryFull,
  FaWifi,
  FaBluetooth,
  FaSun,
  FaMoon,
  FaTemperatureHigh,
  FaWind,
  FaTint,
  FaSnowflake,
  FaFire,
  FaBolt,
  FaBug,
  FaCode,
  FaTerminal,
  FaGitAlt,
  FaGithub,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
  FaTelegram,
  FaDiscord,
  FaSlack,
  FaTeams,
  FaCalendarWeek,
  FaCalendarDay,
  FaMobileAlt
} from 'react-icons/fa';
import StatsCard from '../../components/dashboard/StatsCard';
import ActivityChart from '../../components/dashboard/ActivityChart';
import GlassCard from '../../components/common/GlassCard';
import Button from '../../components/ui/Button';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState({ temp: 22, condition: 'Sunny', location: 'Command Center' });
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New user registered', time: '5 min ago', read: false },
    { id: 2, message: 'System update completed', time: '1 hour ago', read: false },
    { id: 3, message: 'Security alert', time: '2 hours ago', read: true }
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Stats data for 8 cards
  const statsData = [
    { title: 'Total Personnel', value: 2847, icon: FaUsers, change: '+12%', color: 'primary', suffix: '' },
    { title: 'Active Missions', value: 1243, icon: FaRocket, change: '+8%', color: 'secondary', suffix: '' },
    { title: 'Success Rate', value: 94, icon: FaTrophy, change: '+5%', color: 'accent', suffix: '%' },
    { title: 'Security Level', value: 99.9, icon: FaShieldAlt, change: 'AAA+', color: 'primary', suffix: '%' },
    { title: 'Active Users', value: 1856, icon: FaUserPlus, change: '+15%', color: 'secondary', suffix: '' },
    { title: 'Total Posts', value: 3421, icon: FaFileAlt, change: '+23%', color: 'accent', suffix: '' },
    { title: 'Comments', value: 8923, icon: FaComments, change: '+18%', color: 'primary', suffix: '' },
    { title: 'Analytics', value: 76, icon: FaChartLine, change: '+7%', color: 'secondary', suffix: '%' }
  ];

  // Recent activities data
  const recentActivities = [
    { id: 1, user: 'Col. James Morrison', action: 'Authorized mission deployment', time: '2 min ago', type: 'success', icon: FaCheckCircle },
    { id: 2, user: 'Gen. Sarah Chen', action: 'Updated security protocols', time: '15 min ago', type: 'warning', icon: FaExclamationTriangle },
    { id: 3, user: 'Lt. Marcus Wright', action: 'Completed training simulation', time: '1 hour ago', type: 'info', icon: FaInfoCircle },
    { id: 4, user: 'Adm. Victoria Reyes', action: 'System maintenance scheduled', time: '3 hours ago', type: 'info', icon: FaInfoCircle },
    { id: 5, user: 'Capt. David Kim', action: 'New intelligence report', time: '5 hours ago', type: 'success', icon: FaCheckCircle },
    { id: 6, user: 'Maj. Lisa Thompson', action: 'Equipment request approved', time: '6 hours ago', type: 'success', icon: FaCheckCircle }
  ];

  // Quick actions data
  const quickActions = [
    { label: 'Create Report', icon: FaPlus, color: '#7C9A92', action: () => navigate('/forms') },
    { label: 'View Users', icon: FaUsers, color: '#8BA3C7', action: () => navigate('/users') },
    { label: 'Analytics', icon: FaChartLine, color: '#2C3E50', action: () => navigate('/analytics') },
    { label: 'Settings', icon: FaCog, color: '#6B7B8D', action: () => navigate('/admin') },
    { label: 'New Post', icon: FaFileAlt, color: '#5E7D74', action: () => navigate('/posts') },
    { label: 'Messages', icon: FaEnvelope, color: '#6B87AB', action: () => {} }
  ];

  // Top users data
  const topUsers = [
    { id: 1, name: 'John Doe', role: 'Commander', score: 9850, avatar: 'JD' },
    { id: 2, name: 'Jane Smith', role: 'General', score: 9720, avatar: 'JS' },
    { id: 3, name: 'Mike Johnson', role: 'Colonel', score: 9640, avatar: 'MJ' },
    { id: 4, name: 'Sarah Williams', role: 'Major', score: 9510, avatar: 'SW' }
  ];

  // System metrics
  const systemMetrics = [
    { label: 'CPU Usage', value: 45, unit: '%', color: '#7C9A92' },
    { label: 'Memory Usage', value: 62, unit: '%', color: '#8BA3C7' },
    { label: 'Storage', value: 38, unit: '%', color: '#2C3E50' },
    { label: 'Network', value: 78, unit: 'Mbps', color: '#5E7D74' }
  ];

  // Upcoming events
  const upcomingEvents = [
    { title: 'Team Meeting', time: '10:00 AM', date: 'Today', attendees: 12 },
    { title: 'Project Review', time: '2:00 PM', date: 'Today', attendees: 8 },
    { title: 'Training Session', time: '11:00 AM', date: 'Tomorrow', attendees: 25 }
  ];

  // Server status
  const serverStatus = [
    { name: 'API Server', status: 'operational', uptime: '99.9%', response: '120ms' },
    { name: 'Database', status: 'operational', uptime: '99.95%', response: '45ms' },
    { name: 'Cache Server', status: 'operational', uptime: '99.99%', response: '8ms' },
    { name: 'CDN', status: 'degraded', uptime: '98.5%', response: '210ms' }
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        
        {/* Section 1: Welcome Header */}
        <div className="dashboard-section welcome-section">
          <div className="welcome-text">
            <h1 className="welcome-title animate-fadeIn">
              Welcome back, Commander
            </h1>
            <p className="welcome-subtitle">
              Here's your command center overview for {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="welcome-time">
            <div className="time-card glass">
              <FaClock className="time-icon" />
              <span className="time-value">{currentTime.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Stats Cards Grid - 8 cards */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Key Metrics</h2>
            <Button variant="outline" size="small">View Details</Button>
          </div>
          <div className="stats-grid">
            {statsData.map((stat, index) => (
              <div key={index} className="animate-scaleIn" style={{ animationDelay: `${index * 0.05}s` }}>
                <StatsCard {...stat} />
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Activity Chart */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Activity Trends</h2>
            <div className="section-actions">
              <Button variant="ghost" size="small"><FaDownload /> Export</Button>
            </div>
          </div>
          <ActivityChart title="User & Post Activity" />
        </div>

        {/* Section 4: Quick Actions - 6 actions */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Quick Actions</h2>
          </div>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <div key={index} className="quick-action-card glass hover-lift" onClick={action.action}>
                <div className="quick-action-icon" style={{ background: `${action.color}15`, color: action.color }}>
                  <action.icon />
                </div>
                <span className="quick-action-label">{action.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Split Layout - Recent Activities & Top Users */}
        <div className="dashboard-section split-layout">
          {/* Recent Activities */}
          <GlassCard title="Recent Activities" icon={<FaBell />} className="recent-activities">
            <div className="activities-list">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className={`activity-icon ${activity.type}`}>
                    <activity.icon />
                  </div>
                  <div className="activity-content">
                    <p className="activity-user">{activity.user}</p>
                    <p className="activity-action">{activity.action}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Top Users */}
          <GlassCard title="Top Performers" icon={<FaStar />}>
            <div className="top-users-list">
              {topUsers.map((user, index) => (
                <div key={user.id} className="top-user-item">
                  <div className="top-user-rank">#{index + 1}</div>
                  <div className="top-user-avatar">{user.avatar}</div>
                  <div className="top-user-info">
                    <p className="top-user-name">{user.name}</p>
                    <p className="top-user-role">{user.role}</p>
                  </div>
                  <div className="top-user-score">{user.score} pts</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Section 6: System Metrics - 4 metrics with progress bars */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">System Health</h2>
          </div>
          <div className="metrics-grid">
            {systemMetrics.map((metric, index) => (
              <div key={index} className="metric-card glass">
                <div className="metric-header">
                  <span className="metric-label">{metric.label}</span>
                  <span className="metric-value">{metric.value}{metric.unit}</span>
                </div>
                <div className="metric-progress">
                  <div 
                    className="metric-progress-bar"
                    style={{ width: `${metric.value}%`, background: metric.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 7: Server Status Table */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Server Status</h2>
            <Button variant="ghost" size="small"><FaSync /> Refresh</Button>
          </div>
          <div className="server-table glass">
            <table className="data-table">
              <thead>
                <tr><th>Server</th><th>Status</th><th>Uptime</th><th>Response</th></tr>
              </thead>
              <tbody>
                {serverStatus.map((server, index) => (
                  <tr key={index}>
                    <td>{server.name}</td>
                    <td>
                      <span className={`status-badge status-${server.status}`}>
                        {server.status}
                      </span>
                    </td>
                    <td>{server.uptime}</td>
                    <td>{server.response}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 8: Upcoming Events */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Upcoming Events</h2>
            <Button variant="outline" size="small">View All</Button>
          </div>
          <div className="events-grid">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="event-card glass hover-lift">
                <div className="event-date">
                  <span className="event-day">{event.date === 'Today' ? 'Today' : 'Tomorrow'}</span>
                  <span className="event-time">{event.time}</span>
                </div>
                <div className="event-info">
                  <h4 className="event-title">{event.title}</h4>
                  <p className="event-attendees">{event.attendees} attendees</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 9: Weather Widget */}
        <div className="dashboard-section">
          <GlassCard title="Weather Intelligence" icon={<FaSun />}>
            <div className="weather-widget">
              <div className="weather-main">
                <div className="weather-temp">{weather.temp}°C</div>
                <div className="weather-condition">{weather.condition}</div>
                <div className="weather-location">{weather.location}</div>
              </div>
              <div className="weather-details">
                <div className="weather-detail"><FaTint /> Humidity: 65%</div>
                <div className="weather-detail"><FaWind /> Wind: 12 km/h</div>
                <div className="weather-detail"><FaTemperatureHigh /> Feels: 24°C</div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Section 10: Notification Center */}
        <div className="dashboard-section">
          <GlassCard title="Notifications" icon={<FaBell />}>
            <div className="notifications-list">
              {notifications.map(notif => (
                <div key={notif.id} className={`notification-item ${!notif.read ? 'unread' : ''}`}>
                  <div className="notification-dot"></div>
                  <div className="notification-content">
                    <p className="notification-message">{notif.message}</p>
                    <span className="notification-time">{notif.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Section 11: Storage Analytics */}
        <div className="dashboard-section">
          <GlassCard title="Storage Analytics" icon={<FaDatabase />}>
            <div className="storage-stats">
              <div className="storage-item">
                <span>Documents</span>
                <div className="storage-bar"><div className="storage-fill" style={{ width: '45%', background: '#7C9A92' }}></div></div>
                <span>4.5 GB</span>
              </div>
              <div className="storage-item">
                <span>Images</span>
                <div className="storage-bar"><div className="storage-fill" style={{ width: '30%', background: '#8BA3C7' }}></div></div>
                <span>3.2 GB</span>
              </div>
              <div className="storage-item">
                <span>Videos</span>
                <div className="storage-bar"><div className="storage-fill" style={{ width: '15%', background: '#2C3E50' }}></div></div>
                <span>1.8 GB</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Section 12: User Growth Chart */}
        <div className="dashboard-section">
          <GlassCard title="User Growth" icon={<FaUserPlus />}>
            <div className="growth-stats">
              <div className="growth-number">
                <span className="growth-value">+284</span>
                <span className="growth-label">This Week</span>
              </div>
              <div className="growth-number">
                <span className="growth-value">+1,247</span>
                <span className="growth-label">This Month</span>
              </div>
              <div className="growth-number">
                <span className="growth-value">+4,892</span>
                <span className="growth-label">This Year</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Section 13: API Usage Stats */}
        <div className="dashboard-section">
          <GlassCard title="API Usage" icon={<FaCloudUploadAlt />}>
            <div className="api-stats">
              <div className="api-stat">
                <span>Requests Today</span>
                <strong>12,847</strong>
              </div>
              <div className="api-stat">
                <span>Avg Response</span>
                <strong>124ms</strong>
              </div>
              <div className="api-stat">
                <span>Error Rate</span>
                <strong>0.3%</strong>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Section 14: Popular Content */}
        <div className="dashboard-section">
          <GlassCard title="Popular Content" icon={<FaHeart />}>
            <div className="popular-list">
              <div className="popular-item"><FaFileAlt /> Annual Report 2024 <span>1.2k views</span></div>
              <div className="popular-item"><FaFileAlt /> Security Guidelines <span>892 views</span></div>
              <div className="popular-item"><FaFileAlt /> Training Manual <span>745 views</span></div>
            </div>
          </GlassCard>
        </div>

        {/* Section 15: Team Members */}
        <div className="dashboard-section">
          <GlassCard title="Team Members" icon={<FaUsers />}>
            <div className="team-list">
              {['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams'].map((member, i) => (
                <div key={i} className="team-member">
                  <div className="member-avatar">{member.charAt(0)}</div>
                  <div className="member-info">
                    <span className="member-name">{member}</span>
                    <span className="member-status online">Online</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Section 16: Recent Files */}
        <div className="dashboard-section">
          <GlassCard title="Recent Files" icon={<FaFile />}>
            <div className="files-list">
              <div className="file-item"><FaFile /> Q4_Report.pdf</div>
              <div className="file-item"><FaImage /> presentation.png</div>
              <div className="file-item"><FaFile /> budget.xlsx</div>
              <div className="file-item"><FaFile /> notes.txt</div>
            </div>
          </GlassCard>
        </div>

        {/* Section 17: Support Tickets */}
        <div className="dashboard-section">
          <GlassCard title="Support Tickets" icon={<FaQuestionCircle />}>
            <div className="tickets-stats">
              <div className="ticket-count">
                <span className="ticket-number">12</span>
                <span className="ticket-label">Open</span>
              </div>
              <div className="ticket-count">
                <span className="ticket-number">8</span>
                <span className="ticket-label">In Progress</span>
              </div>
              <div className="ticket-count">
                <span className="ticket-number">156</span>
                <span className="ticket-label">Resolved</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Section 18: Quick Stats Grid - More metrics */}
        <div className="dashboard-section">
          <div className="mini-stats-grid">
            <div className="mini-stat glass"><FaEye /> 12.4k Views</div>
            <div className="mini-stat glass"><FaThumbsUp /> 3.2k Likes</div>
            <div className="mini-stat glass"><FaShare /> 845 Shares</div>
            <div className="mini-stat glass"><FaDownload /> 2.1k Downloads</div>
          </div>
        </div>

        {/* Section 19: Browser Stats */}
        <div className="dashboard-section">
          <GlassCard title="Browser Usage" icon={<FaGlobe />}>
            <div className="browser-stats">
              <div className="browser-item">Chrome <div className="browser-bar"><div style={{ width: '65%' }}></div></div> 65%</div>
              <div className="browser-item">Firefox <div className="browser-bar"><div style={{ width: '20%' }}></div></div> 20%</div>
              <div className="browser-item">Safari <div className="browser-bar"><div style={{ width: '10%' }}></div></div> 10%</div>
            </div>
          </GlassCard>
        </div>

        {/* Section 20: Device Stats */}
        <div className="dashboard-section">
          <GlassCard title="Devices" icon={<FaMobileAlt />}>
            <div className="device-stats">
              <div>Desktop: 45%</div>
              <div>Mobile: 35%</div>
              <div>Tablet: 20%</div>
            </div>
          </GlassCard>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;