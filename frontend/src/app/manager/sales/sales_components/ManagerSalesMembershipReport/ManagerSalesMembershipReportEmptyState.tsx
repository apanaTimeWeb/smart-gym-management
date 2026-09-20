// RESPONSIBILITY: Renders the empty state for the sales membership report. Contains no API calls.
'use client';
import { FileSearch } from 'lucide-react';
export default function ManagerSalesMembershipReportEmptyState() { return <div className="flex flex-col items-center gap-2 py-10 text-center"><FileSearch size={34} className="text-secondary" aria-hidden="true" /><p className="text-sm font-semibold text-primary">No membership report data</p><p className="text-xs text-secondary">No membership report records match the current filters.</p></div>; }
