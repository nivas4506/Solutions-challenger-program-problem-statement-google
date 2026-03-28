import React from 'react';
import { AlertTriangle, MapPin, Globe, ShieldOff, CheckCircle } from 'lucide-react';

const alerts = [
  { id: 'ALR-001', time: '10:42 AM', platform: 'sports-stream-live.net', ip: '192.168.1.104', location: 'Russia', asset: 'Premier League Match 45', confidence: '99%', status: 'Blocked' },
  { id: 'ALR-002', time: '10:35 AM', platform: 'f1-replays.to', ip: '45.33.12.8', location: 'Netherlands', asset: 'F1 Highlights', confidence: '94%', status: 'Takedown Issued' },
  { id: 'ALR-003', time: '10:15 AM', platform: 'social-video-clone.io', ip: '104.28.19.4', location: 'Brazil', asset: 'UFC 300 Main Event', confidence: '98%', status: 'Blocked' },
  { id: 'ALR-004', time: '09:50 AM', platform: 'unknown-IP', ip: '8.8.8.8', location: 'United States', asset: 'Olympics 100m Final', confidence: '72%', status: 'Investigating' },
  { id: 'ALR-005', time: '09:12 AM', platform: 'telegram-channel-42', ip: 'N/A', location: 'Unknown', asset: 'Premier League Match 45', confidence: '100%', status: 'Takedown Issued' },
];

export default function AlertCenter() {
  return (
    <div className="dashboard-content">
      <h1 className="page-title">Alert Center</h1>
      <p className="page-subtitle">Real-time piracy detection logs and enforcement actions</p>

      <div className="metrics-grid" style={{ marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem' }}>
            <div className="metric-icon red" style={{ width: '48px', height: '48px' }}><AlertTriangle size={24} /></div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Critical Alerts (24h)</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>142</div>
            </div>
        </div>
        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem' }}>
            <div className="metric-icon green" style={{ width: '48px', height: '48px' }}><ShieldOff size={24} /></div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Successfully Blocked</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>128</div>
            </div>
        </div>
        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem' }}>
            <div className="metric-icon blue" style={{ width: '48px', height: '48px' }}><CheckCircle size={24} /></div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Enforcement Rate</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>90.1%</div>
            </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '0' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="panel-title" style={{ marginBottom: 0 }}>
            <AlertTriangle size={18} color="var(--color-danger)" />
            Detection Logs
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', color: '#fff', padding: '0.4rem 1rem', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer' }}>Filter: All</button>
            <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', color: '#fff', padding: '0.4rem 1rem', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer' }}>Export CSV</button>
          </div>
        </div>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Time</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Platform / IP</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Location</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Violating Asset</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Match Confidence</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Action Taken</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert) => (
              <tr key={alert.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', transition: 'background 0.2s' }} className="hover-row">
                <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>{alert.time}</td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Globe size={14} color="var(--text-muted)" />
                    {alert.platform}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '1.4rem', marginTop: '0.2rem' }}>{alert.ip}</div>
                </td>
                <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.8rem' }}>
                  <MapPin size={14} color="var(--text-muted)" /> {alert.location}
                </td>
                <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-primary)' }}>{alert.asset}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100px' }}>
                        <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ width: alert.confidence, height: '100%', background: parseInt(alert.confidence) > 90 ? 'var(--color-danger)' : 'var(--color-warning)' }}></div>
                        </div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{alert.confidence}</span>
                    </div>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span className={`status-badge ${alert.status === 'Blocked' ? 'blocked' : 'pending'}`}>
                    {alert.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style>{`
        .hover-row:hover { background: rgba(255,255,255,0.02); }
      `}</style>
    </div>
  );
}
