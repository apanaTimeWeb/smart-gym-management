// RESPONSIBILITY: Renders the modal UI for editing Gym details. Purely a view component.
'use client';

import React from 'react';
import { Controller } from 'react-hook-form';
import { SearchableDropdown } from '@/app/erp/erp_components/ErpShared/SearchableDropdown';
import { X } from 'lucide-react';
import { useGymEditModal } from './useGymEditModal';

export default function GymEditModal() {
  const {
    isEditModalOpen,
    closeEditModal,
    selectedGym,
    plans,
    loadingPlans,
    register,
    handleSubmit,
    onSubmit,
    control,
    errors,
    isSubmitting,
  } = useGymEditModal();

  if (!isEditModalOpen || !selectedGym) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4">
      <div className="bg-card rounded-2xl p-7 max-w-[480px] w-full border border-border shadow-2xl relative">
        <button
          onClick={closeEditModal}
          className="absolute top-5 right-5 text-secondary hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-bold text-foreground mb-1">Edit Gym Details</h2>
        <p className="text-sm text-secondary mb-6">Update the information for {selectedGym.name}.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-secondary mb-1">Gym Name <span className="text-destructive">*</span></label>
            <input
              type="text"
              {...register('name')}
              className="w-full bg-input border border-border rounded-lg px-[14px] py-[10px] text-sm text-foreground focus:border-border-focus focus:outline-none transition-colors"
            />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-secondary mb-1">Owner Name <span className="text-destructive">*</span></label>
            <input
              type="text"
              {...register('ownerName')}
              className="w-full bg-input border border-border rounded-lg px-[14px] py-[10px] text-sm text-foreground focus:border-border-focus focus:outline-none transition-colors"
            />
            {errors.ownerName && <p className="text-xs text-destructive mt-1">{errors.ownerName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-secondary mb-1">Admin Email <span className="text-destructive">*</span></label>
            <input
              type="email"
              {...register('adminEmail')}
              className="w-full bg-input border border-border rounded-lg px-[14px] py-[10px] text-sm text-foreground focus:border-border-focus focus:outline-none transition-colors"
            />
            {errors.adminEmail && <p className="text-xs text-destructive mt-1">{errors.adminEmail.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-secondary mb-1">Subscription Plan <span className="text-destructive">*</span></label>
            <Controller
              name="plan"
              control={control}
              render={({ field }) => (
                <SearchableDropdown
                  value={field.value || ''}
                  onChange={field.onChange}
                  options={plans ? plans.map(p => ({ label: `${p.name} ($${Number(p.priceMonthly).toFixed(2)}/mo)`, value: p.name })) : []}
                  disabled={loadingPlans}
                  placeholder={loadingPlans ? "Loading plans..." : "Select a plan"}
                />
              )}
            />
            {errors.plan && <p className="text-xs text-destructive mt-1">{errors.plan.message}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-6">
            <button
              type="button"
              onClick={closeEditModal}
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-foreground border border-border hover:bg-background transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary-hover transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
