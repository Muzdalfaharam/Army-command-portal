import React from 'react';
import './StatsCard.css';

const StatsCard = ({ title, value, icon: Icon, change, color, suffix = '' }) => {
  const isPositive = change && change.toString().includes('+');
  
  return (
    <div className={`stats-card stats-card-${color}`}>
      <div className="stats-card-inner">
        <div className="stats-card-header">
          <div className="stats-card-icon">
            {/* FIX: Check lagaya hai ke agar Icon maujood ho tabhi render ho */}
            {Icon && <Icon />}
          </div>
          {change && (
            <span className={`stats-card-change ${isPositive ? 'positive' : 'negative'}`}>
              {change}
            </span>
          )}
        </div>
        <div className="stats-card-body">
          <h3 className="stats-card-title">{title}</h3>
          <p className="stats-card-value">
            {value}{suffix}
          </p>
        </div>
        <div className="stats-card-bg-icon">
          {/* FIX: Background wale icon par bhi safe check laga diya */}
          {Icon && <Icon />}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;