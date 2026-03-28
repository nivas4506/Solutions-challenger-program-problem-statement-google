import React from 'react';
import { ScrollReveal } from '../../hooks/useAnimations';

const testimonials = [
  {
    org: 'StreamVault Entertainment',
    quote: '"NexusProtect detected and issued takedowns for 847 pirated copies of our film release within the first 48 hours. Unprecedented speed."',
    author: 'Priya Nair',
    title: 'Chief Content Officer'
  },
  {
    org: 'BeatRight Music Group',
    quote: '"Our catalog of 50,000 tracks is now fully monitored. NexusProtect\'s AI catches re-uploaded audio even after pitch-shifting and compression."',
    author: 'Marcus Cole',
    title: 'VP of Rights Management'
  }
];

const categories = [
  { label: 'SPORTS MEDIA', icon: '🏆' },
  { label: 'FILM & TV', icon: '🎬' },
  { label: 'MUSIC', icon: '🎵' },
  { label: 'NEWS', icon: '📰' },
  { label: 'GAMING', icon: '🎮' },
  { label: 'EDUCATION', icon: '📚' },
];

const Testimonials = () => {
  return (
    <section style={{ padding: '96px 24px', background: '#0a0a0f', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: '50%', left: '25%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.07), transparent)',
        transform: 'translateY(-50%)', pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 5 }}>
        <ScrollReveal>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800, color: '#ffffff',
            textAlign: 'center', marginBottom: '64px'
          }}>
            Trusted Across Every{' '}
            <span style={{
              background: 'linear-gradient(to right, #8b5cf6, #06b6d4)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
            }}>
              Content Industry
            </span>
          </h2>
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '64px' }}>
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.15} direction={i === 0 ? 'left' : 'right'}>
              <div style={{
                padding: '40px', borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.07)',
                background: 'rgba(20,20,31,0.5)',
                backdropFilter: 'blur(12px)',
                position: 'relative', height: '100%', boxSizing: 'border-box',
                transition: 'border-color 0.4s, box-shadow 0.4s',
                cursor: 'default'
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(139,92,246,0.35)';
                  e.currentTarget.style.boxShadow = '0 8px 40px rgba(139,92,246,0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  fontSize: '64px', fontFamily: 'serif', lineHeight: 1,
                  color: '#06b6d4', opacity: 0.15,
                  position: 'absolute', top: '16px', left: '24px'
                }}>"</div>
                <p style={{ color: '#d1d5db', fontSize: '1.05rem', fontStyle: 'italic', lineHeight: 1.8, marginBottom: '28px', position: 'relative' }}>
                  {t.quote}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 700, fontSize: '14px', flexShrink: 0
                  }}>
                    {t.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{ color: '#ffffff', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>{t.author}</div>
                    <div style={{ color: '#06b6d4', fontSize: '13px' }}>{t.title}, {t.org}</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Industry Categories */}
        <ScrollReveal delay={0.2}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
            {categories.map(cat => (
              <div key={cat.label} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '12px 22px', borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.03)',
                color: '#94a3b8', fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em',
                transition: 'all 0.3s ease',
                cursor: 'default'
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(6,182,212,0.4)';
                  e.currentTarget.style.color = '#e2e8f0';
                  e.currentTarget.style.background = 'rgba(6,182,212,0.08)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.color = '#94a3b8';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span style={{ fontSize: '18px' }}>{cat.icon}</span>
                {cat.label}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Testimonials;
