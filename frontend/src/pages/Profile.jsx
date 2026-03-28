import React, { useState } from 'react';
import { User, Shield, Briefcase, Key, History, Download, Eye, Monitor } from 'lucide-react';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('Account');

  const renderTabContent = () => {
    switch(activeTab) {
      case 'Account':
        return (
          <div className="glass-panel" style={{ animation: 'fadeIn 0.3s ease-out' }}>
            <h3 style={{ marginTop: 0, marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>Account Details</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-input" defaultValue="Alex Developer" />
                </div>
                <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-input" defaultValue="alex@example.com" />
                </div>
                <div className="form-group">
                    <label className="form-label">Organization</label>
                    <input type="text" className="form-input" defaultValue="Nexus Sports Media" disabled style={{ opacity: 0.6 }} />
                </div>
                <div className="form-group">
                    <label className="form-label">Role</label>
                    <input type="text" className="form-input" defaultValue="Super Administrator" disabled style={{ opacity: 0.6 }} />
                </div>
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)' }}>
                <button style={{ background: 'var(--color-primary)', color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>Save Changes</button>
            </div>
          </div>
        );

      case 'Security':
        return (
          <div className="glass-panel" style={{ animation: 'fadeIn 0.3s ease-out' }}>
            <h3 style={{ marginTop: 0, marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>Security & Authentication</h3>
            
            <div className="form-group" style={{ maxWidth: '400px' }}>
                <label className="form-label">Current Password</label>
                <input type="password" className="form-input" placeholder="••••••••" />
            </div>
            <div className="form-group" style={{ maxWidth: '400px' }}>
                <label className="form-label">New Password</label>
                <input type="password" className="form-input" placeholder="••••••••" />
            </div>

            <div style={{ marginTop: '2.5rem', background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h4 style={{ margin: '0 0 0.5rem 0' }}>Two-Factor Authentication (2FA)</h4>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Secure your account with an Authenticator app matching.</p>
                    </div>
                    <button style={{ background: 'transparent', color: 'var(--color-primary)', border: '1px solid var(--color-primary)', padding: '0.5rem 1.5rem', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}>Enable</button>
                </div>
            </div>
          </div>
        );

      case 'Activity':
        return (
          <div className="glass-panel" style={{ animation: 'fadeIn 0.3s ease-out', padding: 0 }}>
             <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-light)' }}>
                <h3 style={{ margin: 0 }}>Recent Login Activity</h3>
             </div>
             <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Browser / Device</th>
                    <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>IP Address</th>
                    <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Location</th>
                    <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                        <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem', fontWeight: 500 }}><Monitor size={14} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> Chrome on MacOS</td>
                        <td style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>192.168.1.45</td>
                        <td style={{ padding: '1rem 1.5rem', fontSize: '0.85rem' }}>California, US</td>
                        <td style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', color: 'var(--color-success)' }}>Current Session</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                        <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem', fontWeight: 500 }}><Monitor size={14} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> Chrome on MacOS</td>
                        <td style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>192.168.1.45</td>
                        <td style={{ padding: '1rem 1.5rem', fontSize: '0.85rem' }}>California, US</td>
                        <td style={{ padding: '1rem 1.5rem', fontSize: '0.85rem' }}>Yesterday, 14:02</td>
                    </tr>
                </tbody>
             </table>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dashboard-content">
      <h1 className="page-title">User Profile</h1>
      <p className="page-subtitle">Manage your personal account, security, and sessions</p>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem', marginTop: '2rem' }}>
        {/* Profile Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          
          <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-light)', marginBottom: '1rem', textAlign: 'center' }}>
            <div className="avatar" style={{ width: '80px', height: '80px', fontSize: '2.5rem', margin: '0 auto 1rem auto' }}>A</div>
            <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>Alex Developer</h4>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 600 }}>Super Admin</div>
          </div>

          <div 
            className={`nav-item ${activeTab === 'Account' ? 'active' : ''}`} 
            onClick={() => setActiveTab('Account')}
          >
             <User size={18} /> Account Details
          </div>
          <div 
            className={`nav-item ${activeTab === 'Security' ? 'active' : ''}`} 
            onClick={() => setActiveTab('Security')}
          >
             <Shield size={18} /> Login & Security
          </div>
          <div 
            className={`nav-item ${activeTab === 'Activity' ? 'active' : ''}`} 
            onClick={() => setActiveTab('Activity')}
          >
             <History size={18} /> Sessions & History
          </div>
        </div>

        {/* Dynamic Content */}
        <div>{renderTabContent()}</div>
      </div>
    </div>
  );
}
