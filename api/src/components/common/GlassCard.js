import React from 'react';
import './GlassCard.css';

const GlassCard = ({ children, className, hover, onClick, title, icon }) => {
  return (
    <div 
      className={`glass-card ${hover ? 'hover-lift' : ''} ${className || ''}`}
      onClick={onClick}
    >
      {title && (
        <div className="glass-card-header">
          {icon && <span className="glass-card-icon">{icon}</span>}
          <h3 className="glass-card-title">{title}</h3>
        </div>
      )}
      <div className="glass-card-body">
        {children}
      </div>
    </div>
  );
};

export default GlassCard;