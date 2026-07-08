"use client";

import { Edit2, Trash2, Tag, CheckCircle } from 'lucide-react';
import { usePlansContext } from '../../plans_context/PlansContext';
import { formatCurrency } from '../../plans_utils/PlansSharedConstants';

export default function PlansGrid() {
 const { plans, loading, openEdit, deletePlan } = usePlansContext();

 if (loading) {
 return (
 <div className="flex items-center justify-center py-16">
 <div className="w-8 h-8 border-4 border-[var(--warning)] border-t-transparent rounded-full animate-spin" />
 </div>
 );
 }

 if (plans.length === 0) {
 return (
 <div className="text-center py-16 bg-[var(--plans-bg-card)] rounded-2xl border border-[var(--plans-border)]">
 <p className="text-[var(--plans-text-secondary)]">No membership plans created yet.</p>
 </div>
 );
 }

 return (
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 {plans.map((p, i) => (
 <div 
 key={p.id} 
 className={`bg-[var(--plans-bg-card)] rounded-2xl shadow-sm border overflow-hidden relative ${
 i === 1 ? 'border-[var(--warning)] shadow-orange-100/50 dark:shadow-orange-900/20' : 'border-[var(--plans-border)]'
 }`}
 >
 {i === 1 && (
 <div className="bg-[var(--warning)] text-white text-[10px] font-bold uppercase tracking-wider text-center py-1 absolute top-0 w-full left-0">
 Most Popular
 </div>
 )}
 <div className={`p-6 ${i === 1 ? 'pt-8' : ''}`}>
 <div className="flex justify-between items-start mb-4">
 <div>
 <h3 className="text-xl font-bold text-[var(--plans-text-primary)]">{p.name}</h3>
 <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-black/5 dark:bg-white/5 text-[var(--plans-text-secondary)] mt-1">
 {p.tier}
 </span>
 </div>
 <div className="flex gap-1">
 <button 
 onClick={() => openEdit(p)} 
 className="p-1.5 rounded-lg text-[var(--plans-text-secondary)] hover:text-[var(--plans-text-primary)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
 >
 <Edit2 size={16} />
 </button>
 <button 
 onClick={() => deletePlan(p.id)} 
 className="p-1.5 rounded-lg text-[var(--danger)] hover:text-[var(--danger)] hover:bg-[var(--danger-bg)] dark:hover:bg-[var(--danger-bg)] transition-colors"
 >
 <Trash2 size={16} />
 </button>
 </div>
 </div>
 
 <div className="grid grid-cols-2 gap-3 mb-6 bg-[var(--plans-bg-input)] p-4 rounded-xl">
 <div>
 <p className="text-xs text-[var(--plans-text-secondary)]">1 Month</p>
 <p className="font-bold text-[var(--plans-text-primary)]">{formatCurrency(p.price1Month)}</p>
 </div>
 <div>
 <p className="text-xs text-[var(--plans-text-secondary)]">3 Months</p>
 <p className="font-bold text-[var(--plans-text-primary)]">{formatCurrency(p.price3Month)}</p>
 </div>
 <div>
 <p className="text-xs text-[var(--plans-text-secondary)]">6 Months</p>
 <p className="font-bold text-[var(--plans-text-primary)]">{formatCurrency(p.price6Month)}</p>
 </div>
 <div>
 <p className="text-xs text-[var(--plans-text-secondary)]">12 Months</p>
 <p className="font-bold text-[var(--success)] dark:text-[var(--success)]">{formatCurrency(p.price12Month)}</p>
 </div>
 </div>

 <div>
 <p className="text-xs font-bold text-[var(--plans-text-primary)] uppercase tracking-wide mb-3 flex items-center gap-1.5">
 <Tag size={12} /> Features
 </p>
 <ul className="space-y-2.5">
 {p.features.map((f, idx) => (
 <li key={idx} className="flex items-start gap-2 text-sm text-[var(--plans-text-secondary)]">
 <CheckCircle size={16} className="text-[var(--success)] flex-shrink-0 mt-0.5" /> 
 <span>{f}</span>
 </li>
 ))}
 </ul>
 </div>
 </div>
 </div>
 ))}
 </div>
 );
}
