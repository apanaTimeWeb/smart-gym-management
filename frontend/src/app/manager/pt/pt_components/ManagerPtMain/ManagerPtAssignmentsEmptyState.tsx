'use client';
// RESPONSIBILITY: Renders the empty state for active PT assignments.
import { FileWarning } from 'lucide-react';
export default function ManagerPtAssignmentsEmptyState() { return <div className="flex flex-col items-center gap-2 py-10 text-center"><FileWarning size={34} className="text-secondary" aria-hidden="true" /><p className="text-sm font-semibold text-primary">No active assignments</p><p className="text-xs text-secondary">Assign a trainer to a member to start tracking sessions.</p></div>; }
