'use client';
// RESPONSIBILITY: Renders the Landing footer navigation, external social destinations, and newsletter email handoff.
import Link from 'next/link';
import { LandingUrlConfig } from '@/app/landing/landing_url_config';
import { LANDING_FOOTER_PROGRAM_LINKS, LANDING_FOOTER_QUICK_LINKS, LANDING_SOCIAL_LINKS } from '@/app/landing/landing_utils/LandingSharedConstants';
import { useLandingNewsletter } from '@/app/landing/landing_components/LandingFooter/useLandingNewsletter';

export default function LandingFooter() {
  const newsletter = useLandingNewsletter();

  return (
    <footer className="bg-page pt-20 pb-10 px-4 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6"><span className="font-black text-2xl text-primary tracking-tight">GymSmart</span></div>
            <p className="text-secondary text-sm leading-relaxed mb-6">Empowering individuals to reach their peak physical and mental potential through world-class facilities and expert guidance.</p>
            <div className="flex gap-4" aria-label="GymSmart social links">
              {LANDING_SOCIAL_LINKS.map(({ label, href, icon: Icon, className }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} className={`w-10 h-10 rounded-full bg-surface-highlight flex items-center justify-center ${className} motion-safe:transition-all motion-safe:duration-base hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page`}>
                  <Icon size={18} strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-primary mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3">
              {LANDING_FOOTER_QUICK_LINKS.map(({ label, href }) => (
                <li key={label}><Link href={href} className="text-secondary hover:text-primary text-sm font-medium motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page rounded">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-primary mb-6 uppercase tracking-wider text-sm">Programs</h4>
            <ul className="space-y-3">
              {LANDING_FOOTER_PROGRAM_LINKS.map(({ label, href }) => (
                <li key={label}><Link href={href} className="text-secondary hover:text-primary text-sm motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page rounded">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-primary mb-6 uppercase tracking-wider text-sm">Newsletter</h4>
            <p className="text-secondary text-sm mb-4">Request newsletter updates through your email client. No subscription is claimed until you send the email request.</p>
            <form onSubmit={newsletter.submit} className="flex bg-input rounded-lg border border-border p-1">
              <label htmlFor="landing-newsletter-email" className="sr-only">Newsletter email address</label>
              <input id="landing-newsletter-email" type="email" value={newsletter.email} onChange={(event) => newsletter.setEmail(event.target.value)} placeholder="Your email" className="w-full bg-transparent px-3 text-sm text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded" aria-invalid={Boolean(newsletter.errorMessage)} aria-describedby="landing-newsletter-error" required />
              <button type="submit" className="min-h-11 px-4 py-2 bg-primary text-on-primary text-sm font-medium rounded-md hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">Request</button>
            </form>
            {newsletter.errorMessage && <p id="landing-newsletter-error" role="alert" className="mt-2 text-xs text-danger">{newsletter.errorMessage}</p>}
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-secondary">
          <p>© {new Date().getFullYear()} GymSmart. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href={LandingUrlConfig.ANCHORS.CONTACT} className="hover:text-primary motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page rounded">Contact Us</Link>
            <Link href={LandingUrlConfig.PAGES.ERP_LOGIN} className="hover:text-primary motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page rounded flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
              ERP Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
