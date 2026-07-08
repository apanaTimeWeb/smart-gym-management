"use client";

import { ArrowRight } from 'lucide-react';
import { TRANSFORMATIONS } from '../../landing_utils/LandingSharedConstants';

export default function LandingTransformations() {
 return (
 <section id="gallery" className="py-24 px-4 bg-[var(--landing-bg-dark)]">
 <div className="max-w-7xl mx-auto">
 <div className="text-center mb-16">
 <div className="inline-block text-xs font-bold tracking-widest uppercase text-[var(--warning)] bg-[var(--warning)]/10 border border-[var(--warning)]/20 rounded-full px-4 py-2 mb-5">
 Real Results
 </div>
 <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
 Transformation <span style={{ background: 'var(--landing-text-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Gallery</span>
 </h2>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {TRANSFORMATIONS.map((t, i) => (
 <div key={i} className="bg-[var(--landing-bg-card)] border border-[var(--landing-border)] rounded-2xl overflow-hidden hover:border-[var(--warning)]/30 transition-all group">
 <div className="p-6 pb-4">
 <div className="flex items-center gap-4 mb-4">
 <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-black text-xl">
 {t.initials}
 </div>
 <div>
 <h3 className="font-bold text-white">{t.name}</h3>
 <span className="text-xs text-[var(--warning)] font-semibold bg-[var(--warning)]/10 px-2 py-0.5 rounded-full">{t.type}</span>
 </div>
 </div>
 <div className="grid grid-cols-3 gap-3 mb-4">
 <div className="text-center bg-[var(--danger)]/10 border border-[var(--danger)]/20 rounded-xl p-3">
 <p className="text-xs text-[var(--danger)] font-semibold uppercase mb-1">Before</p>
 <p className="text-lg font-black text-[var(--danger)]">{t.before}</p>
 </div>
 <div className="text-center bg-white/5 rounded-xl p-3 flex items-center justify-center">
 <ArrowRight size={18} className="text-[var(--warning)]" />
 </div>
 <div className="text-center bg-[var(--success)]/10 border border-[var(--success)]/20 rounded-xl p-3">
 <p className="text-xs text-[var(--success)] font-semibold uppercase mb-1">After</p>
 <p className="text-lg font-black text-[var(--success)]">{t.after}</p>
 </div>
 </div>
 <div className="text-center text-xs text-[var(--landing-text-muted)] mb-3">⏱ Achieved in {t.duration}</div>
 </div>
 <div className="px-6 pb-6">
 <div className="bg-white/5 rounded-xl p-4">
 <p className="text-gray-300 text-sm italic">&quot;{t.review}&quot;</p>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
 );
}
