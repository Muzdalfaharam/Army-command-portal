import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaShieldAlt, FaArrowRight, FaKey, FaCheckCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState('credentials');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    otp: ''
  });
  const [errors, setErrors] = useState({});
  const [generatedOTP, setGeneratedOTP] = useState('');

  const validateCredentials = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!validateCredentials()) return;
    
    setLoading(true);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(otp);
    
    setTimeout(() => {
      alert(` Your OTP is: ${otp}\n\nUse this OTP to login.`);
      setStep('otp');
      setLoading(false);
    }, 1000);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    
    if (!formData.otp) {
      setErrors({ otp: 'OTP is required' });
      return;
    }
    if (formData.otp.length !== 6) {
      setErrors({ otp: 'OTP must be 6 digits' });
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      if (formData.otp === generatedOTP) {
        // Save to localStorage
        localStorage.setItem('authToken', 'mock-token-12345');
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userData', JSON.stringify({
          id: 1,
          name: 'Commander',
          email: formData.email,
          role: 'Administrator'
        }));
        
        // SAVE SESSION STORAGE - Tab close karne se logout ho jayega
        sessionStorage.setItem('sessionActive', 'true');
        
        // Call onLogin if provided
        if (onLogin) onLogin();
        
        alert('✅ Login Successful! Redirecting to Dashboard...');
        
        // React Router navigate
        navigate('/dashboard');
      } else {
        setErrors({ otp: `Invalid OTP! Correct OTP is: ${generatedOTP}` });
        setLoading(false);
      }
    }, 1000);
  };

  const handleResendOTP = () => {
    const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(newOTP);
    alert(`📧 New OTP sent: ${newOTP}`);
  };

  const fillDemoCredentials = () => {
    setFormData({
      email: 'commander@army.com',
      password: 'demo123',
      otp: ''
    });
  };

  return (
    <div className="login-page-auth">
      <div className="login-container-auth">
        <div className="login-card-auth glass">
          
          <div className="login-badge">
            <FaShieldAlt />
          </div>
          
          <div className="login-header-auth">
            <h1 className="login-title">Command Portal</h1>
            <p className="login-subtitle">Secure Access Required</p>
          </div>

          <div className="step-indicator">
            <div className={`step ${step === 'credentials' ? 'active' : 'completed'}`}>
              <div className="step-number">1</div>
              <div className="step-label">Credentials</div>
            </div>
            <div className={`step-line ${step === 'otp' ? 'active-line' : ''}`}></div>
            <div className={`step ${step === 'otp' ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <div className="step-label">Verification</div>
            </div>
          </div>

          {step === 'credentials' ? (
            <form onSubmit={handleSendOTP} className="login-form-auth">
              <div className="form-group-auth">
                <label className="form-label">Email Address</label>
                <div className="input-wrapper">
                  <FaEnvelope className="input-icon-left" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`login-input ${errors.email ? 'error' : ''}`}
                  />
                </div>
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
              
              <div className="form-group-auth">
                <label className="form-label">Password</label>
                <div className="input-wrapper">
                  <FaLock className="input-icon-left" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`login-input ${errors.password ? 'error' : ''}`}
                  />
                  <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>
              
              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? 'Sending OTP...' : 'Send OTP'} <FaArrowRight />
              </button>
              
              <button type="button" className="demo-btn" onClick={fillDemoCredentials}>
                Fill Demo Credentials
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="login-form-auth">
              <div className="otp-message-auth">
                <FaKey className="otp-icon" />
                <p>Enter verification code sent to</p>
                <strong>{formData.email}</strong>
              </div>
              
              <div className="form-group-auth">
                <label className="form-label">6-Digit OTP</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={formData.otp}
                    onChange={(e) => setFormData({ ...formData, otp: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                    className={`login-input otp-input ${errors.otp ? 'error' : ''}`}
                    autoFocus
                  />
                </div>
                {errors.otp && <span className="error-text">{errors.otp}</span>}
              </div>
              
              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify & Login'} <FaCheckCircle />
              </button>
              
              <div className="otp-actions">
                <button type="button" className="resend-btn" onClick={handleResendOTP}>Resend OTP</button>
                <button type="button" className="back-link" onClick={() => setStep('credentials')}>← Back</button>
              </div>
            </form>
          )}

          <div className="login-footer-auth">
            <p>Secure Military Grade Authentication</p>
            <div className="security-badges">
              <span> 256-bit SSL</span>
              <span> SOC 2 Certified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;