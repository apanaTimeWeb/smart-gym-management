// RESPONSIBILITY: Renders the empty state for a report table when its current report has no rows.
'use client';
import { FileBarChart } from 'lucide-react';
export default function ManagerReportsEmptyState() { return <div className="flex flex-col items-center gap-2 py-10 text-center"><FileBarChart size={34} className="text-secondary" aria-hidden="true" /><p className="text-sm font-semibold text-primary">No report data</p><p className="text-xs text-secondary">No records are available for the selected report range.</p></div>; }
