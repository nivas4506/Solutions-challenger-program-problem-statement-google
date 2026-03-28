import React, { useState, useEffect } from 'react';
import { ShieldCheck, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const smoothScroll = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 0.4s ease',
        background: scrolled ? 'rgba(10,10,15,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>

            {/* Brand */}
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', transition: 'opacity 0.3s' }}
              onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <div style={{
                width: 36, height: 36, borderRadius: '10px',
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 12px rgba(59,130,246,0.3)'
              }}>
                <ShieldCheck size={20} style={{ color: 'white' }} />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', fontFamily: "'Outfit', sans-serif" }}>
                NexusProtect
              </span>
            </div>

            {/* Desktop Nav Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}
              className="desktop-nav"
            >
              {navLinks.map(item => (
                <a key={item.label}
                  href={item.href}
                  onClick={(e) => smoothScroll(e, item.href)}
                  style={{
                    color: '#9ca3af', fontSize: '14px', textDecoration: 'none',
                    transition: 'color 0.2s, transform 0.2s',
                    position: 'relative', padding: '4px 0'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#ffffff'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#9ca3af'; }}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Right CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button style={{
                color: '#9ca3af', fontSize: '14px', background: 'none',
                border: 'none', cursor: 'pointer', transition: 'color 0.2s',
                fontWeight: 500
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                style={{
                  padding: '8px 20px', borderRadius: '999px',
                  background: 'linear-gradient(to right, #3b82f6, #06b6d4)',
                  color: 'white', fontSize: '14px', fontWeight: 600,
                  border: 'none', cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 0 12px rgba(6,182,212,0.2)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(6,182,212,0.4)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(6,182,212,0.2)';
                }}
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Global smooth scroll style */}
      <style>{`
        html { scroll-behavior: smooth; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
