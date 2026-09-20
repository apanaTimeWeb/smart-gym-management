// RESPONSIBILITY: Renders the static trainer team cards from Landing-owned configuration.
import { LANDING_TRAINERS } from '@/app/landing/landing_utils/LandingSharedConstants';

export default function LandingTrainers() {
  return (
    <section id="trainers" className="py-24 px-4 bg-page">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block text-xs font-bold tracking-widest uppercase text-warning bg-warning-bg border border-border rounded-full px-4 py-2 mb-5">Expert Team</div>
          <h2 className="text-4xl sm:text-5xl font-black text-primary mb-4">Meet Your <span className="text-primary">Trainers</span></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LANDING_TRAINERS.map((trainer) => (
            <article key={trainer.name} className="bg-card border border-border rounded-lg p-6 text-center hover:bg-surface-hover motion-safe:transition-colors motion-safe:duration-base">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl mx-auto mb-5 font-black ${trainer.avatarClass}`}>
                {trainer.initials}
              </div>
              <h3 className="text-lg font-bold text-primary mb-1">{trainer.name}</h3>
              <p className="text-warning text-xs font-semibold mb-3">{trainer.role}</p>
              <div className="flex flex-wrap justify-center gap-2 text-xs text-secondary mb-3">
                <span className="bg-surface-highlight px-3 py-1 rounded-full">Exp: {trainer.experience}</span>
                <span className="bg-surface-highlight px-3 py-1 rounded-full">{trainer.certification}</span>
              </div>
              <p className="text-xs text-secondary mt-2">Spec: {trainer.specialization}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
