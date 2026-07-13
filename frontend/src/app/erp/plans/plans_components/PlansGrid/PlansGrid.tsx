// RESPONSIBILITY: PlansGrid.tsx handles the logic and UI for its corresponding feature.
"use client";

import { Edit2, Trash2, Tag, CheckCircle } from 'lucide-react';
import { usePlansContext } from '@/app/erp/plans/plans_context/PlansContext';
import { formatCurrency } from '@/app/erp/plans/plans_utils/PlansSharedConstants';

import ErpPagination from '@/app/erp/erp_components/ErpShared/ErpPagination';

export default function PlansGrid() {
  const { plans, loading, search, currentPage, setCurrentPage, openEdit, deletePlan } = usePlansContext();

  const filtered = plans.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  
  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentData = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-8 h-8 border-4 border-warning border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className="text-center py-16 bg-card rounded-2xl border border-border">
        <p className="text-secondary">No membership plans created yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-96">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {currentData.map((p, i) => (
          <div 
            key={p.id} 
            className={`bg-card border-2 rounded-2xl p-6 relative transition-all hover:scale-105 hover:-translate-y-1 ${
              i === 1 ? 'border-warning shadow-lg shadow-warning/20' : 'border-border'
            }`}
          >
            {i === 1 && (
              <div className="bg-warning text-white text-xs font-bold uppercase tracking-wider text-center py-1 absolute top-0 w-full left-0">
                Most Popular
              </div>
            )}
            <div className={`p-6 ${i === 1 ? 'pt-8' : ''}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{p.name}</h3>
                  <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-input text-secondary mt-1">
                    {p.tier}
                  </span>
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => openEdit(p)} 
                    className="p-1.5 rounded-lg text-secondary hover:text-foreground hover:bg-primary-subtle transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => deletePlan(p.id)} 
                    className="p-1.5 rounded-lg text-destructive hover:text-destructive hover:bg-danger-bg dark:hover:bg-danger-bg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-6 bg-input p-4 rounded-xl">
                <div>
                  <p className="text-xs text-secondary">1 Month</p>
                  <p className="font-bold text-foreground">{formatCurrency(p.price1Month)}</p>
                </div>
                <div>
                  <p className="text-xs text-secondary">3 Months</p>
                  <p className="font-bold text-foreground">{formatCurrency(p.price3Month)}</p>
                </div>
                <div>
                  <p className="text-xs text-secondary">6 Months</p>
                  <p className="font-bold text-foreground">{formatCurrency(p.price6Month)}</p>
                </div>
                <div>
                  <p className="text-xs text-secondary">12 Months</p>
                  <p className="font-bold text-success dark:text-success">{formatCurrency(p.price12Month)}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-3 flex items-center gap-1.5">
                  <Tag size={12} /> Features
                </p>
                <ul className="space-y-2.5">
                  {p.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-secondary">
                      <CheckCircle size={16} className="text-success flex-shrink-0 mt-0.5" /> 
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <ErpPagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          totalItems={filtered.length} 
          itemsPerPage={ITEMS_PER_PAGE} 
          onPageChange={setCurrentPage} 
        />
      </div>
    </div>
 );
}
