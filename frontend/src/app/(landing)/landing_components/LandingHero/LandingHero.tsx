"use client";

import { ChevronDown, ArrowRight } from 'lucide-react';

export default function LandingHero() {
 return (
 <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
 <div className="absolute inset-0" style={{
 backgroundImage: `url('/gym-hero.jpg')`,
 backgroundSize: 'cover',
 backgroundPosition: 'center',
 }} />
 <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, rgba(20,10,0,0.8) 100%)' }} />
 <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to top, var(--landing-bg-dark), transparent)' }} />

 <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
 <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium text-[var(--warning)] mb-8">
 <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
 Welcome to GymSmart
 </div>

 <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-6">
 <span className="text-white">Transform Your Body,</span>
 <br />
 <span style={{ background: 'var(--landing-text-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
 Build Your Confidence
 </span>
 </h1>

 <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
 Join our premium fitness center with expert trainers, personalized workout plans, diet guidance, and modern equipment. <br className="hidden sm:block" />
 <strong className="text-white">Your fitness journey starts today.</strong>
 </p>

 <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
 <a href="#plans" className="px-8 py-4 text-white font-bold text-lg rounded-2xl transition-all hover:scale-105 hover:shadow-2xl flex items-center gap-2 w-full sm:w-auto justify-center" style={{ background: 'var(--landing-highlight-gradient)', boxShadow: '0 0 40px rgba(249,115,22,0.4)' }}>
 Join Now <ArrowRight size={18} />
 </a>
 <a href="#booking" className="px-8 py-4 font-bold text-lg rounded-2xl border-2 border-[var(--landing-border)] text-white hover:bg-white/10 transition-all flex items-center gap-2 w-full sm:w-auto justify-center backdrop-blur-sm">
 Free Trial
 </a>
 <a href="#contact" className="px-8 py-4 font-bold text-lg rounded-2xl border-2 border-[var(--landing-border)] text-[var(--landing-text-secondary)] hover:bg-white/5 transition-all flex items-center gap-2 w-full sm:w-auto justify-center backdrop-blur-sm">
 Contact Us
 </a>
 </div>
 </div>

 <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
 <ChevronDown size={28} className="text-white/50" />
 </div>
 </section>
 );
}
