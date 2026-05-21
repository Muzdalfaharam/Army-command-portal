import React, { useState, useEffect } from 'react';
import { 
  FaChartLine, FaChartBar, FaChartPie, FaChartArea,
  FaDownload, FaCalendarAlt, FaFilter, FaSync,
  FaUsers, FaEye, FaShare, FaHeart, FaComment,
  FaArrowUp, FaArrowDown, FaMinus, FaClock
} from 'react-icons/fa';
import GlassCard from '../../components/common/GlassCard';
import Button from '../../components/ui/Button';
import './InteractiveAnalytics.css';

const InteractiveAnalytics = () => {
  const [timeframe, setTimeframe] = useState('week');
  const [chartType, setChartType] = useState('line');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock analytics data
  const mockData = {
    week: {
      visitors: [1200, 1350, 1420, 1580, 1650, 1820, 2100],
      engagement: [65, 68, 72, 75, 78, 82, 85],
      conversion: [12, 14, 15, 16, 18, 19, 21],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    month: {
      visitors: [12500, 13200, 14100, 15200],
      engagement: [68, 71, 74, 78],
      conversion: [14, 15, 17, 19],
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
    },
    year: {
      visitors: [125000, 132000, 141000, 152000, 158000, 165000],
      engagement: [68, 71, 74, 78, 81, 84],
      conversion: [14, 15, 17, 19, 20, 22],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAnalyticsData(mockData[timeframe]);
      setLoading(false);
    }, 500);
  }, [timeframe]);

  const statsCards = [
    { title: 'Total Visitors', value: '24,892', change: '+12.5%', icon: FaUsers, color: '#7C9A92', trend: 'up' },
    { title: 'Page Views', value: '89,432', change: '+8.3%', icon: FaEye, color: '#8BA3C7', trend: 'up' },
    { title: 'Bounce Rate', value: '34.2%', change: '-5.1%', icon: FaChartLine, color: '#2C3E50', trend: 'down' },
    { title: 'Avg Session', value: '4m 32s', change: '+2.4%', icon: FaClock, color: '#5E7D74', trend: 'up' }
  ];

  const engagementMetrics = [
    { label: 'Likes', value: '12,847', change: '+18%', icon: FaHeart },
    { label: 'Shares', value: '3,421', change: '+24%', icon: FaShare },
    { label: 'Comments', value: '8,923', change: '+15%', icon: FaComment }
  ];

  const getMaxValue = (data) => {
    return Math.max(...data) + 500;
  };

  const getBarHeight = (value, max) => {
    return (value / max) * 180;
  };

  const renderChart = () => {
    if (!analyticsData) return null;

    const maxVisitor = getMaxValue(analyticsData.visitors);
    
    if (chartType === 'bar') {
      return (
        <div className="analytics-bars">
          {analyticsData.visitors.map((value, index) => (
            <div key={index} className="bar-group">
              <div 
                className="bar visitors-bar"
                style={{ height: `${getBarHeight(value, maxVisitor)}px` }}
              >
                <span className="bar-tooltip">{value}</span>
              </div>
              <div className="bar-label">{analyticsData.labels[index]}</div>
            </div>
          ))}
        </div>
      );
    }

    // Line chart
    const points = analyticsData.visitors.map((value, index) => {
      const x = (index / (analyticsData.visitors.length - 1)) * 100;
      const y = 100 - (value / maxVisitor) * 100;
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="line-chart-container">
        <svg className="line-chart" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            className="line-chart-path"
            points={points}
            fill="none"
            stroke="#7C9A92"
            strokeWidth="2"
          />
          <polygon
            className="line-chart-area"
            points={`0,100 ${points} 100,100`}
            fill="rgba(124, 154, 146, 0.1)"
          />
        </svg>
        <div className="chart-labels">
          {analyticsData.labels.map((label, index) => (
            <span key={index}>{label}</span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="analytics-page">
      <div className="analytics-container">
        {/* Header */}
        <div className="analytics-header">
          <div>
            <h1 className="analytics-title">Interactive Analytics</h1>
            <p className="analytics-subtitle">Real-time data visualization and insights</p>
          </div>
          <div className="analytics-actions">
            <Button variant="outline" size="small">
              <FaDownload /> Export
            </Button>
            <Button variant="ghost" size="small">
              <FaSync /> Refresh
            </Button>
          </div>
        </div>

        {/* Timeframe Selector */}
        <div className="timeframe-selector">
          <button 
            className={`timeframe-btn ${timeframe === 'week' ? 'active' : ''}`}
            onClick={() => setTimeframe('week')}
          >
            Week
          </button>
          <button 
            className={`timeframe-btn ${timeframe === 'month' ? 'active' : ''}`}
            onClick={() => setTimeframe('month')}
          >
            Month
          </button>
          <button 
            className={`timeframe-btn ${timeframe === 'year' ? 'active' : ''}`}
            onClick={() => setTimeframe('year')}
          >
            Year
          </button>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid-analytics">
          {statsCards.map((stat, index) => (
            <div key={index} className="stat-card-analytics glass">
              <div className="stat-header">
                <div className="stat-icon" style={{ background: `${stat.color}15`, color: stat.color }}>
                  <stat.icon />
                </div>
                <div className={`stat-trend ${stat.trend}`}>
                  {stat.trend === 'up' ? <FaArrowUp /> : stat.trend === 'down' ? <FaArrowDown /> : <FaMinus />}
                  {stat.change}
                </div>
              </div>
              <div className="stat-body">
                <h3 className="stat-title">{stat.title}</h3>
                <p className="stat-value">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Chart */}
        <GlassCard className="main-chart">
          <div className="chart-header-analytics">
            <h3 className="chart-title-analytics">Visitor Trends</h3>
            <div className="chart-type-selector">
              <button 
                className={`chart-type-btn ${chartType === 'line' ? 'active' : ''}`}
                onClick={() => setChartType('line')}
              >
                <FaChartLine /> Line
              </button>
              <button 
                className={`chart-type-btn ${chartType === 'bar' ? 'active' : ''}`}
                onClick={() => setChartType('bar')}
              >
                <FaChartBar /> Bar
              </button>
            </div>
          </div>
          <div className="chart-container-analytics">
            {loading ? (
              <div className="chart-loading">
                <div className="loading-spinner"></div>
              </div>
            ) : (
              renderChart()
            )}
          </div>
        </GlassCard>

        {/* Engagement Metrics */}
        <div className="engagement-grid">
          {engagementMetrics.map((metric, index) => (
            <GlassCard key={index} className="engagement-card">
              <div className="engagement-header">
                <metric.icon className="engagement-icon" />
                <span className="engagement-change positive">{metric.change}</span>
              </div>
              <div className="engagement-body">
                <h4 className="engagement-label">{metric.label}</h4>
                <p className="engagement-value">{metric.value}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Detailed Analytics Table */}
        <GlassCard className="detailed-table">
          <h3 className="table-title">Detailed Analytics</h3>
          <div className="table-responsive">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Visitors</th>
                  <th>Engagement</th>
                  <th>Conversion</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData && analyticsData.labels.map((label, index) => (
                  <tr key={index}>
                    <td>{label}</td>
                    <td>{analyticsData.visitors[index]}</td>
                    <td>{analyticsData.engagement[index]}%</td>
                    <td>{analyticsData.conversion[index]}%</td>
                    <td>
                      <span className={`trend-badge ${index % 2 === 0 ? 'up' : 'up'}`}>
                        +{Math.floor(Math.random() * 10)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default InteractiveAnalytics;