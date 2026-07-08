"use client";

import Link from 'next/link';

const FbIcon = () => <svg fill="currentColor" viewBox="0 0 24 24" width="16" height="16"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>;
const InstaIcon = () => <svg fill="currentColor" viewBox="0 0 24 24" width="16" height="16"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
const XIcon = () => <svg fill="currentColor" viewBox="0 0 24 24" width="16" height="16"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const YtIcon = () => <svg fill="currentColor" viewBox="0 0 24 24" width="16" height="16"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.872.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;

export default function LandingFooter() {
 return (
 <footer className="bg-black pt-20 pb-10 px-4 border-t border-[var(--landing-border)]">
 <div className="max-w-7xl mx-auto">
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
 <div>
 <div className="flex items-center gap-2 mb-6">
 <span className="font-black text-2xl text-white tracking-tight">GymSmart</span>
 </div>
 <p className="text-[var(--landing-text-secondary)] text-sm leading-relaxed mb-6">
 Empowering individuals to reach their peak physical and mental potential through world-class facilities and expert guidance.
 </p>
 <div className="flex gap-4">
 {[FbIcon, InstaIcon, XIcon, YtIcon].map((Icon, i) => (
 <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[var(--warning)] hover:text-white transition-all">
 <Icon />
 </a>
 ))}
 </div>
 </div>
 <div>
 <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
 <ul className="space-y-3">
 {['About Us', 'Membership Plans', 'Trainers', 'Classes Schedule', 'Gallery', 'Contact Us'].map(l => (
 <li key={l}><a href={`#${l.split(' ')[0].toLowerCase()}`} className="text-[var(--landing-text-secondary)] hover:text-[var(--warning)] text-sm transition-colors">{l}</a></li>
 ))}
 </ul>
 </div>
 <div>
 <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Programs</h4>
 <ul className="space-y-3">
 {['Bodybuilding', 'Weight Loss', 'CrossFit', 'Yoga Classes', 'Zumba Dance', 'Personal Training'].map(l => (
 <li key={l}><a href="#services" className="text-[var(--landing-text-secondary)] hover:text-[var(--warning)] text-sm transition-colors">{l}</a></li>
 ))}
 </ul>
 </div>
 <div>
 <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Newsletter</h4>
 <p className="text-[var(--landing-text-secondary)] text-sm mb-4">Subscribe to get health tips and exclusive gym offers.</p>
 <div className="flex bg-[var(--landing-bg-input)] rounded-lg border border-[var(--landing-border)] p-1">
 <input type="email" placeholder="Your email" className="w-full bg-transparent px-3 text-sm text-white focus:outline-none placeholder-[var(--landing-text-muted)]" />
 <button className="px-4 py-2 bg-white/10 hover:bg-[var(--warning)] text-white text-sm font-medium rounded-md transition-colors">Subscribe</button>
 </div>
 </div>
 </div>
 <div className="pt-8 border-t border-[var(--landing-border)] flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--landing-text-muted)]">
 <p>© {new Date().getFullYear()} GymSmart. All rights reserved.</p>
 <div className="flex gap-6">
 <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
 <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
 <Link href="/dashboard" className="hover:text-white transition-colors flex items-center gap-1">
 <span className="w-2 h-2 rounded-full bg-[var(--warning)]"></span> ERP Portal
 </Link>
 </div>
 </div>
 </div>
 </footer>
 );
}
