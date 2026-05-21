import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaBell, FaUserCircle, FaSignOutAlt, FaShieldAlt } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userData') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button 
          className="menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars />
        </button>
        <div className="logo">
          <FaShieldAlt className="logo-icon" />
          <span className="logo-text">Command Portal</span>
        </div>
      </div>

      <div className="navbar-center">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="navbar-right">
        <button className="notification-btn">
          <FaBell />
          <span className="notification-badge">3</span>
        </button>
        
        <div className="user-menu">
          <img 
            src={user.avatar || 'https://ui-avatars.com/api/?background=7C9A92&color=fff&name=User'} 
            alt="avatar"
            className="user-avatar"
          />
          <div className="user-info">
            <span className="user-name">{user.name || 'Commander'}</span>
            <span className="user-role">{user.role || 'Administrator'}</span>
          </div>
        </div>
        
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;