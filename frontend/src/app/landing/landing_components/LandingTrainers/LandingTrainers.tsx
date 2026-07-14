// RESPONSIBILITY: LandingTrainers.tsx handles the logic and UI for its corresponding feature.
"use client";

import { TRAINERS } from '@/app/landing/landing_utils/LandingSharedConstants';

export default function LandingTrainers() {
 return (
 <section id="trainers" className="py-24 px-4 bg-background">
 <div className="max-w-7xl mx-auto">
 <div className="text-center mb-16">
 <div className="inline-block text-xs font-bold tracking-widest uppercase text-warning bg-warning/10 border border-warning/20 rounded-full px-4 py-2 mb-5">
 Expert Team
 </div>
 <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
 Meet Your <span style={{ background: 'var(--landing-text-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Trainers</span>
 </h2>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
 {TRAINERS.map((t, i) => (
 <div key={i} className="bg-card border border-border rounded-2xl p-6 text-center hover:border-warning/30 transition-all group">
 <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${t.bg} flex items-center justify-center text-white font-black text-3xl mx-auto mb-5 group-hover:scale-105 transition-transform`}>
 {t.initials}
 </div>
 <h3 className="text-lg font-bold text-white mb-1">{t.name}</h3>
 <p className="text-warning text-xs font-semibold mb-3">{t.role}</p>
 <div className="flex flex-wrap justify-center gap-2 text-xs text-secondary mb-3">
 <span className="bg-white/10 px-3 py-1 rounded-full">Exp: {t.exp}</span>
 <span className="bg-white/10 px-3 py-1 rounded-full">{t.cert}</span>
 </div>
 <p className="text-xs text-muted-foreground mt-2">Spec: {t.spec}</p>
 </div>
 ))}
 </div>
 </div>
 </section>
 );
}

