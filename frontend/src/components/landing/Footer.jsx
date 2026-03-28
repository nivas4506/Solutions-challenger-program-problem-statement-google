import React from 'react';
import { ShieldCheck, Share2, Globe, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const footerLinks = {
  Product: ['Features', 'Pricing', 'API Docs', 'Integrations', 'Changelog'],
  Company: ['About Us', 'Careers', 'Blog', 'Press', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'DMCA Policy'],
};

const socials = [
  { icon: <Share2 size={16} />, label: 'Share' },
  { icon: <MessageCircle size={16} />, label: 'Chat' },
  { icon: <Globe size={16} />, label: 'Web' },
];

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer style={{ background: '#050508', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '72px 24px 32px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Top grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '40px', marginBottom: '56px' }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 2', minWidth: '240px' }}>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              <div style={{
                width: 36, height: 36, borderRadius: '10px',
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <ShieldCheck size={20} style={{ color: 'white' }} />
              </div>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', fontFamily: "'Outfit', sans-serif" }}>
                NexusProtect
              </span>
            </div>
            <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.8, maxWidth: '300px', marginBottom: '24px' }}>
              The world's most advanced digital asset protection platform. Safeguarding creative work across every industry with AI-powered enforcement.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {socials.map((s, i) => (
                <a key={i} href="#" style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#6b7280', transition: 'color 0.2s, border-color 0.2s, background 0.2s',
                  textDecoration: 'none'
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#3b82f6'; e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.background = 'rgba(59,130,246,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, items]) => (
            <div key={title}>
              <h4 style={{
                color: '#ffffff', fontSize: '12px', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px'
              }}>{title}</h4>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {items.map(item => (
                  <li key={item}>
                    <a href="#" style={{
                      color: '#6b7280', fontSize: '14px', textDecoration: 'none',
                      transition: 'color 0.2s'
                    }}
                      onMouseEnter={e => e.currentTarget.style.color = '#06b6d4'}
                      onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
                    >{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '24px',
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
          alignItems: 'center', gap: '12px'
        }}>
          <span style={{ color: '#4b5563', fontSize: '13px' }}>
            © {new Date().getFullYear()} NexusProtect Technologies Inc. All rights reserved.
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4b5563', fontSize: '13px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
