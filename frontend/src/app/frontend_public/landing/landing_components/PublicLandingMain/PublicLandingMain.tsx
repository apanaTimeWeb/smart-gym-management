// RESPONSIBILITY: Composes the PublicLanding page sections in scroll order and owns the module query-provider boundary.
import PublicLandingQueryProvider from '@/app/frontend_public/landing/landing_components/PublicLandingQueryProvider/PublicLandingQueryProvider';
import PublicLandingNavbar from '@/app/frontend_public/landing/landing_components/PublicLandingNavbar/PublicLandingNavbar';
import PublicLandingHero from '@/app/frontend_public/landing/landing_components/PublicLandingHero/PublicLandingHero';
import PublicLandingAbout from '@/app/frontend_public/landing/landing_components/PublicLandingAbout/PublicLandingAbout';
import PublicLandingBmiCalc from '@/app/frontend_public/landing/landing_components/PublicLandingBmiCalc/PublicLandingBmiCalc';
import PublicLandingPlans from '@/app/frontend_public/landing/landing_components/PublicLandingPlans/PublicLandingPlans';
import PublicLandingTrainers from '@/app/frontend_public/landing/landing_components/PublicLandingTrainers/PublicLandingTrainers';
import PublicLandingServices from '@/app/frontend_public/landing/landing_components/PublicLandingServices/PublicLandingServices';
import PublicLandingSchedule from '@/app/frontend_public/landing/landing_components/PublicLandingSchedule/PublicLandingSchedule';
import PublicLandingGallery from '@/app/frontend_public/landing/landing_components/PublicLandingGallery/PublicLandingGallery';
import PublicLandingBooking from '@/app/frontend_public/landing/landing_components/PublicLandingBooking/PublicLandingBooking';
import PublicLandingTransformations from '@/app/frontend_public/landing/landing_components/PublicLandingTransformations/PublicLandingTransformations';
import PublicLandingTestimonials from '@/app/frontend_public/landing/landing_components/PublicLandingTestimonials/PublicLandingTestimonials';
import PublicLandingContact from '@/app/frontend_public/landing/landing_components/PublicLandingContact/PublicLandingContact';
import PublicLandingFooter from '@/app/frontend_public/landing/landing_components/PublicLandingFooter/PublicLandingFooter';

/**
 * PublicLandingMain owns the presentation for its documented PublicLanding section and consumes only module-owned configuration or approved infrastructure.
 * @dependencies PublicLanding translations/configuration and approved global UI primitives where imported.
 * @edge-case The section must remain usable with localized text, narrow viewports, and reduced-motion preferences.
 */
export default function PublicLandingMain() {
  return (
    <PublicLandingQueryProvider>
      <div className="min-h-screen landing-module bg-page text-primary">
        <PublicLandingNavbar />
        <main>
          <PublicLandingHero />
          <PublicLandingAbout />
          <PublicLandingBmiCalc />
          <PublicLandingPlans />
          <PublicLandingTrainers />
          <PublicLandingServices />
          <PublicLandingSchedule />
          <PublicLandingGallery />
          <PublicLandingBooking />
          <PublicLandingTransformations />
          <PublicLandingTestimonials />
          <PublicLandingContact />
        </main>
        <PublicLandingFooter />
      </div>
    </PublicLandingQueryProvider>
  );
}
