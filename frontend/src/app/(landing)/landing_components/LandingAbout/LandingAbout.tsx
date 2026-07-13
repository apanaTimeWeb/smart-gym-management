"use client";

import { CheckCircle, Users, Award, Clock, Heart } from 'lucide-react';

const STATS_CARDS = [
  { label: 'Happy Members', value: '5000+', icon: Users, color: 'from-indigo-500 to-indigo-600' },
 { label: 'Expert Trainers', value: '10+', icon: Award, color: 'from-blue-500 to-indigo-600' },
 { label: 'Hours Open', value: '24/7', icon: Clock, color: 'from-green-500 to-emerald-600' },
 { label: 'Transformations', value: '2000+', icon: Heart, color: 'from-pink-500 to-rose-600' },
];

const FEATURES = [
 '10+ Certified Trainers',
 '24/7 Open',
 '5M+ Food Database',
 'Ladies Only Sections',
 'Steam & Locker Rooms',
 'Free Diet Consultation',
];

export default function LandingAbout() {
 return (
 <section id="about" className="py-24 px-4 bg-background">
 <div className="max-w-7xl mx-auto">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
 <div>
 <div className="inline-block text-xs font-bold tracking-widest uppercase text-warning bg-warning/10 border border-warning/20 rounded-full px-4 py-2 mb-5">
 About GymSmart
 </div>
 <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-6 leading-tight">
 Building Stronger <br />
 <span style={{ background: 'var(--landing-text-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
 Communities since 2010
 </span>
 </h2>
 <h3 className="text-xl font-bold text-foreground mb-2">Our Mission & Vision</h3>
 <p className="text-secondary text-lg leading-relaxed mb-6">
 To inspire and empower our community to lead healthier, happier lives through premium fitness facilities, expert guidance, and a supportive environment.
 </p>
 <div className="grid grid-cols-2 gap-4 mt-8">
 {FEATURES.map((f, i) => (
 <div key={i} className="flex items-center gap-2.5 text-sm text-secondary">
 <CheckCircle size={16} className="text-warning flex-shrink-0" />
 {f}
 </div>
 ))}
 </div>
 </div>
 <div className="grid grid-cols-2 gap-4">
 {STATS_CARDS.map((s, i) => (
 <div key={i} className="bg-card border border-border rounded-2xl p-6 hover:border-warning/30 transition-all">
 <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4`}>
 <s.icon size={22} className="text-white" />
 </div>
 <div className="text-3xl font-black text-foreground mb-1">{s.value}</div>
 <div className="text-muted-foreground text-sm">{s.label}</div>
 </div>
 ))}
 </div>
 </div>
 </div>
 </section>
 );
}
