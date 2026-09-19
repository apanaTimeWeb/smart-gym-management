'use client';
// RESPONSIBILITY: Renders the empty state for the PT trainer workload entity list.
import { Users } from 'lucide-react';
export default function ManagerPtTrainerWorkloadEmptyState() { return <div className="flex flex-col items-center gap-2 py-10 text-center"><Users size={34} className="text-secondary" aria-hidden="true" /><p className="text-sm font-semibold text-primary">No trainer workload data</p><p className="text-xs text-secondary">Trainer workload will appear when trainer records are available.</p></div>; }
