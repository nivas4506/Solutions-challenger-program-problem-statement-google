import React from 'react';
import { Check } from 'lucide-react';
import { ScrollReveal } from '../../hooks/useAnimations';

const plans = [
  {
    name: 'Starter',
    price: '$299',
    frequency: '/month',
    desc: 'Perfect for independent creators and small studios.',
    features: ['Up to 500 protected assets', 'Social platform monitoring', 'Manual DMCA generation', '30-day violation history', 'Email alerts'],
    cta: 'Start Free Trial',
    highlight: false
  },
  {
    name: 'Professional',
    price: '$999',
    frequency: '/month',
    desc: 'For growing media companies scaling their content operations.',
    features: ['Up to 10,000 protected assets', 'AI forensic watermarking', 'Automated DMCA takedowns', '1-year violation history', 'API access & webhooks', 'Priority support'],
    cta: 'Get Started',
    highlight: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    frequency: '',
    desc: 'For studios, broadcasters, and publishers at global scale.',
    features: ['Unlimited assets', 'Dedicated crawling fleet', 'Zero-click enforcement', 'Custom integrations', 'SLA guarantees', 'Dedicated success manager'],
    cta: 'Contact Sales',
    highlight: false
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" style={{ padding: '96px 24px', background: '#0d0d16', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800, color: '#ffffff', marginBottom: '16px'
            }}>
              Flexible Pricing for{' '}
              <span style={{
                background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
              }}>Every Scale</span>
            </h2>
            <p style={{ color: '#9ca3af', fontSize: '1rem', maxWidth: '480px', margin: '0 auto' }}>
              Start free. Upgrade as your catalog grows. No hidden fees.
            </p>
          </div>
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', alignItems: 'stretch' }}>
          {plans.map((plan, i) => (
            <ScrollReveal key={i} delay={i * 0.12} direction="up">
              <div style={{
                padding: '36px 32px', borderRadius: '20px', display: 'flex', flexDirection: 'column',
                height: '100%', boxSizing: 'border-box',
                border: plan.highlight ? '2px solid rgba(139,92,246,0.6)' : '1px solid rgba(255,255,255,0.08)',
                background: plan.highlight
                  ? 'linear-gradient(160deg, rgba(139,92,246,0.15) 0%, rgba(20,20,31,0.95) 100%)'
                  : 'rgba(15,15,24,0.8)',
                boxShadow: plan.highlight ? '0 0 40px rgba(139,92,246,0.15)' : 'none',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s'
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  if (!plan.highlight) e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)';
                  else e.currentTarget.style.boxShadow = '0 0 60px rgba(139,92,246,0.25)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = plan.highlight ? '0 0 40px rgba(139,92,246,0.15)' : 'none';
                }}
              >
                {plan.highlight && (
                  <div style={{
                    fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em',
                    color: '#00f6ff', marginBottom: '12px', textTransform: 'uppercase'
                  }}>⭐ Most Popular</div>
                )}
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                  {plan.name}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px', minHeight: '40px' }}>{plan.desc}</p>
                <div style={{ marginBottom: '28px', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '2.8rem', fontWeight: 800, color: '#ffffff', fontFamily: "'Outfit', sans-serif", lineHeight: 1 }}>
                    {plan.price}
                  </span>
                  <span style={{ color: '#6b7280', fontSize: '14px' }}>{plan.frequency}</span>
                </div>
                <button style={{
                  width: '100%', padding: '14px', borderRadius: '10px',
                  fontWeight: 600, fontSize: '15px', cursor: 'pointer', marginBottom: '28px',
                  border: 'none',
                  background: plan.highlight ? 'linear-gradient(to right, #8b5cf6, #3b82f6)' : 'rgba(255,255,255,0.06)',
                  color: '#ffffff',
                  outline: plan.highlight ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease',
                  position: 'relative', overflow: 'hidden'
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.opacity = '0.85';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {plan.cta}
                </button>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: 'auto' }}>
                  {plan.features.map((f, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Check size={16} style={{ color: '#06b6d4', flexShrink: 0 }} />
                      <span style={{ color: '#d1d5db', fontSize: '14px' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
