"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useLandingContext } from '../../landing_context/LandingContext';

export default function LandingNavbar() {
  const { menuOpen, setMenuOpen, scrolled } = useLandingContext();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="GymSmart" width={40} height={40} className="rounded-lg object-cover" />
          <div>
            <span className="font-bold text-lg text-white tracking-tight">GymSmart</span>
            <span className="text-[10px] text-orange-400 block -mt-1 tracking-widest uppercase">Fitness ERP</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
          {['About', 'Plans', 'Trainers', 'Services', 'Schedule', 'Booking', 'Gallery'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-orange-400 transition-colors">{item}</a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white transition-colors px-3 py-1.5">
            ERP Login
          </Link>
          <a href="#booking" className="text-sm font-bold px-5 py-2.5 rounded-xl text-white transition-all hover:scale-105" style={{ background: 'var(--landing-highlight-gradient)' }}>
            Join Now
          </a>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-gray-300">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-black/98 border-t border-white/10 px-4 py-4 space-y-3 h-screen overflow-y-auto">
          {['About', 'Plans', 'Trainers', 'Services', 'Schedule', 'Booking', 'Gallery', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="block text-gray-300 hover:text-orange-400 py-2 text-sm font-medium">{item}</a>
          ))}
          <div className="flex gap-3 pt-2">
            <Link href="/dashboard" className="flex-1 text-center border border-white/20 py-2.5 rounded-xl text-sm font-medium">ERP Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
