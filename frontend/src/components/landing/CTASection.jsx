import React from 'react';
import { ArrowRight, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ScrollReveal } from '../../hooks/useAnimations';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section style={{ padding: '96px 24px', background: '#0a0a0f', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(59,130,246,0.08), transparent)'
      }} />

      <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 5 }}>
        <ScrollReveal>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '999px',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(20,20,31,0.6)',
            marginBottom: '28px'
          }}>
            <Lock size={14} style={{ color: '#00f6ff' }} />
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#d1d5db' }}>Enterprise-Grade Security for Every Creator</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800, color: '#ffffff',
            lineHeight: 1.15, marginBottom: '20px'
          }}>
            Start Protecting Your Content Today
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p style={{ fontSize: '1.15rem', color: '#9ca3af', marginBottom: '40px', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 40px' }}>
            Join thousands of creators, studios, broadcasters, publishers, and labels who trust NexusProtect
            to safeguard their intellectual property worldwide.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                padding: '18px 40px', borderRadius: '999px',
                background: 'linear-gradient(to right, #3b82f6, #8b5cf6, #06b6d4)',
                backgroundSize: '200% auto',
                color: 'white', fontWeight: 700, fontSize: '17px',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '10px',
                transition: 'all 0.3s ease',
                animation: 'gradient-shift-cta 4s ease infinite'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 40px rgba(6,182,212,0.5)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Create Free Account <ArrowRight size={20} />
            </button>
            <button style={{
              padding: '18px 40px', borderRadius: '999px',
              background: 'transparent', color: 'white',
              fontWeight: 600, fontSize: '17px',
              border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = '#06b6d4';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
              }}
            >
              Contact Sales
            </button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <p style={{ color: '#6b7280', fontSize: '13px', marginTop: '20px' }}>
            14-day free trial · No credit card required · Cancel anytime
          </p>
        </ScrollReveal>
      </div>

      <style>{`
        @keyframes gradient-shift-cta {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }
      `}</style>
    </section>
  );
};

export default CTASection;
