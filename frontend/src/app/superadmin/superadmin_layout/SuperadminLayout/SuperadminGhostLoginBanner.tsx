'use client';
import React from 'react';
import { AlertTriangle, LogOut } from 'lucide-react';
import { useSuperadminGymGhostLoginStore } from '@/app/superadmin/gyms/gyms_store/useSuperadminGymGhostLoginStore';

export default function SuperadminGhostLoginBanner() {
  const { ghostTenant, exitGhostLogin } = useSuperadminGymGhostLoginStore();

  if (!ghostTenant) return null;

  return (
    <div className="w-full bg-danger text-on-danger px-4 py-2 flex items-center justify-between shadow-md z-[100] sticky top-0">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-5 h-5" />
        <span className="font-semibold text-sm">
          SECURITY WARNING: You are actively viewing and modifying data as <u>{ghostTenant.name} ({ghostTenant.id})</u>.
        </span>
      </div>
      <button 
        onClick={exitGhostLogin}
        className="flex items-center gap-2 bg-on-danger text-danger px-3 py-1 rounded-md text-xs font-bold hover:bg-white motion-safe:transition-colors"
      >
        <LogOut className="w-4 h-4" />
        Exit Ghost Mode
      </button>
    </div>
  );
}
