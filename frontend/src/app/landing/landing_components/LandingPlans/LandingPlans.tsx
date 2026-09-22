// RESPONSIBILITY: Renders the static membership plan cards; pricing formatting and plan metadata stay outside JSX.
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { LandingUrlConfig } from '@/app/landing/landing_url_config';
import { formatLandingCurrency } from '@/app/landing/landing_utils/LandingFormattingUtils';
import { LANDING_PLANS } from '@/app/landing/landing_utils/LandingSharedConstants';
import { useLocale } from 'next-intl';

export default function LandingPlans() {
  const locale = useLocale();
  return (
    <section id="plans" className="py-24 px-4 bg-page">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block text-xs font-bold tracking-widest uppercase text-warning bg-warning-bg border border-border rounded-full px-4 py-2 mb-5">Membership Plans</div>
          <h2 className="text-4xl sm:text-5xl font-black text-primary mb-4">Choose Your <span className="text-primary">Plan</span></h2>
          <p className="text-secondary max-w-xl mx-auto">Special discounts and No Cost EMI available on long-term plans!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 items-stretch">
          {LANDING_PLANS.map((plan) => (
            <article key={plan.name} className={`relative bg-card border border-border rounded-lg p-6 flex flex-col hover:bg-surface-hover motion-safe:transition-colors motion-safe:duration-base ${plan.featured ? 'lg:-translate-y-2 shadow-card' : ''}`}>
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap bg-warning text-on-primary">{plan.badge}</div>
              )}
              <h3 className="text-lg font-bold text-primary mb-2">{plan.name}</h3>
              <div className="mb-4">
                <div className="text-3xl font-black text-primary mb-1">{formatLandingCurrency(plan.priceInr, locale)}</div>
                <span className="text-secondary text-sm line-through block">{formatLandingCurrency(plan.oldPriceInr, locale)}</span>
                {plan.includeEmiNote && <span className="text-xs text-success font-semibold mt-1 block">Includes EMI Options</span>}
              </div>
              <div className="space-y-3 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5 text-xs text-secondary">
                    <CheckCircle size={18} strokeWidth={2} className="text-warning flex-shrink-0 mt-0.5" />
                    {feature}
                  </div>
                ))}
              </div>
              <Link href={LandingUrlConfig.ANCHORS.BOOKING} className="block text-center min-h-11 py-3 rounded-xl text-sm font-bold bg-primary text-on-primary hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
                Buy Membership
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
