// RESPONSIBILITY: Renders the trainer workload to help managers balance assignment distribution.
'use client';

import { Users, Star, User } from 'lucide-react';
import type { PtTrainerWorkload } from '@/app/manager/pt/pt_types/ManagerPtTypes';

interface ManagerPtTrainerWorkloadProps {
  workload: PtTrainerWorkload[];
}

export default function ManagerPtTrainerWorkload({ workload }: ManagerPtTrainerWorkloadProps) {
  return (
    <div className="bg-card border border-border rounded-xl flex flex-col h-full overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-base font-semibold text-foreground">Trainer Workload</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary/5 border-b border-border">
              <th className="py-3 px-4 text-[11px] font-semibold text-secondary uppercase tracking-wider">Trainer</th>
              <th className="py-3 px-4 text-[11px] font-semibold text-secondary uppercase tracking-wider">Clients</th>
              <th className="py-3 px-4 text-[11px] font-semibold text-secondary uppercase tracking-wider">Rating</th>
              <th className="py-3 px-4 text-[11px] font-semibold text-secondary uppercase tracking-wider text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {workload.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-10 text-center text-secondary text-sm">
                  No trainer data available.
                </td>
              </tr>
            ) : (
              workload.map((trainer) => (
                <tr key={trainer.trainerId} className="hover:bg-input/50 motion-safe:transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-input flex items-center justify-center">
                        <User size={14} className="text-secondary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{trainer.trainerName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5 text-sm text-foreground font-semibold">
                      <Users size={14} className="text-secondary" />
                      {trainer.activeClients}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 text-sm text-foreground">
                      <Star size={14} className="text-warning fill-warning" />
                      {trainer.rating}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                      trainer.status === 'Fully Booked' 
                        ? 'bg-danger/10 text-danger' 
                        : 'bg-success/10 text-success'
                    }`}>
                      {trainer.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
