import React from 'react';
import { DollarSign, Zap, Lock, Expand } from 'lucide-react';
import { ScrollReveal } from '../../hooks/useAnimations';

const benefits = [
  {
    icon: <Lock size={24} style={{ color: '#3b82f6' }} />,
    title: 'Stop Piracy at the Source',
    desc: 'Instantly identify and shut down unauthorized redistribution of films, audio tracks, live streams, articles, and digital courses before they go viral.',
    glow: 'rgba(59,130,246,0.12)'
  },
  {
    icon: <DollarSign size={24} style={{ color: '#06b6d4' }} />,
    title: 'Recover Lost Revenue',
    desc: 'Every pirated download or unauthorized stream is money lost. Our automated enforcement recovers licensing revenue across all platforms globally.',
    glow: 'rgba(6,182,212,0.12)'
  },
  {
    icon: <Zap size={24} style={{ color: '#8b5cf6' }} />,
    title: 'Zero-Delay Automation',
    desc: 'No manual work needed. Violation detection, evidence capture, and DMCA takedown filing happen in milliseconds — around the clock.',
    glow: 'rgba(139,92,246,0.12)'
  },
  {
    icon: <Expand size={24} style={{ color: '#00f6ff' }} />,
    title: 'Scales With Your Catalog',
    desc: 'Protect 10 assets or 10 million. Our distributed infrastructure grows with your content library without any performance degradation.',
    glow: 'rgba(0,246,255,0.12)'
  }
];

const BenefitsSection = () => {
  return (
    <section style={{ padding: '96px 24px', background: '#050508', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800, color: '#ffffff', marginBottom: '16px'
            }}>
              Why Creators & Rights Holders Choose NexusProtect
            </h2>
            <p style={{ color: '#9ca3af', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
              Regardless of your content type, our platform delivers measurable protection with zero workflow disruption.
            </p>
          </div>
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {benefits.map((b, i) => (
            <ScrollReveal key={i} delay={0.05 + i * 0.1} direction="up">
              <div style={{
                padding: '32px', borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.07)',
                background: b.glow,
                display: 'flex', gap: '20px',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'default'
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 12px 30px ${b.glow}`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'transform 0.3s'
                }}>
                  {b.icon}
                </div>
                <div>
                  <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: 8 }}>
                    {b.title}
                  </h4>
                  <p style={{ color: '#9ca3af', fontSize: '0.875rem', lineHeight: 1.7 }}>{b.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
