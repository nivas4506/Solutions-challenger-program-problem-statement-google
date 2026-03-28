import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const fadeStyle = (delay = 0) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`
  });

  return (
    <section style={{ position: 'relative', paddingTop: '120px', paddingBottom: '80px', overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}>

      {/* Animated background grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        backgroundImage:
          'linear-gradient(to right, rgba(128,128,128,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(128,128,128,0.07) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        pointerEvents: 'none'
      }} />

      {/* Parallax glow orbs */}
      <div style={{
        position: 'absolute', top: 0, left: '50%',
        transform: `translate(calc(-50% + ${mousePos.x}px), ${mousePos.y}px)`,
        width: '100%', height: '500px', zIndex: 1, pointerEvents: 'none', borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.22) 0%, transparent 65%)',
        transition: 'transform 0.3s ease-out'
      }} />
      <div style={{
        position: 'absolute', top: '160px', left: '-200px',
        transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)`,
        width: '500px', height: '500px', zIndex: 1, pointerEvents: 'none', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
        transition: 'transform 0.3s ease-out'
      }} />
      <div style={{
        position: 'absolute', bottom: '-100px', right: '-100px',
        transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
        width: '400px', height: '400px', zIndex: 1, pointerEvents: 'none', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)',
        transition: 'transform 0.3s ease-out'
      }} />

      {/* Floating particles */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: 3 + Math.random() * 3,
            height: 3 + Math.random() * 3,
            borderRadius: '50%',
            background: ['#3b82f6', '#8b5cf6', '#06b6d4', '#00f6ff'][i % 4],
            opacity: 0.3 + Math.random() * 0.3,
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            animation: `float-particle ${3 + i * 0.5}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.4}s`
          }} />
        ))}
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1100px', margin: '0 auto', padding: '0 24px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>

          {/* Badge */}
          <div style={{
            ...fadeStyle(0.1),
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '8px 16px', borderRadius: '999px', marginBottom: '32px',
            border: '1px solid rgba(6,182,212,0.35)',
            background: 'rgba(20,20,31,0.6)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 0 15px rgba(6,182,212,0.15)',
            cursor: 'default'
          }}>
            <span style={{
              display: 'inline-block',
              animation: 'pulse-glow 2s ease-in-out infinite'
            }}>
              <ShieldAlert size={16} style={{ color: '#06b6d4', flexShrink: 0 }} />
            </span>
            <span style={{ fontSize: '14px', fontWeight: 500, color: '#bfdbfe' }}>
              Universal Digital Asset Protection
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            ...fadeStyle(0.25),
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.15,
            marginBottom: '24px',
            letterSpacing: '-0.02em',
            maxWidth: '820px',
            width: '100%'
          }}>
            Protect Every Piece of{' '}
            <br />
            <span style={{
              background: 'linear-gradient(90deg, #3b82f6, #06b6d4, #00f6ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundSize: '200% auto',
              animation: 'gradient-shift 4s ease infinite'
            }}>
              Your Digital Content
            </span>
          </h1>

          {/* Subtext */}
          <p style={{
            ...fadeStyle(0.4),
            maxWidth: '660px',
            fontSize: '1.125rem', color: '#9ca3af',
            marginBottom: '40px', lineHeight: 1.75
          }}>
            From sports broadcasts to films, music, podcasts, news, and beyond — NexusProtect
            defends your intellectual property across every platform, in real-time, at global scale.
          </p>

          {/* CTA Buttons */}
          <div style={{ ...fadeStyle(0.55), display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                padding: '16px 32px', borderRadius: '999px',
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                color: 'white', fontWeight: 600, fontSize: '16px',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '8px',
                transition: 'transform 0.3s, box-shadow 0.3s',
                position: 'relative', overflow: 'hidden'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(6,182,212,0.5)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Get Started <ArrowRight size={18} />
            </button>

            <button
              style={{
                padding: '16px 32px', borderRadius: '999px',
                background: 'rgba(20,20,31,0.8)',
                color: 'white', fontWeight: 600, fontSize: '16px',
                border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '8px',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(30,30,45,0.9)';
                e.currentTarget.style.borderColor = '#06b6d4';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(6,182,212,0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(20,20,31,0.8)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Play size={18} style={{ transition: 'transform 0.3s' }} /> Request Demo
            </button>
          </div>

          {/* Category Pills */}
          <div style={{ ...fadeStyle(0.7), display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginTop: '40px' }}>
            {['🏆 Sports', '🎬 Film & TV', '🎵 Music', '📰 News', '🎮 Gaming', '🎙️ Podcasts', '📚 Education', '📸 Photography'].map((cat, i) => (
              <span key={cat} style={{
                padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 500,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.04)',
                color: '#94a3b8',
                transition: 'all 0.3s ease',
                cursor: 'default',
                animationDelay: `${i * 0.1}s`
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#06b6d4';
                  e.currentTarget.style.color = '#e2e8f0';
                  e.currentTarget.style.background = 'rgba(6,182,212,0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = '#94a3b8';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >{cat}</span>
            ))}
          </div>
        </div>

        {/* Demo Video */}
        <div style={{ ...fadeStyle(0.85), marginTop: '80px', position: 'relative', maxWidth: '1000px', margin: '80px auto 0' }}>
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', zIndex: 2,
            background: 'linear-gradient(to top, #0a0a0f, transparent)',
            pointerEvents: 'none', borderRadius: '0 0 16px 16px'
          }} />
          <div style={{
            borderRadius: '16px', overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)',
            background: '#050508',
            boxShadow: '0 25px 60px rgba(0,0,0,0.7), 0 0 40px rgba(59,130,246,0.08)',
            transition: 'box-shadow 0.5s ease'
          }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 25px 80px rgba(0,0,0,0.8), 0 0 60px rgba(59,130,246,0.15)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 25px 60px rgba(0,0,0,0.7), 0 0 40px rgba(59,130,246,0.08)'}
          >
            <div style={{
              height: '40px', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '8px',
              background: '#0a0a0f', borderBottom: '1px solid rgba(255,255,255,0.06)'
            }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(239,68,68,0.8)' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(234,179,8,0.8)' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(34,197,94,0.8)' }} />
              <div style={{
                flex: 1, maxWidth: 300, height: 22, borderRadius: 6, marginLeft: 12,
                background: 'rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', color: '#6b7280'
              }}>
                nexusprotect.io/dashboard
              </div>
            </div>
            <video autoPlay loop muted playsInline style={{ width: '100%', display: 'block', objectFit: 'cover' }}>
              <source src="/demo-video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* CSS Keyframes */}
      <style>{`
        @keyframes float-particle {
          0% { transform: translate(0, 0); }
          100% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 30 - 15}px); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; filter: drop-shadow(0 0 2px rgba(6,182,212,0.3)); }
          50% { opacity: 0.7; filter: drop-shadow(0 0 8px rgba(6,182,212,0.6)); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
