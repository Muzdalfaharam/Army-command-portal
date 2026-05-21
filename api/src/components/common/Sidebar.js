import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaChartLine, 
  FaFileAlt, 
  FaCog, 
  FaNewspaper, 
  FaHistory, 
  FaHeart, 
  FaCode,
  FaUserShield,
  FaFileSignature,
  FaSignOutAlt
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    { path: '/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
    { path: '/users', icon: FaUsers, label: 'User Directory' },
    { path: '/analytics', icon: FaChartLine, label: 'Analytics' },
    { path: '/forms', icon: FaFileSignature, label: 'Dynamic Forms' },
    { path: '/admin', icon: FaCog, label: 'Admin Settings' },
    { path: '/posts', icon: FaNewspaper, label: 'Posts Explorer' },
    { path: '/logs', icon: FaHistory, label: 'Activity Logs' },
    { path: '/favorites', icon: FaHeart, label: 'Favorites' },
    { path: '/portfolio', icon: FaCode, label: 'Developer Portfolio' },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <FaUserShield className="sidebar-icon" />
        {isOpen && <span className="sidebar-title">Menu</span>}
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink 
            key={item.path}
            to={item.path} 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <item.icon className="sidebar-link-icon" />
            {isOpen && <span className="sidebar-link-text">{item.label}</span>}
          </NavLink>
        ))}
        
        {/* Divider Line */}
        <div className="sidebar-divider"></div>
        
        {/* Sign Out Button */}
        <NavLink 
          to="/signout" 
          className={({ isActive }) => `sidebar-link signout-link ${isActive ? 'active' : ''}`}
        >
          <FaSignOutAlt className="sidebar-link-icon" />
          {isOpen && <span className="sidebar-link-text">Sign Out</span>}
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;