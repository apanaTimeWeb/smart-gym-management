"use client";

import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../../landing_utils/LandingSharedConstants';

export default function LandingTestimonials() {
 return (
 <section className="py-24 px-4 bg-[var(--landing-bg-darker)]">
 <div className="max-w-7xl mx-auto">
 <div className="text-center mb-16">
 <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
 What Members <span style={{ background: 'var(--landing-text-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Say</span>
 </h2>
 </div>
 
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
 <div className="lg:col-span-1 bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-[var(--warning)]/30 rounded-3xl p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
 <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0"></div>
 <div className="relative z-10">
 <div className="text-6xl font-black text-white mb-2">4.9</div>
 <div className="flex gap-1 justify-center mb-3 text-[var(--warning)]">
 {[1,2,3,4,5].map(s => <Star key={s} size={20} fill="currentColor" />)}
 </div>
 <p className="text-[var(--landing-text-secondary)]">Based on 1,500+ reviews on Google & JustDial</p>
 </div>
 </div>
 
 <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
 {TESTIMONIALS.map((t, i) => (
 <div key={i} className="bg-[var(--landing-bg-card)] border border-[var(--landing-border)] rounded-3xl p-8 hover:border-[var(--warning)]/30 transition-all flex flex-col justify-between">
 <div>
 <div className="flex gap-1 text-[var(--warning)] mb-4">
 {[...Array(t.rating)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
 </div>
 <p className="text-gray-300 italic mb-6 leading-relaxed">&quot;{t.text}&quot;</p>
 </div>
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
 {t.initials}
 </div>
 <div>
 <p className="font-bold text-white text-sm">{t.name}</p>
 <p className="text-xs text-[var(--landing-text-muted)]">{t.member}</p>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 </section>
 );
}
