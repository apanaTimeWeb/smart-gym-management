"use client";

import { LandingProvider } from './landing_context/LandingContext';
import LandingNavbar from './landing_components/LandingNavbar/LandingNavbar';
import LandingHero from './landing_components/LandingHero/LandingHero';
import LandingAbout from './landing_components/LandingAbout/LandingAbout';
import LandingBmiCalc from './landing_components/LandingBmiCalc/LandingBmiCalc';
import LandingPlans from './landing_components/LandingPlans/LandingPlans';
import LandingTrainers from './landing_components/LandingTrainers/LandingTrainers';
import LandingServices from './landing_components/LandingServices/LandingServices';
import LandingSchedule from './landing_components/LandingSchedule/LandingSchedule';
import LandingGallery from './landing_components/LandingGallery/LandingGallery';
import LandingBooking from './landing_components/LandingBooking/LandingBooking';
import LandingTransformations from './landing_components/LandingTransformations/LandingTransformations';
import LandingTestimonials from './landing_components/LandingTestimonials/LandingTestimonials';
import LandingContact from './landing_components/LandingContact/LandingContact';
import LandingFooter from './landing_components/LandingFooter/LandingFooter';

import './landing.css';

function LandingContent() {
  return (
    <div className="min-h-screen landing-module bg-[var(--landing-bg-dark)] text-[var(--landing-text-primary)] font-sans" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <LandingNavbar />
      <LandingHero />
      <LandingAbout />
      <LandingBmiCalc />
      <LandingPlans />
      <LandingTrainers />
      <LandingServices />
      <LandingSchedule />
      <LandingGallery />
      <LandingBooking />
      <LandingTransformations />
      <LandingTestimonials />
      <LandingContact />
      <LandingFooter />
    </div>
  );
}

export default function LandingPage() {
  return (
    <LandingProvider>
      <LandingContent />
    </LandingProvider>
  );
}
