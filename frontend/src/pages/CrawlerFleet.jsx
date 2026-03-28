import React from 'react';
import { Server, Activity, ArrowUpCircle, XCircle, Cpu } from 'lucide-react';

const fleetNodes = [
  { id: 'nd-eu-west-1', region: 'Europe (Frankfurt)', status: 'Online', uptime: '99.9%', cpu: '42%', requests: '14.2k/s', active: true },
  { id: 'nd-eu-west-2', region: 'Europe (London)', status: 'Online', uptime: '99.8%', cpu: '38%', requests: '12.1k/s', active: true },
  { id: 'nd-us-east-1', region: 'US East (N. Virginia)', status: 'High Load', uptime: '99.9%', cpu: '89%', requests: '38.4k/s', active: true },
  { id: 'nd-us-east-2', region: 'US East (Ohio)', status: 'Online', uptime: '99.9%', cpu: '21%', requests: '8.2k/s', active: true },
  { id: 'nd-ap-south-1', region: 'Asia Pacific (Mumbai)', status: 'Offline', uptime: '94.2%', cpu: 'N/A', requests: '0/s', active: false },
];

export default function CrawlerFleet() {
  return (
    <div className="dashboard-content">
      <h1 className="page-title">Crawler Fleet Nodes</h1>
      <p className="page-subtitle">Manage global scraper instances and network bandwidth</p>

      <div className="metrics-grid" style={{ marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem' }}>
            <div className="metric-icon blue" style={{ width: '48px', height: '48px' }}><Server size={24} /></div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Active Nodes</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>124 <span style={{fontSize: '1rem', color: 'var(--text-muted)'}}>/ 125</span></div>
            </div>
        </div>
        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem' }}>
            <div className="metric-icon purple" style={{ width: '48px', height: '48px' }}><Activity size={24} /></div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Global Request Rate</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>142k <span style={{fontSize: '1rem', color: 'var(--text-muted)'}}>req/s</span></div>
            </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '0' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="panel-title" style={{ marginBottom: 0 }}>
            <Server size={18} color="var(--color-primary)" />
            Node Directory
          </div>
          <button style={{ background: 'var(--color-primary)', border: 'none', color: '#fff', padding: '0.5rem 1.2rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             Deploy New Node
          </button>
        </div>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)', fontSize: '0.85rem', background: 'rgba(0,0,0,0.2)' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Node ID</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Region</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Uptime</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Network I/O</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>CPU Utilization</th>
            </tr>
          </thead>
          <tbody>
            {fleetNodes.map((node) => (
              <tr key={node.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>{node.id}</td>
                <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem' }}>{node.region}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span className={`status-badge ${node.status === 'Online' ? 'blocked' : node.status === 'High Load' ? 'pending' : ''}`} style={node.status === 'Offline' ? { background: 'rgba(244, 63, 94, 0.1)', color: 'var(--color-danger)', border: '1px solid rgba(244, 63, 94, 0.2)' } : {}}>
                    {node.status === 'Online' && <ArrowUpCircle size={10} style={{marginRight: '4px', display: 'inline-block'}}/>}
                    {node.status === 'Offline' && <XCircle size={10} style={{marginRight: '4px', display: 'inline-block'}}/>}
                    {node.status}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>{node.uptime}</td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{node.requests}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '120px' }}>
                        <Cpu size={14} color="var(--text-muted)" />
                        <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                            {node.active && <div style={{ width: node.cpu, height: '100%', background: parseInt(node.cpu) > 80 ? 'var(--color-danger)' : 'var(--color-primary)' }}></div>}
                        </div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>{node.cpu}</span>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
