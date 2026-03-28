import React from 'react';
import { Fingerprint, BrainCircuit, Activity, Globe } from 'lucide-react';
import { ScrollReveal } from '../../hooks/useAnimations';

const featureList = [
  {
    icon: <Fingerprint size={32} />,
    title: "Digital Watermarking",
    description: "Embed invisible, tamper-proof fingerprints into videos, audio, images, and documents. Track leaks back to the exact source — every time.",
    color: '#3b82f6',
    borderColor: 'rgba(59,130,246,0.4)',
    glowColor: 'rgba(59,130,246,0.12)'
  },
  {
    icon: <BrainCircuit size={32} />,
    title: "AI-Based Detection",
    description: "Advanced ML models identify re-encoded, cropped, or modified copies of your content across social media, streaming platforms, and shadow sites.",
    color: '#8b5cf6',
    borderColor: 'rgba(139,92,246,0.4)',
    glowColor: 'rgba(139,92,246,0.12)'
  },
  {
    icon: <Activity size={32} />,
    title: "Real-Time Monitoring",
    description: "24/7 automated scanning of the web, dark web, IPTV services, torrent networks, and file-sharing platforms to instantly flag violations.",
    color: '#06b6d4',
    borderColor: 'rgba(6,182,212,0.4)',
    glowColor: 'rgba(6,182,212,0.12)'
  },
  {
    icon: <Globe size={32} />,
    title: "Global Content Tracking",
    description: "Geo-fenced enforcement ensuring your content is only accessed in licensed territories — spanning 190+ countries and 10,000+ platforms.",
    color: '#00f6ff',
    borderColor: 'rgba(0,246,255,0.4)',
    glowColor: 'rgba(0,246,255,0.12)'
  }
];

const FeatureCard = ({ feature, index }) => {
  return (
    <ScrollReveal delay={0.1 + index * 0.12} direction="up">
      <div
        style={{
          padding: '36px', borderRadius: '20px', height: '100%', boxSizing: 'border-box',
          border: `1px solid ${feature.borderColor}`,
          background: feature.glowColor,
          backdropFilter: 'blur(12px)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
          cursor: 'default',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = `0 20px 50px ${feature.glowColor}`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* Hover glow overlay */}
        <div style={{
          position: 'absolute', top: '0', right: '0',
          width: '150px', height: '150px', borderRadius: '50%',
          background: `radial-gradient(circle, ${feature.glowColor}, transparent)`,
          opacity: 0.5, pointerEvents: 'none'
        }} />

        <div style={{
          width: 64, height: 64, borderRadius: 16,
          background: feature.glowColor,
          border: `1px solid ${feature.borderColor}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 24, color: feature.color,
          transition: 'transform 0.3s',
          position: 'relative'
        }}>
          {feature.icon}
        </div>
        <h3 style={{
          fontFamily: "'Outfit', sans-serif", fontSize: '1.25rem',
          fontWeight: 700, color: '#ffffff', marginBottom: 12
        }}>
          {feature.title}
        </h3>
        <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: 1.7 }}>
          {feature.description}
        </p>
      </div>
    </ScrollReveal>
  );
};

const FeaturesSection = () => {
  return (
    <section id="features" style={{ padding: '96px 24px', background: '#0a0a0f', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 64px' }}>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800, color: '#ffffff', marginBottom: '16px'
            }}>
              A Multi-Layered{' '}
              <span style={{
                background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
              }}>
                Defense System
              </span>
            </h2>
            <p style={{ color: '#9ca3af', fontSize: '1.1rem', lineHeight: 1.7 }}>
              Whether you're protecting a blockbuster film, a chart-topping album, a live broadcast,
              or a corporate training video — our infrastructure has you covered.
            </p>
          </div>
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {featureList.map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
