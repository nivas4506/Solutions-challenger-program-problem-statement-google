import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/landing/Navbar';
import HeroSection from '../../components/landing/HeroSection';
import FeaturesSection from '../../components/landing/FeaturesSection';
import HowItWorks from '../../components/landing/HowItWorks';
import DashboardPreview from '../../components/landing/DashboardPreview';
import BenefitsSection from '../../components/landing/BenefitsSection';
import Testimonials from '../../components/landing/Testimonials';
import PricingSection from '../../components/landing/PricingSection';
import Footer from '../../components/landing/Footer';
import CTASection from '../../components/landing/CTASection';

const LandingPage = () => {
  useEffect(() => {
    document.body.style.background = '#0a0a0f';
    document.body.style.color = '#f8fafc';
    document.body.style.overflowX = 'hidden';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    return () => {
      document.body.style.background = '';
      document.body.style.overflowX = '';
    };
  }, []);

  return (
    <div style={{ minHeight: '100vh', width: '100%', overflowX: 'hidden', background: '#0a0a0f', color: '#f8fafc', boxSizing: 'border-box' }}>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <DashboardPreview />
      <BenefitsSection />
      <Testimonials />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;
