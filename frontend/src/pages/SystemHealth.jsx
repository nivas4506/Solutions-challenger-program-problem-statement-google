import React from 'react';
import { Database, LayoutDashboard, Fingerprint, Lock, ShieldCheck, CheckCircle } from 'lucide-react';

export default function SystemHealth() {
  const services = [
    { name: 'API Gateway', status: 'Healthy', latency: '12ms', icon: <LayoutDashboard size={18} /> },
    { name: 'Media Ingestion Pipeline', status: 'Healthy', latency: '48ms', icon: <FileVideoIcon /> },
    { name: 'Watermarking Core', status: 'Healthy', latency: '142ms', icon: <Lock size={18} /> },
    { name: 'Fingerprinting Engine', status: 'Degraded', latency: '850ms', icon: <Fingerprint size={18} /> },
    { name: 'Detection Engine', status: 'Healthy', latency: '35ms', icon: <ShieldCheck size={18} /> },
    { name: 'Qdrant Vector DB', status: 'Healthy', latency: '8ms', icon: <Database size={18} /> },
    { name: 'ClickHouse AnalyticsDB', status: 'Healthy', latency: '15ms', icon: <Database size={18} /> },
    { name: 'PostgreSQL Metadata DB', status: 'Healthy', latency: '22ms', icon: <Database size={18} /> },
  ];

  function FileVideoIcon() {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <polygon points="10 16 16 12 10 8 10 16"></polygon>
      </svg>
    )
  }

  return (
    <div className="dashboard-content">
      <h1 className="page-title">System Health Mapping</h1>
      <p className="page-subtitle">Microservice status and database connectivity overview</p>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ marginTop: 0, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ActivityIcon /> Global Service Mesh
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {services.map((svc, i) => (
            <div key={i} style={{ padding: '1.25rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-light)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: svc.status === 'Healthy' ? 'var(--color-primary)' : 'var(--color-warning)' }}>
                   {svc.icon}
                </div>
                <div>
                   <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{svc.name}</div>
                   <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Latency: {svc.latency}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {svc.status === 'Healthy' ? (
                  <><CheckCircle size={14} color="var(--color-success)" /><span style={{ color: 'var(--color-success)', fontSize: '0.8rem', fontWeight: 600 }}>{svc.status}</span></>
                ) : (
                  <><AlertTriangleIcon color="var(--color-warning)" /><span style={{ color: 'var(--color-warning)', fontSize: '0.8rem', fontWeight: 600 }}>{svc.status}</span></>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  function ActivityIcon() {
      return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
  }
  function AlertTriangleIcon({color}) {
      return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" x2="12" y1="9" y2="13"></line><line x1="12" x2="12.01" y1="17" y2="17"></line></svg>
  }
}
