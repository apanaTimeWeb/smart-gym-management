"use client";
// RESPONSIBILITY: Renders the top banner with module title and save status indicator for the Settings page.
import Link from 'next/link';

import { GYM_DETAILS } from '@/app/admin/admin_url_config';

export default function AdminSettingsBanner() {
  return (
    <div className="rounded-xl p-6 text-on-primary mt-6 shadow-card bg-primary">
      <h3 className="text-xl font-bold mb-2">Ready to take your Gym to the next level?</h3>
      <p className="text-primary mb-4">Get a FREE demo and see how GymSmart can transform your business</p>
      
      <div className="bg-surface-hover rounded-lg p-4 backdrop-blur-sm border border-border">
        <p className="text-primary text-xs font-medium uppercase tracking-wider mb-1">Call or WhatsApp for FREE Demo</p>
        <p className="text-2xl font-black tracking-tight mb-4">{GYM_DETAILS.phone}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href={`https://wa.me/${GYM_DETAILS.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-card text-primary font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 motion-safe:transition-colors shadow-card motion-safe:duration-base">
            WhatsApp Demo
          </Link>
          <Link href={`tel:${GYM_DETAILS.phone.replace(/[^0-9+]/g, '')}`} className="flex-1 border border-border text-primary font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-surface-hover motion-safe:transition-colors motion-safe:duration-base">
            Call Now
          </Link>
        </div>
      </div>
    </div>
  );
}
