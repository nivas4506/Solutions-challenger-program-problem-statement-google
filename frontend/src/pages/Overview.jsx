import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShieldCheck, AlertTriangle, Activity, FileVideo } from 'lucide-react';

const chartData = [
  { time: '00:00', ingest: 120, alerts: 10 },
  { time: '04:00', ingest: 300, alerts: 20 },
  { time: '08:00', ingest: 800, alerts: 85 },
  { time: '12:00', ingest: 1200, alerts: 140 },
  { time: '16:00', ingest: 1500, alerts: 210 },
  { time: '20:00', ingest: 900, alerts: 110 },
  { time: '23:59', ingest: 400, alerts: 30 },
];

const alertFeed = [
  { id: 1, platform: 'sports-stream-live.net', asset: 'Premier League Match 45', status: 'Blocked', type: 'critical', time: '2m ago' },
  { id: 2, platform: 'f1-replays.to', asset: 'F1 Highlights', status: 'Takedown Pending', type: 'warning', time: '15m ago' },
  { id: 3, platform: 'social-video-clone.io', asset: 'UFC 300 Main Event', status: 'Blocked', type: 'critical', time: '1h ago' },
];

export default function Overview() {
  const [stats, setStats] = useState({ assets: 0, blocked: 0, latency: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStats({ assets: 1420512, blocked: 8421, latency: 42 });
      setIsLoading(false);
    }, 400);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="dashboard-content">
      <h1 className="page-title">Command Center</h1>
      <p className="page-subtitle">Real-time digital asset protection overview</p>

      {/* Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span>Assets Monitored</span>
            <div className="metric-icon blue"><FileVideo size={20} /></div>
          </div>
          <div className="metric-value">
            {isLoading ? "..." : formatNumber(stats.assets)}
          </div>
          <div className="metric-trend up">↑ 12% vs last month</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>Piracy Streams Blocked</span>
            <div className="metric-icon red"><AlertTriangle size={20} /></div>
          </div>
          <div className="metric-value" style={{ color: 'var(--color-danger)'}}>
            {isLoading ? "..." : formatNumber(stats.blocked)}
          </div>
          <div className="metric-trend up">↑ 5.2% vs last 24h</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>Detection Latency</span>
            <div className="metric-icon green"><Activity size={20} /></div>
          </div>
          <div className="metric-value" style={{ color: 'var(--color-success)'}}>
            {isLoading ? "..." : stats.latency} <span style={{fontSize: '1rem', color: 'var(--text-muted)'}}>ms</span>
          </div>
          <div className="metric-trend down">↓ 14% optimization</div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Chart Panel */}
        <div className="glass-panel">
          <div className="panel-header">
            <div className="panel-title"><Activity size={18} color="var(--color-primary)" /> Volume Activity (24h)</div>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIngest" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(18, 18, 20, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Area type="monotone" dataKey="ingest" name="Media Ingestion MB/s" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorIngest)" />
                <Area type="monotone" dataKey="alerts" name="Piracy Alerts" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorAlerts)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alert Feed Panel */}
        <div className="glass-panel">
          <div className="panel-header">
            <div className="panel-title"><AlertTriangle size={18} color="var(--color-danger)" /> Live Intercepts</div>
          </div>
          <div className="alert-list">
            {alertFeed.map((alert) => (
              <div key={alert.id} className={`alert-item ${alert.type}`}>
                <div style={{marginTop: '0.2rem'}}>
                  {alert.type === 'critical' ? 
                    <ShieldCheck size={18} color="var(--color-success)" /> : 
                    <Activity size={18} color="var(--color-warning)" />
                  }
                </div>
                <div className="alert-content">
                  <h4>{alert.asset}</h4>
                  <p>Detected on: {alert.platform}</p>
                  <div className="alert-meta">
                    <span className={`status-badge ${alert.status === 'Blocked' ? 'blocked' : 'pending'}`}>
                      {alert.status}
                    </span>
                    <span>{alert.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
