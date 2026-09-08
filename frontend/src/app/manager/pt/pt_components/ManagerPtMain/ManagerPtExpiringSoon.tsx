// RESPONSIBILITY: Shows a list of members whose PT packages are nearing completion (< 3 sessions left).
'use client';

import { AlertTriangle, Dumbbell } from 'lucide-react';
import type { PtAssignment } from '@/app/manager/pt/pt_types/ManagerPtTypes';

interface ManagerPtExpiringSoonProps {
  expiringPackages: PtAssignment[];
}

export default function ManagerPtExpiringSoon({ expiringPackages }: ManagerPtExpiringSoonProps) {
  return (
    <div className="bg-card border border-border rounded-xl flex flex-col h-full overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
          <AlertTriangle size={18} className="text-warning" />
          Expiring PT Packages
        </h2>
        <span className="text-xs font-bold text-warning bg-warning/10 px-2 py-1 rounded-full">
          {expiringPackages.length} Pending
        </span>
      </div>

      {expiringPackages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <Dumbbell size={32} className="text-secondary opacity-40 mb-3" />
          <p className="text-sm text-secondary">All packages are healthy.</p>
        </div>
      ) : (
        <div className="divide-y divide-border overflow-y-auto">
          {expiringPackages.map((pkg) => {
            const left = pkg.totalSessions - pkg.completedSessions;
            return (
              <div key={pkg.id} className="p-4 hover:bg-input/50 motion-safe:transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-foreground">{pkg.memberName}</span>
                  <span className="text-xs font-bold text-danger bg-danger/10 px-2 py-0.5 rounded text-nowrap">
                    {left} left
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-secondary">
                  <span>{pkg.packageName}</span>
                  <span>Trainer: {pkg.trainerName}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
