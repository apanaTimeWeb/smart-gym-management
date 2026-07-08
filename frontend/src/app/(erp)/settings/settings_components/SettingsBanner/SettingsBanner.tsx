"use client";

export default function SettingsBanner() {
 return (
 <div className="rounded-xl p-6 text-white mt-6 shadow-lg shadow-orange-500/20" style={{ background: 'linear-gradient(135deg, hsl(24 95% 53%), hsl(20 95% 45%))' }}>
 <h2 className="text-xl font-bold mb-2">Ready to take your Gym to the next level?</h2>
 <p className="text-orange-100 mb-4">Get a FREE demo and see how GymSmart can transform your business</p>
 <div className="flex flex-wrap items-center gap-4">
 <div>
 <p className="text-orange-200 text-xs font-medium uppercase tracking-wider mb-1">Call or WhatsApp for FREE Demo</p>
 <p className="text-2xl font-bold">+91 83479 77566</p>
 </div>
 <div className="flex gap-2">
 <button className="bg-white text-[var(--warning)] font-semibold px-4 py-2.5 rounded-lg text-sm hover:bg-[var(--warning-bg)] transition-colors">
 WhatsApp Demo
 </button>
 <button className="border-2 border-white/80 text-white font-semibold px-4 py-2.5 rounded-lg text-sm hover:bg-white/10 transition-colors">
 Call Now
 </button>
 </div>
 </div>
 </div>
 );
}
