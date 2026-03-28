import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, AlertTriangle, Search, Bell, 
  LayoutDashboard, Database, Globe, Settings, FileVideo, User, LogOut
} from 'lucide-react';
import './App.css';

// Import Pages
import Overview from './pages/Overview';
import ProtectedAssets from './pages/ProtectedAssets';
import AlertCenter from './pages/AlertCenter';
import CrawlerFleet from './pages/CrawlerFleet';
import SystemHealth from './pages/SystemHealth';
import SettingsPage from './pages/Settings';
import Profile from './pages/Profile';

function Dashboard() {
  const [activePage, setActivePage] = useState('Overview');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderPage = () => {
    switch(activePage) {
      case 'Overview': return <Overview />;
      case 'Protected Assets': return <ProtectedAssets />;
      case 'Alert Center': return <AlertCenter />;
      case 'Crawler Fleet': return <CrawlerFleet />;
      case 'System Health': return <SystemHealth />;
      case 'Settings': return <SettingsPage />;
      case 'Profile': return <Profile />;
      default: return <Overview />;
    }
  };

  const navigateTo = (page) => {
    setActivePage(page);
    setIsProfileOpen(false);
  };

  return (
    <>
      <div className="bg-glows">
        <div className="glow glow-1"></div>
        <div className="glow glow-2"></div>
        <div className="glow glow-3"></div>
      </div>
      <div className="app-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <ShieldCheck size={28} className="brand-icon" />
            <div className="brand-title">Nexus<br/>Protect</div>
          </div>
          <nav className="nav-links">
            <div 
              className={`nav-item ${activePage === 'Overview' ? 'active' : ''}`}
              onClick={() => navigateTo('Overview')}
            ><LayoutDashboard size={20} /> Overview</div>
            <div 
              className={`nav-item ${activePage === 'Protected Assets' ? 'active' : ''}`}
              onClick={() => navigateTo('Protected Assets')}
            ><FileVideo size={20} /> Protected Assets</div>
            <div 
              className={`nav-item ${activePage === 'Alert Center' ? 'active' : ''}`}
              onClick={() => navigateTo('Alert Center')}
            ><AlertTriangle size={20} /> Alert Center</div>
            <div 
              className={`nav-item ${activePage === 'Crawler Fleet' ? 'active' : ''}`}
              onClick={() => navigateTo('Crawler Fleet')}
            ><Globe size={20} /> Crawler Fleet</div>
            <div 
              className={`nav-item ${activePage === 'System Health' ? 'active' : ''}`}
              onClick={() => navigateTo('System Health')}
            ><Database size={20} /> System Health</div>
            <div 
              className={`nav-item ${activePage === 'Settings' ? 'active' : ''}`}
              onClick={() => navigateTo('Settings')}
              style={{ marginTop: 'auto' }}
            ><Settings size={20} /> Settings</div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Header */}
          <header className="top-header">
            <div className="header-search">
              <Search size={18} color="var(--text-muted)" />
              <input type="text" placeholder="Search assets, alerts, IP addresses..." />
            </div>
            <div className="header-actions">
              <div className="live-badge">
                <div className="pulse-dot"></div> Live Detection Matrix Active
              </div>
              <button className="notification-btn">
                <Bell size={20} />
                <div className="notification-dot"></div>
              </button>
              <div className="user-profile" onClick={() => setIsProfileOpen(!isProfileOpen)} ref={dropdownRef}>
                <div className="avatar" style={{ border: isProfileOpen ? '2px solid var(--color-primary)' : '2px solid transparent' }}>A</div>
                {isProfileOpen && (
                  <div className="profile-dropdown">
                    <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid var(--border-light)', marginBottom: '0.5rem' }}>
                      <div style={{ fontWeight: 600 }}>Alex Developer</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Admin</div>
                    </div>
                    <div className="dropdown-item" onClick={() => navigateTo('Profile')}>
                      <User size={16} /> My Profile
                    </div>
                    <div className="dropdown-item" onClick={() => navigateTo('Settings')}>
                      <Settings size={16} /> Account Settings
                    </div>
                    <div className="dropdown-item danger">
                      <LogOut size={16} /> Sign Out
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Dynamic Page Rendering */}
          {renderPage()}
        </main>
      </div>
    </>
  );
}

export default Dashboard;
