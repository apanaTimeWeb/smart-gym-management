'use client';
// RESPONSIBILITY: Renders the empty state for Manager workout plans.
import { Dumbbell } from 'lucide-react';
export default function ManagerWorkoutPlansEmptyState() { return <div className="col-span-full flex flex-col items-center gap-2 py-12 text-center"><Dumbbell size={38} className="text-secondary" aria-hidden="true" /><p className="text-sm font-semibold text-primary">No workout plans found</p><p className="text-xs text-secondary">Try clearing the search or create a workout plan.</p></div>; }
