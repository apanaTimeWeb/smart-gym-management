"use client";

import LandingNavbar from '../LandingNavbar/LandingNavbar';
import LandingHero from '../LandingHero/LandingHero';
import LandingAbout from '../LandingAbout/LandingAbout';
import LandingBmiCalc from '../LandingBmiCalc/LandingBmiCalc';
import LandingPlans from '../LandingPlans/LandingPlans';
import LandingTrainers from '../LandingTrainers/LandingTrainers';
import LandingServices from '../LandingServices/LandingServices';
import LandingSchedule from '../LandingSchedule/LandingSchedule';
import LandingGallery from '../LandingGallery/LandingGallery';
import LandingBooking from '../LandingBooking/LandingBooking';
import LandingTransformations from '../LandingTransformations/LandingTransformations';
import LandingTestimonials from '../LandingTestimonials/LandingTestimonials';
import LandingContact from '../LandingContact/LandingContact';
import LandingFooter from '../LandingFooter/LandingFooter';

import '../../landing.css';
import { LandingProvider } from '../../landing_context/LandingContext';

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

export default function LandingMain() {
 return (
 <LandingProvider>
 <LandingContent />
 </LandingProvider>
 );
}
