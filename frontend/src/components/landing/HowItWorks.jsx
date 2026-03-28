import React from 'react';
import { Upload, Fingerprint, Eye, BrainCircuit, Bell } from 'lucide-react';
import { ScrollReveal } from '../../hooks/useAnimations';

const steps = [
  { id: 1, icon: <Upload size={22} />, title: 'Upload', desc: 'Ingest any digital asset — video, audio, image, or document', color: '#3b82f6' },
  { id: 2, icon: <Fingerprint size={22} />, title: 'Watermark', desc: 'Embed invisible forensic fingerprints into every file', color: '#8b5cf6' },
  { id: 3, icon: <Eye size={22} />, title: 'Monitor', desc: 'Scan the web, social platforms, and dark web 24/7', color: '#06b6d4' },
  { id: 4, icon: <BrainCircuit size={22} />, title: 'Detect', desc: 'AI identifies unauthorized copies instantly', color: '#00f6ff' },
  { id: 5, icon: <Bell size={22} />, title: 'Alert & Act', desc: 'Automated DMCA takedowns and evidence logging', color: '#10b981' },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" style={{
      padding: '96px 24px',
      background: '#0d0d16',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800, color: '#ffffff', marginBottom: '16px'
            }}>
              How NexusProtect{' '}
              <span style={{
                background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
              }}>Works</span>
            </h2>
            <p style={{ color: '#9ca3af', fontSize: '1rem', maxWidth: '520px', margin: '0 auto' }}>
              A seamless 5-step pipeline that runs automatically from ingestion to enforcement.
            </p>
          </div>
        </ScrollReveal>

        {/* Steps */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
          gap: '12px', position: 'relative'
        }}>
          {steps.map((step, idx) => (
            <ScrollReveal key={step.id} delay={0.1 + idx * 0.1} direction="up" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: '14px', width: '150px', textAlign: 'center', cursor: 'default'
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  border: `2px solid ${step.color}`,
                  background: `${step.color}1a`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: step.color, flexShrink: 0,
                  boxShadow: `0 0 20px ${step.color}33`,
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease'
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.15) rotate(5deg)';
                    e.currentTarget.style.boxShadow = `0 0 35px ${step.color}66`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                    e.currentTarget.style.boxShadow = `0 0 20px ${step.color}33`;
                  }}
                >
                  {step.icon}
                </div>
                <div style={{ fontSize: '11px', color: step.color, fontWeight: 700, letterSpacing: '0.08em' }}>
                  STEP {step.id}
                </div>
                <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                  {step.title}
                </h4>
                <p style={{ color: '#6b7280', fontSize: '13px', lineHeight: 1.5, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
              {idx < steps.length - 1 && (
                <div style={{
                  fontSize: '20px', color: 'rgba(255,255,255,0.12)',
                  flexShrink: 0, marginBottom: '60px',
                  animation: `arrow-pulse 2s ease-in-out infinite`,
                  animationDelay: `${idx * 0.3}s`
                }}>→</div>
              )}
            </ScrollReveal>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes arrow-pulse {
          0%, 100% { opacity: 0.2; transform: translateX(0); }
          50% { opacity: 0.6; transform: translateX(4px); }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;
