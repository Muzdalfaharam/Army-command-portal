import React, { useState, useEffect } from 'react';
import { 
  FaUserShield, FaBell, FaPalette, FaDatabase, 
  FaGlobe, FaLock, FaEnvelope, FaUserCog,
  FaSave, FaUndo, FaSync, FaShieldAlt,
  FaMoon, FaSun, FaLanguage, FaDesktop,
  FaMobile, FaTabletAlt, FaKey, FaQrcode,
  FaUserCheck, FaUserTimes, FaBan, FaFlag,
  FaCheckCircle
} from 'react-icons/fa';
import GlassCard from '../../components/common/GlassCard';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import './AdminSettings.css';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      siteName: 'Army Command Portal',
      siteDescription: 'Professional Military Management System',
      timezone: 'UTC+5',
      dateFormat: 'DD/MM/YYYY',
      language: 'English'
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: '30',
      passwordExpiry: '90',
      loginAttempts: '5',
      ipWhitelist: false
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsAlerts: false,
      dailyDigest: true,
      missionAlerts: true
    },
    appearance: {
      theme: 'light',
      primaryColor: '#7C9A92',
      sidebarCollapsed: false,
      animationsEnabled: true,
      compactMode: false
    },
    userManagement: {
      autoApprove: false,
      defaultRole: 'user',
      allowRegistration: true,
      requireEmailVerification: true
    }
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      localStorage.setItem('adminSettings', JSON.stringify(settings));
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all settings to default?')) {
      // Reset logic here
      window.location.reload();
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: FaGlobe },
    { id: 'security', label: 'Security', icon: FaLock },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'appearance', label: 'Appearance', icon: FaPalette },
    { id: 'userManagement', label: 'User Management', icon: FaUserCog }
  ];

  return (
    <div className="admin-settings-page">
      <div className="settings-container">
        {/* Header */}
        <div className="settings-header">
          <div className="settings-title-section">
            <FaUserShield className="settings-header-icon" />
            <div>
              <h1 className="settings-title">Admin Settings</h1>
              <p className="settings-subtitle">Manage system configuration and preferences</p>
            </div>
          </div>
          <div className="settings-actions">
            <Button variant="outline" onClick={handleReset}>
              <FaUndo /> Reset
            </Button>
            <Button variant="primary" onClick={handleSave} loading={saving}>
              <FaSave /> {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>

        {saved && (
          <div className="settings-toast">
            <FaCheckCircle /> Settings saved successfully!
          </div>
        )}

        {/* Tabs */}
        <div className="settings-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="settings-content">
          {/* General Settings */}
          {activeTab === 'general' && (
            <GlassCard className="settings-card">
              <h3 className="settings-card-title">General Settings</h3>
              <div className="settings-form">
                <div className="form-group">
                  <label>Site Name</label>
                  <input
                    type="text"
                    value={settings.general.siteName}
                    onChange={(e) => handleChange('general', 'siteName', e.target.value)}
                    className="settings-input"
                  />
                </div>
                <div className="form-group">
                  <label>Site Description</label>
                  <textarea
                    value={settings.general.siteDescription}
                    onChange={(e) => handleChange('general', 'siteDescription', e.target.value)}
                    className="settings-textarea"
                    rows="3"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Timezone</label>
                    <select
                      value={settings.general.timezone}
                      onChange={(e) => handleChange('general', 'timezone', e.target.value)}
                      className="settings-select"
                    >
                      <option>UTC+0</option>
                      <option>UTC+5</option>
                      <option>UTC+8</option>
                      <option>UTC-5</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Date Format</label>
                    <select
                      value={settings.general.dateFormat}
                      onChange={(e) => handleChange('general', 'dateFormat', e.target.value)}
                      className="settings-select"
                    >
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Language</label>
                    <select
                      value={settings.general.language}
                      onChange={(e) => handleChange('general', 'language', e.target.value)}
                      className="settings-select"
                    >
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <GlassCard className="settings-card">
              <h3 className="settings-card-title">Security Settings</h3>
              <div className="settings-form">
                <div className="settings-switch">
                  <div className="switch-label">
                    <FaKey /> Two-Factor Authentication
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={settings.security.twoFactorAuth}
                      onChange={(e) => handleChange('security', 'twoFactorAuth', e.target.checked)}
                    />
                    <span className="switch-slider"></span>
                  </label>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Session Timeout (minutes)</label>
                    <input
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => handleChange('security', 'sessionTimeout', e.target.value)}
                      className="settings-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password Expiry (days)</label>
                    <input
                      type="number"
                      value={settings.security.passwordExpiry}
                      onChange={(e) => handleChange('security', 'passwordExpiry', e.target.value)}
                      className="settings-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Max Login Attempts</label>
                    <input
                      type="number"
                      value={settings.security.loginAttempts}
                      onChange={(e) => handleChange('security', 'loginAttempts', e.target.value)}
                      className="settings-input"
                    />
                  </div>
                </div>
                <div className="settings-switch">
                  <div className="switch-label">
                    <FaBan /> IP Whitelist Enabled
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={settings.security.ipWhitelist}
                      onChange={(e) => handleChange('security', 'ipWhitelist', e.target.checked)}
                    />
                    <span className="switch-slider"></span>
                  </label>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <GlassCard className="settings-card">
              <h3 className="settings-card-title">Notification Preferences</h3>
              <div className="settings-form">
                <div className="settings-switch">
                  <div className="switch-label">
                    <FaEnvelope /> Email Notifications
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={settings.notifications.emailNotifications}
                      onChange={(e) => handleChange('notifications', 'emailNotifications', e.target.checked)}
                    />
                    <span className="switch-slider"></span>
                  </label>
                </div>
                <div className="settings-switch">
                  <div className="switch-label">
                    <FaBell /> Push Notifications
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={settings.notifications.pushNotifications}
                      onChange={(e) => handleChange('notifications', 'pushNotifications', e.target.checked)}
                    />
                    <span className="switch-slider"></span>
                  </label>
                </div>
                <div className="settings-switch">
                  <div className="switch-label">
                    <FaMobile /> SMS Alerts
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={settings.notifications.smsAlerts}
                      onChange={(e) => handleChange('notifications', 'smsAlerts', e.target.checked)}
                    />
                    <span className="switch-slider"></span>
                  </label>
                </div>
                <div className="settings-switch">
                  <div className="switch-label">
                    <FaFlag /> Daily Digest
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={settings.notifications.dailyDigest}
                      onChange={(e) => handleChange('notifications', 'dailyDigest', e.target.checked)}
                    />
                    <span className="switch-slider"></span>
                  </label>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <GlassCard className="settings-card">
              <h3 className="settings-card-title">Appearance Settings</h3>
              <div className="settings-form">
                <div className="theme-selector">
                  <div 
                    className={`theme-option ${settings.appearance.theme === 'light' ? 'active' : ''}`}
                    onClick={() => handleChange('appearance', 'theme', 'light')}
                  >
                    <FaSun /> Light
                  </div>
                  <div 
                    className={`theme-option ${settings.appearance.theme === 'dark' ? 'active' : ''}`}
                    onClick={() => handleChange('appearance', 'theme', 'dark')}
                  >
                    <FaMoon /> Dark
                  </div>
                </div>
                <div className="form-group">
                  <label>Primary Color</label>
                  <div className="color-picker">
                    <input
                      type="color"
                      value={settings.appearance.primaryColor}
                      onChange={(e) => handleChange('appearance', 'primaryColor', e.target.value)}
                      className="color-input"
                    />
                    <span>{settings.appearance.primaryColor}</span>
                  </div>
                </div>
                <div className="settings-switch">
                  <div className="switch-label">
                    <FaSync /> Animations Enabled
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={settings.appearance.animationsEnabled}
                      onChange={(e) => handleChange('appearance', 'animationsEnabled', e.target.checked)}
                    />
                    <span className="switch-slider"></span>
                  </label>
                </div>
              </div>
            </GlassCard>
          )}

          {/* User Management Settings */}
          {activeTab === 'userManagement' && (
            <GlassCard className="settings-card">
              <h3 className="settings-card-title">User Management</h3>
              <div className="settings-form">
                <div className="settings-switch">
                  <div className="switch-label">
                    <FaUserCheck /> Auto-Approve New Users
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={settings.userManagement.autoApprove}
                      onChange={(e) => handleChange('userManagement', 'autoApprove', e.target.checked)}
                    />
                    <span className="switch-slider"></span>
                  </label>
                </div>
                <div className="settings-switch">
                  <div className="switch-label">
                    <FaUserTimes /> Allow User Registration
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={settings.userManagement.allowRegistration}
                      onChange={(e) => handleChange('userManagement', 'allowRegistration', e.target.checked)}
                    />
                    <span className="switch-slider"></span>
                  </label>
                </div>
                <div className="form-group">
                  <label>Default User Role</label>
                  <select
                    value={settings.userManagement.defaultRole}
                    onChange={(e) => handleChange('userManagement', 'defaultRole', e.target.value)}
                    className="settings-select"
                  >
                    <option>user</option>
                    <option>moderator</option>
                    <option>admin</option>
                  </select>
                </div>
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;