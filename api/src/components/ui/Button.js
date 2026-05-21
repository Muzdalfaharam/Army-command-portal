import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  icon: Icon,
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  fullWidth = false,
  className = ''
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <span className="btn-spinner"></span>}
      {Icon && !loading && <Icon className="btn-icon" />}
      <span className="btn-text">{children}</span>
    </button>
  );
};

export default Button;