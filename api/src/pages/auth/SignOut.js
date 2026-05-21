import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';
import './SignOut.css';

const SignOut = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [status, setStatus] = useState('confirming'); // confirming, signingout, success, error
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (status === 'success') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate('/login');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status, navigate]);

  const handleSignOut = async () => {
    setStatus('signingout');
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      logout();
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleTryAgain = () => {
    setStatus('confirming');
  };

  return (
    <div className="signout-page">
      <div className="signout-container">
        <div className="signout-card glass">
          
          {status === 'confirming' && (
            <>
              <div className="signout-icon warning">
                <FaExclamationTriangle />
              </div>
              <h1 className="signout-title">Sign Out?</h1>
              <p className="signout-message">
                Are you sure you want to sign out of your account?
              </p>
              
              {user && (
                <div className="user-info-signout">
                  <div className="user-avatar-signout">
                    {user.name?.charAt(0) || 'U'}
                  </div>
                  <div className="user-details">
                    <span className="user-name-signout">{user.name || 'User'}</span>
                    <span className="user-email-signout">{user.email}</span>
                  </div>
                </div>
              )}
              
              <div className="signout-actions">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleSignOut}>
                  <FaSignOutAlt /> Sign Out
                </Button>
              </div>
            </>
          )}

          {status === 'signingout' && (
            <>
              <div className="signout-icon loading">
                <FaSpinner className="spinning" />
              </div>
              <h1 className="signout-title">Signing Out...</h1>
              <p className="signout-message">
                Please wait while we securely log you out.
              </p>
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="signout-icon success">
                <FaCheckCircle />
              </div>
              <h1 className="signout-title">Signed Out Successfully!</h1>
              <p className="signout-message">
                You have been securely logged out.
              </p>
              <p className="redirect-message">
                Redirecting to login in {countdown} seconds...
              </p>
              <Button variant="primary" onClick={() => navigate('/login')}>
                Go to Login Now
              </Button>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="signout-icon error">
                <FaExclamationTriangle />
              </div>
              <h1 className="signout-title">Something Went Wrong</h1>
              <p className="signout-message">
                Failed to sign out. Please try again.
              </p>
              <div className="signout-actions">
                <Button variant="outline" onClick={handleTryAgain}>
                  Try Again
                </Button>
                <Button variant="primary" onClick={() => navigate('/dashboard')}>
                  Back to Dashboard
                </Button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default SignOut;