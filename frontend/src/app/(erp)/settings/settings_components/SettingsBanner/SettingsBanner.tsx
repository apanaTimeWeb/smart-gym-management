"use client";

export default function SettingsBanner() {
  return (
    <div className="rounded-xl p-6 text-white mt-6 shadow-lg shadow-[var(--primary)]/20" style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))' }}>
      <h3 className="text-xl font-bold mb-2">Ready to take your Gym to the next level?</h3>
      <p className="text-white/90 mb-4">Get a FREE demo and see how GymSmart can transform your business</p>
      
      <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
        <p className="text-white/80 text-xs font-medium uppercase tracking-wider mb-1">Call or WhatsApp for FREE Demo</p>
        <p className="text-2xl font-black tracking-tight mb-4">+91 83479 77566</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a href="https://wa.me/918347977566" target="_blank" rel="noopener noreferrer" className="flex-1 bg-white text-[var(--primary)] font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
            WhatsApp Demo
          </a>
          <a href="tel:+918347977566" className="flex-1 border border-white/30 text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
}
