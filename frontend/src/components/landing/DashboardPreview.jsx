import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { Shield, AlertTriangle, Activity } from 'lucide-react';
import { ScrollReveal, useScrollReveal, useCounter } from '../../hooks/useAnimations';

const barData = [
  { name: 'Mon', violations: 4 }, { name: 'Tue', violations: 7 },
  { name: 'Wed', violations: 2 }, { name: 'Thu', violations: 12 },
  { name: 'Fri', violations: 18 }, { name: 'Sat', violations: 25 },
  { name: 'Sun', violations: 15 }
];

const AnimatedStat = ({ label, target, suffix = '', color = '#ffffff' }) => {
  const [ref, isVisible] = useScrollReveal(0.3);
  const count = useCounter(target, 2000, true, isVisible);

  return (
    <div ref={ref} style={{ padding: '16px 20px' }}>
      <div style={{ color: '#6b7280', fontSize: '12px', marginBottom: '6px' }}>{label}</div>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.6rem', fontWeight: 800, color }}>
        {count.toLocaleString()}{suffix}
      </div>
    </div>
  );
};

const DashboardPreview = () => {
  return (
    <section style={{
      padding: '96px 24px', background: '#0a0a0f',
      position: 'relative', overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', right: '-100px', top: '20%',
        width: '400px', height: '400px', borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(6,182,212,0.1), transparent)'
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 5 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '64px' }}>

          {/* Left: text */}
          <ScrollReveal direction="left" style={{ flex: '1 1 360px', minWidth: '280px' }}>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 800, color: '#ffffff', lineHeight: 1.2, marginBottom: '20px'
            }}>
              <span style={{
                background: 'linear-gradient(to right, #3b82f6, #06b6d4)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
              }}>Actionable Intelligence</span>
              <br />at Your Fingertips
            </h2>
            <p style={{ color: '#9ca3af', lineHeight: 1.8, marginBottom: '32px', fontSize: '1rem' }}>
              Our intuitive dashboard gives you a bird's-eye view of every digital asset — across all categories.
              Monitor live violations, review historical trends, and initiate one-click DMCA takedowns.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { icon: <Shield size={18} style={{ color: '#06b6d4' }} />, text: 'Live monitoring across 10,000+ platforms' },
                { icon: <AlertTriangle size={18} style={{ color: '#8b5cf6' }} />, text: 'Automated DMCA takedown generation' },
                { icon: <Activity size={18} style={{ color: '#00f6ff' }} />, text: 'Real-time forensic payload extraction' },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={0.2 + i * 0.1} direction="left">
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    color: '#d1d5db', fontSize: '0.95rem',
                    padding: '8px 0',
                    transition: 'transform 0.3s',
                    cursor: 'default'
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateX(6px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
                  >
                    {item.icon} {item.text}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>

          {/* Right: dashboard */}
          <ScrollReveal direction="right" style={{ flex: '1 1 400px', minWidth: '300px', position: 'relative' }}>
            <div style={{
              borderRadius: '16px', overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(20,20,31,0.8)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 60px rgba(0,0,0,0.5)',
              transition: 'box-shadow 0.5s'
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 80px rgba(0,0,0,0.6), 0 0 30px rgba(59,130,246,0.1)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 60px rgba(0,0,0,0.5)'}
            >
              <div style={{
                padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: '#ffffff', fontSize: '15px' }}>
                  Violation Detection Trends
                </span>
                <span style={{
                  padding: '4px 10px', borderRadius: '999px',
                  background: 'rgba(239,68,68,0.15)', color: '#f87171', fontSize: '12px', fontWeight: 600,
                  animation: 'subtle-pulse 3s ease-in-out infinite'
                }}>+12% this week</span>
              </div>
              <div style={{ padding: '16px 20px', height: '200px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <XAxis dataKey="name" stroke="#4b5563" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip
                      cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                      contentStyle={{ background: '#1e1e2d', border: '1px solid #374151', color: '#fff', borderRadius: '8px' }}
                    />
                    <Bar dataKey="violations" fill="url(#barGradient)" radius={[4, 4, 0, 0]} animationDuration={1500} />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                  <AnimatedStat label="Total Takedowns" target={12481} suffix="" color="#ffffff" />
                </div>
                <AnimatedStat label="Success Rate" target={99} suffix=".4%" color="#06b6d4" />
              </div>
            </div>

            {/* Floating alert */}
            <div style={{
              position: 'absolute', bottom: '-20px', left: '-20px',
              background: 'rgba(20,20,31,0.95)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(239,68,68,0.3)', borderRadius: '12px',
              padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)', width: '240px',
              animation: 'float 3s ease-in-out infinite'
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                background: 'rgba(239,68,68,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <AlertTriangle size={18} style={{ color: '#f87171' }} />
              </div>
              <div>
                <div style={{ color: '#ffffff', fontSize: '13px', fontWeight: 600 }}>Violation Detected</div>
                <div style={{ color: '#8b5cf6', fontSize: '12px' }}>Unauthorized stream: iptv-net-07</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes subtle-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </section>
  );
};

export default DashboardPreview;
