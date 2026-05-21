import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-spinner-container">
      <div className="spinner-wrapper-custom">
        <div className="spinner-ring-custom"></div>
        <div className="spinner-ring-custom-2"></div>
        <div className="spinner-ring-custom-3"></div>
        <p className="spinner-message">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;