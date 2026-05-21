import React, { useState, useEffect } from 'react';
import './ActivityChart.css';

const ActivityChart = ({ title, data, type = 'line' }) => {
  const [activeTab, setActiveTab] = useState('week');
  const [chartData, setChartData] = useState(data || []);

  useEffect(() => {
    // Mock data based on timeframe
    const mockData = {
      week: [
        { day: 'Mon', users: 240, posts: 120 },
        { day: 'Tue', users: 300, posts: 150 },
        { day: 'Wed', users: 280, posts: 180 },
        { day: 'Thu', users: 350, posts: 200 },
        { day: 'Fri', users: 400, posts: 250 },
        { day: 'Sat', users: 320, posts: 190 },
        { day: 'Sun', users: 250, posts: 140 }
      ],
      month: [
        { day: 'Week 1', users: 1800, posts: 950 },
        { day: 'Week 2', users: 2100, posts: 1100 },
        { day: 'Week 3', users: 1950, posts: 1050 },
        { day: 'Week 4', users: 2300, posts: 1250 }
      ],
      year: [
        { day: 'Jan', users: 7200, posts: 3800 },
        { day: 'Feb', users: 7800, posts: 4200 },
        { day: 'Mar', users: 8200, posts: 4500 },
        { day: 'Apr', users: 8500, posts: 4800 },
        { day: 'May', users: 9000, posts: 5100 },
        { day: 'Jun', users: 8800, posts: 4900 }
      ]
    };
    
    setChartData(mockData[activeTab] || mockData.week);
  }, [activeTab]);

  // ✅ FIX: maxValue ko safe banaya - NaN check kiya
  const maxValue = chartData && chartData.length > 0 
    ? Math.max(...chartData.flatMap(d => [d.users || 0, d.posts || 0])) 
    : 100;

  // ✅ FIX: Agar data empty hai toh show karo
  if (!chartData || chartData.length === 0) {
    return (
      <div className="activity-chart glass-card">
        <div className="chart-header">
          <h3 className="chart-title">{title || 'Activity Overview'}</h3>
          <div className="chart-tabs">
            <button className="chart-tab active">Week</button>
            <button className="chart-tab">Month</button>
            <button className="chart-tab">Year</button>
          </div>
        </div>
        <div className="chart-container">
          <div className="no-data-message">No data available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="activity-chart glass-card">
      <div className="chart-header">
        <h3 className="chart-title">{title || 'Activity Overview'}</h3>
        <div className="chart-tabs">
          <button 
            className={`chart-tab ${activeTab === 'week' ? 'active' : ''}`}
            onClick={() => setActiveTab('week')}
          >
            Week
          </button>
          <button 
            className={`chart-tab ${activeTab === 'month' ? 'active' : ''}`}
            onClick={() => setActiveTab('month')}
          >
            Month
          </button>
          <button 
            className={`chart-tab ${activeTab === 'year' ? 'active' : ''}`}
            onClick={() => setActiveTab('year')}
          >
            Year
          </button>
        </div>
      </div>
      
      <div className="chart-container">
        <div className="chart-y-axis">
          {[0, 25, 50, 75, 100].map(val => (
            <div key={val} className="y-axis-label">
              {Math.round(maxValue * val / 100)}
            </div>
          ))}
        </div>
        
        <div className="chart-bars-container">
          {chartData.map((item, idx) => {
            // ✅ FIX: Safe values - NaN ko 0 se replace karo
            const usersValue = item.users || 0;
            const postsValue = item.posts || 0;
            const usersHeight = maxValue > 0 ? (usersValue / maxValue) * 100 : 0;
            const postsHeight = maxValue > 0 ? (postsValue / maxValue) * 100 : 0;
            
            return (
              <div key={idx} className="chart-bar-group">
                <div className="chart-bars">
                  <div 
                    className="chart-bar users-bar"
                    style={{ height: `${usersHeight}%` }}
                  >
                    <span className="bar-value">{usersValue}</span>
                  </div>
                  <div 
                    className="chart-bar posts-bar"
                    style={{ height: `${postsHeight}%` }}
                  >
                    <span className="bar-value">{postsValue}</span>
                  </div>
                </div>
                <div className="chart-label">{item.day}</div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-color users-color"></div>
          <span>Users</span>
        </div>
        <div className="legend-item">
          <div className="legend-color posts-color"></div>
          <span>Posts</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;