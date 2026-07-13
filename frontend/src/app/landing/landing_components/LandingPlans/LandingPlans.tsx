// RESPONSIBILITY: LandingPlans.tsx handles the logic and UI for its corresponding feature.
"use client";
import Link from 'next/link';

import { CheckCircle } from 'lucide-react';
import { PLANS } from '@/app/landing/landing_utils/LandingSharedConstants';
import { LandingUrlConfig } from '@/app/landing/landing_url_config';

export default function LandingPlans() {
 return (
 <section id="plans" className="py-24 px-4 bg-background">
 <div className="max-w-7xl mx-auto">
 <div className="text-center mb-16">
 <div className="inline-block text-xs font-bold tracking-widest uppercase text-warning bg-warning/10 border border-warning/20 rounded-full px-4 py-2 mb-5">
 Membership Plans
 </div>
 <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
 Choose Your <span style={{ background: 'var(--landing-text-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Plan</span>
 </h2>
 <p className="text-secondary max-w-xl mx-auto">
 Special discounts and No Cost EMI available on long-term plans!
 </p>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
 {PLANS.map((p, i) => (
 <div key={i} className={`relative bg-card border-2 rounded-2xl p-6 hover:bg-white/10 transition-all flex flex-col ${p.color} ${p.badge ? 'transform lg:-translate-y-4 shadow-2xl' : ''}`}>
 {p.badge && (
 <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1.5 rounded-full text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #eab308, #f97316)' }}>
 ⭐ {p.badge}
 </div>
 )}
 <h3 className="text-lg font-bold text-white mb-2">{p.name}</h3>
 <div className="mb-4">
 <div className="flex items-end gap-1 mb-1">
 <span className="text-3xl font-black" style={{ background: 'var(--landing-text-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
 {p.price}
 </span>
 </div>
 <span className="text-muted-foreground text-sm line-through block">{p.oldPrice}</span>
 {p.name === '12 Months' && <span className="text-xs text-success font-semibold mt-1 block">Includes EMI Options</span>}
 </div>
 <div className="space-y-3 mb-6 flex-1">
 {p.features.map((f, j) => (
 <div key={j} className="flex items-start gap-2.5 text-xs text-secondary">
 <CheckCircle size={14} className="text-warning flex-shrink-0 mt-0.5" />
 {f}
 </div>
 ))}
 </div>
 <Link 
 href={LandingUrlConfig.ANCHORS.BOOKING} 
 className="block text-center py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
 style={p.badge 
 ? { background: 'var(--landing-highlight-gradient)', color: 'white' } 
 : { border: '1px solid var(--landing-border)', color: 'white' }
 }
 >
 Buy Membership
 </Link>
 </div>
 ))}
 </div>
 </div>
 </section>
 );
}

