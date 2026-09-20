// RESPONSIBILITY: Renders the empty state for Manager plans.
'use client';
import { ClipboardList } from 'lucide-react';
export default function ManagerPlansEmptyState() { return <div className="flex flex-col items-center gap-2 py-16 text-center"><ClipboardList size={36} className="text-secondary" aria-hidden="true" /><p className="text-sm font-semibold text-primary">No plans available</p><p className="text-xs text-secondary">Adjust the filters or add a plan to populate this list.</p></div>; }
