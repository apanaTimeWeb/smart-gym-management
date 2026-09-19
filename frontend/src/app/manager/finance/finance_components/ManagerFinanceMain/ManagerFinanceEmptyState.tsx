'use client';
// RESPONSIBILITY: Renders the empty state for Manager finance payments.
import { Wallet } from 'lucide-react';
export default function ManagerFinanceEmptyState() { return <div className="flex flex-col items-center gap-2 py-10 text-center"><Wallet size={34} className="text-secondary" aria-hidden="true" /><p className="text-sm font-semibold text-primary">No payments found</p><p className="text-xs text-secondary">No finance payments match the current filters.</p></div>; }
