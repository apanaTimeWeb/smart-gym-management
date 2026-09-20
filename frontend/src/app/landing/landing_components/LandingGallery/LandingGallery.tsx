// RESPONSIBILITY: Renders the facility gallery using optimized Next.js Image assets and accessible focus states.
import Image from 'next/image';
import { LANDING_GALLERY_ITEMS } from '@/app/landing/landing_utils/LandingSharedConstants';

export default function LandingGallery() {
  return (
    <section id="gallery" className="py-24 px-4 bg-page">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block text-xs font-bold tracking-widest uppercase text-warning bg-warning-bg border border-border rounded-full px-4 py-2 mb-5">Our Facility</div>
          <h2 className="text-4xl sm:text-5xl font-black text-primary mb-4">World-Class <span className="text-primary">Equipment</span></h2>
          <p className="text-secondary max-w-xl mx-auto">Train in an environment designed for champions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LANDING_GALLERY_ITEMS.map((item) => (
            <figure key={item.label} className="rounded-lg overflow-hidden aspect-video md:aspect-square relative group border border-border">
              <Image src={item.src} alt={item.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover motion-safe:transition-transform motion-safe:duration-slow motion-safe:group-hover:scale-105" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-surface-highlight p-4">
                <span className="font-bold text-lg text-primary">{item.label}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
