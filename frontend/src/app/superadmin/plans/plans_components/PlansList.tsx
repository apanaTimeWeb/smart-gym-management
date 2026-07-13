'use client';

import { Check, Edit2, Trash2 } from 'lucide-react';
import { usePlansContext } from '@/app/superadmin/plans/plans_context/PlansContext';

export default function PlansList() {
  const { plans, loading, error, openEditModal, handleDeletePlan } = usePlansContext();

  const onDeleteClick = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the plan "${name}"?`)) {
      handleDeletePlan(id);
    }
  };

  if (loading) return <div className="p-8 text-center text-disabled">Loading...</div>;
  if (error || !plans) return <div className="p-8 text-center text-destructive">Error loading data.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <div key={plan.id} className="bg-card border border-border rounded-2xl p-6 flex flex-col relative overflow-hidden group hover:border-primary transition-colors">
          
          <div className="absolute top-0 right-0 bg-primary/10 text-primary px-3 py-1 text-xs font-bold rounded-bl-lg">
            {plan.activeTenants || 0} Gyms Active
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-bold text-foreground">{plan.name}</h2>
            <div className="flex items-end gap-1 mt-2">
              <span className="text-3xl font-extrabold text-foreground">${Number(plan.priceMonthly).toFixed(2)}</span>
              <span className="text-secondary font-medium mb-1">/ mo</span>
            </div>
          </div>

          <div className="space-y-3 flex-1 mb-6">
            <p className="text-sm text-secondary font-medium pb-2 border-b border-border">
              Max Members: <span className="text-foreground">{plan.maxMembers}</span>
            </p>
            <p className="text-sm text-secondary font-medium pb-2 border-b border-border">
              Max Staff: <span className="text-foreground">{plan.maxStaff}</span>
            </p>
            <div className="pt-2">
              {plan.features?.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-2 text-sm text-secondary">
                  <Check className="w-4 h-4 text-success" />
                  {feat}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => openEditModal(plan)}
              className="flex-1 py-2.5 flex items-center justify-center bg-input hover:bg-primary hover:text-white text-foreground rounded-xl transition-colors border border-border"
              title="Edit Plan"
            >
              <Edit2 size={18} />
            </button>
            <button 
              onClick={() => onDeleteClick(plan.id, plan.name)}
              className="flex-1 py-2.5 flex items-center justify-center bg-input hover:bg-destructive hover:text-white text-secondary rounded-xl transition-colors border border-border"
              title="Delete Plan"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
