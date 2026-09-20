// RESPONSIBILITY: Composes the Landing page sections in scroll order and owns the module query-provider boundary.
import LandingQueryProvider from '@/app/landing/landing_components/LandingQueryProvider/LandingQueryProvider';
import LandingNavbar from '@/app/landing/landing_components/LandingNavbar/LandingNavbar';
import LandingHero from '@/app/landing/landing_components/LandingHero/LandingHero';
import LandingAbout from '@/app/landing/landing_components/LandingAbout/LandingAbout';
import LandingBmiCalc from '@/app/landing/landing_components/LandingBmiCalc/LandingBmiCalc';
import LandingPlans from '@/app/landing/landing_components/LandingPlans/LandingPlans';
import LandingTrainers from '@/app/landing/landing_components/LandingTrainers/LandingTrainers';
import LandingServices from '@/app/landing/landing_components/LandingServices/LandingServices';
import LandingSchedule from '@/app/landing/landing_components/LandingSchedule/LandingSchedule';
import LandingGallery from '@/app/landing/landing_components/LandingGallery/LandingGallery';
import LandingBooking from '@/app/landing/landing_components/LandingBooking/LandingBooking';
import LandingTransformations from '@/app/landing/landing_components/LandingTransformations/LandingTransformations';
import LandingTestimonials from '@/app/landing/landing_components/LandingTestimonials/LandingTestimonials';
import LandingContact from '@/app/landing/landing_components/LandingContact/LandingContact';
import LandingFooter from '@/app/landing/landing_components/LandingFooter/LandingFooter';

export default function LandingMain() {
  return (
    <LandingQueryProvider>
      <div className="min-h-screen landing-module bg-page text-primary font-sans">
        <LandingNavbar />
        <main>
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
        </main>
        <LandingFooter />
      </div>
    </LandingQueryProvider>
  );
}
