"use client";

import { RefreshCw, Plus } from 'lucide-react';
import { usePlansContext } from '../../plans_context/PlansContext';

export default function PlansToolbar() {
 const { plans, loadPlans, openAdd } = usePlansContext();

 return (
 <div className="bg-[var(--plans-bg-card)] rounded-xl shadow-sm border border-[var(--plans-border)] p-4 flex justify-between items-center mb-6">
 <p className="text-sm text-[var(--plans-text-secondary)]">
 Active Plans: <span className="font-bold text-[var(--plans-text-primary)]">{plans.length}</span>
 </p>
 <div className="flex gap-2">
 <button 
 onClick={loadPlans} 
 className="flex items-center gap-2 px-3 py-2 text-sm border border-[var(--plans-border)] rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[var(--plans-text-secondary)] transition-colors"
 >
 <RefreshCw size={14} />
 </button>
 <button 
 onClick={openAdd} 
 className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg hover:opacity-90 transition-opacity" 
 style={{ background: 'var(--plans-highlight)' }}
 >
 <Plus size={16} /> Create Plan
 </button>
 </div>
 </div>
 );
}
