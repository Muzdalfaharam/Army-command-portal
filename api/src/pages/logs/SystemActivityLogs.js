import React, { useState, useEffect } from 'react';
import { 
  FaSearch, FaFilter, FaDownload, FaCalendarAlt,
  FaUser, FaShieldAlt, FaFileAlt, FaCog,
  FaSignInAlt, FaSignOutAlt, FaEdit, FaTrash,
  FaEye, FaCheckCircle, FaExclamationTriangle,
  FaInfoCircle, FaClock, FaSortAmountDown
} from 'react-icons/fa';
import GlassCard from '../../components/common/GlassCard';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import './SystemActivityLogs.css';

const SystemActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);

  // Mock log data
  const mockLogs = [
    { id: 1, type: 'auth', action: 'Login', user: 'john.doe@example.com', timestamp: '2024-01-15 10:30:00', ip: '192.168.1.1', status: 'success', details: 'User logged in successfully' },
    { id: 2, type: 'auth', action: 'Logout', user: 'jane.smith@example.com', timestamp: '2024-01-15 11:45:00', ip: '192.168.1.2', status: 'success', details: 'User logged out' },
    { id: 3, type: 'data', action: 'Update', user: 'admin@system.com', timestamp: '2024-01-15 12:00:00', ip: '192.168.1.100', status: 'success', details: 'User profile updated' },
    { id: 4, type: 'security', action: 'Permission Change', user: 'security@system.com', timestamp: '2024-01-15 13:15:00', ip: '192.168.1.50', status: 'warning', details: 'Role permissions modified' },
    { id: 5, type: 'data', action: 'Delete', user: 'moderator@system.com', timestamp: '2024-01-15 14:30:00', ip: '192.168.1.75', status: 'error', details: 'Failed to delete record' },
    { id: 6, type: 'auth', action: 'Login Failed', user: 'unknown@test.com', timestamp: '2024-01-15 15:00:00', ip: '10.0.0.1', status: 'error', details: 'Invalid credentials' },
    { id: 7, type: 'system', action: 'Backup', user: 'system', timestamp: '2024-01-15 16:00:00', ip: 'localhost', status: 'success', details: 'Database backup completed' },
    { id: 8, type: 'data', action: 'Create', user: 'new.user@example.com', timestamp: '2024-01-15 17:30:00', ip: '192.168.1.200', status: 'success', details: 'New user account created' }
  ];

  useEffect(() => {
    setTimeout(() => {
      setLogs(mockLogs);
      setLoading(false);
    }, 1000);
  }, []);

  const getTypeIcon = (type) => {
    switch(type) {
      case 'auth': return <FaSignInAlt />;
      case 'data': return <FaFileAlt />;
      case 'security': return <FaShieldAlt />;
      case 'system': return <FaCog />;
      default: return <FaInfoCircle />;
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'success': return <FaCheckCircle className="status-success" />;
      case 'warning': return <FaExclamationTriangle className="status-warning" />;
      case 'error': return <FaExclamationTriangle className="status-error" />;
      default: return <FaInfoCircle className="status-info" />;
    }
  };

  const getActionIcon = (action) => {
    switch(action) {
      case 'Login': return <FaSignInAlt />;
      case 'Logout': return <FaSignOutAlt />;
      case 'Update': return <FaEdit />;
      case 'Delete': return <FaTrash />;
      case 'Create': return <FaEye />;
      default: return <FaInfoCircle />;
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || log.type === filterType;
    const matchesDate = !filterDate || log.timestamp.includes(filterDate);
    return matchesSearch && matchesType && matchesDate;
  });

  const stats = {
    total: logs.length,
    success: logs.filter(l => l.status === 'success').length,
    warnings: logs.filter(l => l.status === 'warning').length,
    errors: logs.filter(l => l.status === 'error').length
  };

  return (
    <div className="logs-page">
      <div className="logs-container">
        {/* Header */}
        <div className="logs-header">
          <div>
            <h1 className="logs-title">System Activity Logs</h1>
            <p className="logs-subtitle">Monitor and track all system activities</p>
          </div>
          <div className="logs-actions">
            <Button variant="outline">
              <FaDownload /> Export Logs
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid-logs">
          <div className="stat-card-logs glass">
            <div className="stat-icon-logs total"><FaClock /></div>
            <div className="stat-info">
              <span className="stat-value">{stats.total}</span>
              <span className="stat-label">Total Activities</span>
            </div>
          </div>
          <div className="stat-card-logs glass">
            <div className="stat-icon-logs success"><FaCheckCircle /></div>
            <div className="stat-info">
              <span className="stat-value">{stats.success}</span>
              <span className="stat-label">Successful</span>
            </div>
          </div>
          <div className="stat-card-logs glass">
            <div className="stat-icon-logs warning"><FaExclamationTriangle /></div>
            <div className="stat-info">
              <span className="stat-value">{stats.warnings}</span>
              <span className="stat-label">Warnings</span>
            </div>
          </div>
          <div className="stat-card-logs glass">
            <div className="stat-icon-logs error"><FaExclamationTriangle /></div>
            <div className="stat-info">
              <span className="stat-value">{stats.errors}</span>
              <span className="stat-label">Errors</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="search-bar-logs">
            <FaSearch />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Types</option>
              <option value="auth">Authentication</option>
              <option value="data">Data Operations</option>
              <option value="security">Security</option>
              <option value="system">System</option>
            </select>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="date-filter"
            />
          </div>
        </div>

        {/* Logs Table */}
        <GlassCard className="logs-table-container">
          {loading ? (
            <div className="logs-loading">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="logs-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Action</th>
                    <th>User</th>
                    <th>Timestamp</th>
                    <th>IP Address</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => (
                    <tr key={log.id} onClick={() => setSelectedLog(log)}>
                      <td className="type-cell">
                        <span className="type-badge" data-type={log.type}>
                          {getTypeIcon(log.type)} {log.type}
                        </span>
                      </td>
                      <td>
                        <span className="action-badge">
                          {getActionIcon(log.action)} {log.action}
                        </span>
                      </td>
                      <td>{log.user}</td>
                      <td>{log.timestamp}</td>
                      <td>{log.ip}</td>
                      <td>{getStatusIcon(log.status)}</td>
                      <td>
                        <button className="view-details-btn" onClick={(e) => { e.stopPropagation(); setSelectedLog(log); }}>
                          <FaEye /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </GlassCard>

        {/* Log Details Modal */}
        {selectedLog && (
          <div className="modal-overlay" onClick={() => setSelectedLog(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Log Details</h3>
                <button className="modal-close" onClick={() => setSelectedLog(null)}>&times;</button>
              </div>
              <div className="modal-body">
                <div className="detail-row">
                  <span className="detail-label">ID:</span>
                  <span>{selectedLog.id}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Type:</span>
                  <span className="type-badge" data-type={selectedLog.type}>{selectedLog.type}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Action:</span>
                  <span>{selectedLog.action}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">User:</span>
                  <span>{selectedLog.user}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Timestamp:</span>
                  <span>{selectedLog.timestamp}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">IP Address:</span>
                  <span>{selectedLog.ip}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span>{getStatusIcon(selectedLog.status)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Details:</span>
                  <span>{selectedLog.details}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemActivityLogs;