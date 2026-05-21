import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Context
const AuthContext = createContext(null);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Check for existing session on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('userData');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Send OTP function
  const sendOTP = async (email) => {
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        if (email && email.includes('@') && email.includes('.')) {
          // Generate mock OTP
          const mockOTP = Math.floor(100000 + Math.random() * 900000).toString();
          localStorage.setItem('mockOTP', mockOTP);
          
          // For development - show OTP in console
          console.log('📧 OTP sent to:', email);
          console.log('🔑 Your OTP is:', mockOTP);
          
          // Store email temporarily
          localStorage.setItem('tempEmail', email);
          
          resolve({ success: true, message: 'OTP sent successfully' });
        } else {
          reject(new Error('Please enter a valid email address'));
        }
      }, 1500);
    });
  };

  // Verify OTP and login
  const verifyOTP = async (otp, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const savedOTP = localStorage.getItem('mockOTP');
        const savedEmail = localStorage.getItem('tempEmail');
        
        if (otp === savedOTP) {
          // Mock user data
          const userData = {
            id: 1,
            name: 'Commander',
            email: savedEmail,
            role: 'Administrator',
            avatar: 'https://ui-avatars.com/api/?background=7C9A92&color=fff&name=Commander',
            permissions: ['read', 'write', 'delete', 'admin'],
            department: 'Command Center',
            joinDate: new Date().toISOString()
          };
          
          // Store in localStorage
          localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
          localStorage.setItem('userData', JSON.stringify(userData));
          localStorage.setItem('isAuthenticated', 'true');
          
          // Update state
          setToken(localStorage.getItem('authToken'));
          setUser(userData);
          setIsAuthenticated(true);
          
          // Cleanup temp data
          localStorage.removeItem('mockOTP');
          localStorage.removeItem('tempEmail');
          
          resolve(userData);
        } else {
          reject(new Error('Invalid OTP. Please try again.'));
        }
      }, 1500);
    });
  };

  // Login function (combines sendOTP and verifyOTP)
  const login = async (email, password, otp) => {
    setLoading(true);
    try {
      // First time - send OTP
      if (!otp) {
        const result = await sendOTP(email);
        return result;
      }
      // Second time - verify OTP
      else {
        const userData = await verifyOTP(otp, password);
        return userData;
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Clear all auth data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('mockOTP');
    localStorage.removeItem('tempEmail');
    
    // Reset state
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    
    return true;
  };

  // Update user profile
  const updateUser = (updatedData) => {
    const newUserData = { ...user, ...updatedData };
    setUser(newUserData);
    localStorage.setItem('userData', JSON.stringify(newUserData));
    return newUserData;
  };

  // Check if user has permission
  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission) || false;
  };

  // Refresh token
  const refreshToken = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newToken = 'mock-jwt-token-' + Date.now();
        localStorage.setItem('authToken', newToken);
        setToken(newToken);
        resolve(newToken);
      }, 1000);
    });
  };

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser,
    hasPermission,
    refreshToken,
    sendOTP,
    verifyOTP
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;