// RESPONSIBILITY: Renders aggregate testimonial rating and individual review cards from static Landing content.
import { Star } from 'lucide-react';
import { LANDING_MAX_RATING, LANDING_TESTIMONIALS } from '@/app/landing/landing_utils/LandingSharedConstants';

export default function LandingTestimonials() {
  return (
    <section id="testimonials" className="py-24 px-4 bg-page">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-primary mb-4">What Members <span className="text-primary">Say</span></h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-1 border border-border rounded-lg p-8 flex flex-col justify-center items-center text-center bg-primary-subtle shadow-card">
            <div className="text-6xl font-black text-primary mb-2">4.9</div>
            <div role="img" className="flex gap-1 justify-center mb-3 text-warning" aria-label={`${LANDING_MAX_RATING} out of ${LANDING_MAX_RATING} stars`}>
              {Array.from({ length: LANDING_MAX_RATING }, (_, index) => <Star key={index} size={18} strokeWidth={2} fill="currentColor" />)}
            </div>
            <p className="text-secondary">Based on 1,500+ reviews on Google & JustDial</p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {LANDING_TESTIMONIALS.map((testimonial) => (
              <article key={testimonial.name} className="bg-card border border-border rounded-lg p-8 hover:bg-surface-hover motion-safe:transition-colors motion-safe:duration-base flex flex-col justify-between">
                <div>
                  <div role="img" className="flex gap-1 text-warning mb-4" aria-label={`${testimonial.rating} out of ${LANDING_MAX_RATING} stars`}>
                    {Array.from({ length: testimonial.rating }, (_, index) => <Star key={index} size={18} strokeWidth={2} fill="currentColor" />)}
                  </div>
                  <p className="text-secondary italic mb-6 leading-relaxed">&quot;{testimonial.text}&quot;</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-subtle flex items-center justify-center text-primary font-bold text-sm">{testimonial.initials}</div>
                  <div>
                    <p className="font-bold text-primary text-sm">{testimonial.name}</p>
                    <p className="text-xs text-secondary">{testimonial.member}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
