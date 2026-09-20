// RESPONSIBILITY: Renders the About section and its static feature/stat presentation; no API or client state.
import { CheckCircle } from 'lucide-react';
import { LANDING_ABOUT_FEATURES, LANDING_ABOUT_STATS } from '@/app/landing/landing_utils/LandingSharedConstants';

export default function LandingAbout() {
  return (
    <section id="about" className="py-24 px-4 bg-page">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block text-xs font-bold tracking-widest uppercase text-warning bg-warning-bg border border-border rounded-full px-4 py-2 mb-5">About GymSmart</div>
            <h2 className="text-4xl sm:text-5xl font-black text-primary mb-6 leading-tight">
              Building Stronger <br />
              <span className="text-primary">Communities since 2010</span>
            </h2>
            <h3 className="text-xl font-bold text-primary mb-2">Our Mission & Vision</h3>
            <p className="text-secondary text-lg leading-relaxed mb-6">To inspire and empower our community to lead healthier, happier lives through premium fitness facilities, expert guidance, and a supportive environment.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {LANDING_ABOUT_FEATURES.map((feature) => (
                <div key={feature} className="flex items-center gap-2.5 text-sm text-secondary">
                  <CheckCircle size={18} strokeWidth={2} className="text-warning flex-shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {LANDING_ABOUT_STATS.map(({ label, value, icon: Icon, iconToneClass }) => (
              <div key={label} className="bg-card border border-border rounded-lg p-6 hover:bg-surface-hover motion-safe:transition-colors motion-safe:duration-base">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${iconToneClass}`}>
                  <Icon size={18} strokeWidth={2} />
                </div>
                <div className="text-3xl font-black text-primary mb-1">{value}</div>
                <div className="text-secondary text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
