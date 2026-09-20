// RESPONSIBILITY: Renders transformation success-story cards using static Landing content; no private/client state.
import { ArrowRight } from 'lucide-react';
import { LANDING_TRANSFORMATIONS } from '@/app/landing/landing_utils/LandingSharedConstants';

export default function LandingTransformations() {
  return (
    <section id="transformations" className="py-24 px-4 bg-page">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block text-xs font-bold tracking-widest uppercase text-warning bg-warning-bg border border-border rounded-full px-4 py-2 mb-5">Real Results</div>
          <h2 className="text-4xl sm:text-5xl font-black text-primary mb-4">Transformation <span className="text-primary">Gallery</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LANDING_TRANSFORMATIONS.map((transformation) => (
            <article key={transformation.name} className="bg-card border border-border rounded-lg overflow-hidden hover:bg-surface-hover motion-safe:transition-colors motion-safe:duration-base">
              <div className="p-6 pb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary text-on-primary font-black text-xl">{transformation.initials}</div>
                  <div>
                    <h3 className="font-bold text-primary">{transformation.name}</h3>
                    <span className="text-xs text-warning font-semibold bg-warning-bg px-2 py-0.5 rounded-full">{transformation.type}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center bg-danger-bg border border-border rounded-xl p-3">
                    <p className="text-xs text-danger font-semibold uppercase mb-1">Before</p>
                    <p className="text-lg font-black text-danger">{transformation.before}</p>
                  </div>
                  <div className="text-center bg-surface-highlight rounded-xl p-3 flex items-center justify-center" aria-hidden="true">
                    <ArrowRight size={18} strokeWidth={2} className="text-warning" />
                  </div>
                  <div className="text-center bg-success-bg border border-border rounded-xl p-3">
                    <p className="text-xs text-success font-semibold uppercase mb-1">After</p>
                    <p className="text-lg font-black text-success">{transformation.after}</p>
                  </div>
                </div>
                <div className="text-center text-xs text-secondary mb-3">⏱ Achieved in {transformation.duration}</div>
              </div>
              <div className="px-6 pb-6">
                <div className="bg-surface-highlight rounded-xl p-4">
                  <p className="text-secondary text-sm italic">&quot;{transformation.review}&quot;</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
