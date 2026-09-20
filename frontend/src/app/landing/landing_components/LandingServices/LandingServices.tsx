// RESPONSIBILITY: Renders the static Services and Programs grid from Landing-owned configuration.
import { LANDING_SERVICES } from '@/app/landing/landing_utils/LandingSharedConstants';

export default function LandingServices() {
  return (
    <section id="services" className="py-24 px-4 bg-page">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block text-xs font-bold tracking-widest uppercase text-warning bg-warning-bg border border-border rounded-full px-4 py-2 mb-5">Our Programs</div>
          <h2 className="text-4xl sm:text-5xl font-black text-primary mb-4">Services <span className="text-primary">& Programs</span></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LANDING_SERVICES.map((service) => (
            <article id={`service-${service.id}`} key={service.id} className="bg-card border border-border rounded-lg p-6 hover:bg-surface-hover motion-safe:transition-colors motion-safe:duration-base scroll-mt-20">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 ${service.iconToneClass}`}>
                <service.icon size={18} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
              <p className="text-secondary text-sm leading-relaxed">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
