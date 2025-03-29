import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/axios';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = ({ children, user, setUser, darkMode, toggleDarkMode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await api.post('/logout');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-left">
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <i className="fas fa-bars"></i>
          </button>
          <div className="logo">
            <i className="fas fa-calendar-day"></i>
            <span>Birthday Reminder</span>
          </div>
        </div>
        
        <div className="header-right">
          <button onClick={toggleDarkMode} className="theme-toggle">
            {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
          </button>
          
          <div className="user-menu-container">
            <button onClick={toggleUserMenu} className="user-button">
              <div className="user-avatar">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="user-name">{user?.name}</span>
              <i className={`fas fa-chevron-${userMenuOpen ? 'up' : 'down'}`}></i>
            </button>
            
            {userMenuOpen && (
              <div className="user-dropdown">
                <div className="user-info">
                  <span className="user-dropdown-name">{user?.name}</span>
                  <span className="user-dropdown-email">{user?.email}</span>
                </div>
                <div className="dropdown-divider"></div>
                <button onClick={handleLogout} className="logout-button">
                  <i className="fas fa-sign-out-alt"></i> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <div className="main-container">
        <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
        <main className="content">
          {children}
        </main>
      </div>
      
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Faculty of Science, University of Lagos. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;