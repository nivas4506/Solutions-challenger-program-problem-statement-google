import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Lock, Users, Key, AlertTriangle } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('General');
  
  // Toggles state 
  const [toggles, setToggles] = useState({
    autoDmca: true,
    emailAlerts: true,
    slackHooks: false,
    lockDown: false
  });

  const handleToggle = (key) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));

  const ToggleSwitch = ({ active, onClick }) => (
    <div className={`toggle-switch ${active ? 'active' : ''}`} onClick={onClick}>
       <div className="toggle-knob"></div>
    </div>
  );

  const renderTabContent = () => {
    switch(activeTab) {
      case 'General':
        return (
          <div className="glass-panel" style={{ animation: 'fadeIn 0.3s ease-out' }}>
            <h3 style={{ marginTop: 0, marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>General Preferences</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="form-group">
                <label className="form-label">Data Retention Period</label>
                <select className="form-input" style={{ maxWidth: '400px', cursor: 'pointer' }} defaultValue="14 Days">
                  <option value="14 Days">14 Days (Standard)</option>
                  <option value="30 Days">30 Days (Extended)</option>
                  <option value="90 Days">90 Days (Compliance)</option>
                </select>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem', margin: '0.5rem 0 0 0' }}>Determines how long crawler metadata and alert logs are kept before auto-deletion.</p>
              </div>

              <div className="form-group">
                <label className="form-label">Media Encoding Benchmark</label>
                <select className="form-input" style={{ maxWidth: '400px', cursor: 'pointer' }} defaultValue="H.265">
                  <option value="H.264">H.264 / AVC</option>
                  <option value="H.265">H.265 / HEVC</option>
                  <option value="AV1">AV1</option>
                </select>
              </div>

              <div style={{ marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)' }}>
                 <button style={{ background: 'var(--color-primary)', color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>Save General Settings</button>
              </div>
            </div>
          </div>
        );

      case 'Enforcement Policies':
        return (
          <div className="glass-panel" style={{ animation: 'fadeIn 0.3s ease-out' }}>
            <h3 style={{ marginTop: 0, marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>Enforcement & Takedowns</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0' }}>Automated Takedowns (DMCA)</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Automatically issue DMCA notices when fingerprint match confidence is exceptionally high.</p>
                </div>
                <ToggleSwitch active={toggles.autoDmca} onClick={() => handleToggle('autoDmca')} />
              </div>

              <div className="form-group">
                <label className="form-label">Takedown Confidence Threshold</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', maxWidth: '400px' }}>
                  <input type="range" min="80" max="100" defaultValue="95" style={{ flex: 1 }} />
                  <span style={{ fontWeight: 600 }}>95%</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Watermarking Robustness / Visibility Profile</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', maxWidth: '400px' }}>
                  <input type="range" min="1" max="10" defaultValue="8" style={{ flex: 1 }} />
                  <span style={{ fontWeight: 600 }}>Level 8</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '400px', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  <span>Low Trace</span>
                  <span>Highly Resilient</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'API & Webhooks':
        return (
          <div className="glass-panel" style={{ animation: 'fadeIn 0.3s ease-out' }}>
            <h3 style={{ marginTop: 0, marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>API Keys & Integrations</h3>
            
            <div className="form-group">
                <label className="form-label">Production API Key</label>
                <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '500px' }}>
                    <input type="text" className="form-input" value="••••••••••••••••••••••••••••••••" readOnly style={{ fontFamily: 'monospace', color: 'var(--text-muted)' }} />
                    <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', color: '#fff', padding: '0 1rem', borderRadius: '8px', cursor: 'pointer' }}>Copy</button>
                    <button style={{ background: 'transparent', border: '1px solid var(--color-danger)', color: 'var(--color-danger)', padding: '0 1rem', borderRadius: '8px', cursor: 'pointer' }}>Revoke</button>
                </div>
            </div>

            <div style={{ margin: '2rem 0', height: '1px', background: 'var(--border-light)' }}></div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0' }}>Slack Webhooks</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Send high-alert notifications directly to your Slack #security channel.</p>
                </div>
                <ToggleSwitch active={toggles.slackHooks} onClick={() => handleToggle('slackHooks')} />
            </div>

            {toggles.slackHooks && (
              <div className="form-group" style={{ animation: 'slideUp 0.2s ease-out' }}>
                  <label className="form-label">Webhook URL</label>
                  <input type="text" className="form-input" placeholder="https://hooks.slack.com/services/..." />
              </div>
            )}
          </div>
        );

      default: return null;
    }
  };

  return (
    <div className="dashboard-content">
      <h1 className="page-title">Platform Settings</h1>
      <p className="page-subtitle">Configure enforcement policies and system preferences</p>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem', marginTop: '2rem' }}>
        {/* Settings Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div 
            className={`nav-item ${activeTab === 'General' ? 'active' : ''}`} 
            onClick={() => setActiveTab('General')}
          >
             <SettingsIcon size={18} /> General
          </div>
          <div 
            className={`nav-item ${activeTab === 'Enforcement Policies' ? 'active' : ''}`} 
            onClick={() => setActiveTab('Enforcement Policies')}
          >
             <Lock size={18} /> Enforcement Policies
          </div>
          <div 
            className={`nav-item ${activeTab === 'API & Webhooks' ? 'active' : ''}`} 
            onClick={() => setActiveTab('API & Webhooks')}
          >
             <Key size={18} /> API & Webhooks
          </div>
          <div 
            className={`nav-item ${activeTab === 'Team Access' ? 'active' : ''}`} 
            onClick={() => setActiveTab('Team Access')}
          >
             <Users size={18} /> Team Access
          </div>
        </div>

        {/* Dynamic Content */}
        <div>{renderTabContent()}</div>
      </div>
    </div>
  );
}
