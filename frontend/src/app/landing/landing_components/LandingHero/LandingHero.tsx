// RESPONSIBILITY: Renders the landing hero, CTA links, and static social-proof metrics; no business state.
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronDown, Play } from 'lucide-react';
import { LandingUrlConfig } from '@/app/landing/landing_url_config';
import { LANDING_STATS } from '@/app/landing/landing_utils/LandingSharedConstants';

export default function LandingHero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-page">
      <div className="absolute inset-0">
        <Image src="/gym-hero.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 pointer-events-none landing-hero-overlay" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none landing-hero-bottom-fade" aria-hidden="true" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
        <div className="inline-flex items-center gap-2 bg-surface-highlight backdrop-blur-sm border border-border rounded-full px-4 py-2 text-sm font-medium text-warning mb-8">
          <span className="w-2 h-2 rounded-full bg-success motion-safe:animate-pulse" aria-hidden="true" />
          Welcome to GymSmart
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-6 text-primary">
          Transform Your Body,
          <br />
          <span className="text-primary">Build Your Confidence</span>
        </h1>

        <p className="text-lg sm:text-xl text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
          Join our premium fitness center with expert trainers, personalized workout plans, diet guidance, and modern equipment.{' '}
          <br className="hidden sm:block" />
          <strong className="text-primary">Your fitness journey starts today.</strong>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href={LandingUrlConfig.ANCHORS.PLANS} className="landing-hero-primary-cta px-8 py-4 bg-primary text-on-primary font-bold text-lg rounded-xl flex items-center gap-2 w-full sm:w-auto justify-center hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
            Start Journey <ArrowRight size={18} strokeWidth={2} />
          </Link>
          <Link href={LandingUrlConfig.ANCHORS.BOOKING} className="px-8 py-4 font-bold text-lg rounded-xl border border-border text-primary hover:bg-surface-hover motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 flex items-center gap-2 w-full sm:w-auto justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
            <Play size={18} strokeWidth={2} className="text-primary" fill="currentColor" /> Book Trial
          </Link>
          <Link href={LandingUrlConfig.ANCHORS.CONTACT} className="px-8 py-4 font-bold text-lg rounded-xl border border-border text-secondary hover:bg-surface-hover motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 flex items-center gap-2 w-full sm:w-auto justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
            Contact Us
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
          {LANDING_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-black text-primary">{stat.value}</div>
              <div className="text-xs text-secondary mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <Link href={LandingUrlConfig.ANCHORS.ABOUT} aria-label="Scroll to About section" className="absolute bottom-8 left-1/2 -translate-x-1/2 motion-safe:animate-bounce z-10 min-h-11 min-w-11 flex items-center justify-center text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page rounded-full">
        <ChevronDown size={18} strokeWidth={2} />
      </Link>
    </section>
  );
}
