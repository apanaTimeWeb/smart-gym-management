// RESPONSIBILITY: GymEditModal.tsx handles the logic and UI for its corresponding feature.
'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchableDropdown } from '@/app/erp/erp_components/ErpShared/SearchableDropdown';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Tenant } from '@/app/superadmin/superadmin_types/superadmin_types';
import { useGymsContext } from '@/app/superadmin/gyms/gyms_context/GymsContext';
import { useSuperadminData } from '@/app/superadmin/superadmin_utils/useSuperadminData';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { SubscriptionPlan } from '@/app/superadmin/superadmin_types/superadmin_types';

const gymEditSchema = z.object({
  name: z.string().min(1, 'Gym Name is required'),
  ownerName: z.string().min(1, 'Owner Name is required'),
  adminEmail: z.string().email('Invalid email address'),
  plan: z.string().min(1, 'Please select a plan'),
});

type GymEditFormValues = z.infer<typeof gymEditSchema>;

export default function GymEditModal() {
  const { isEditModalOpen, closeEditModal, selectedGym, handleEditGym } = useGymsContext();
  const { data: plans, loading: loadingPlans } = useSuperadminData<SubscriptionPlan[]>(SuperadminUrlConfig.BACKEND_API.PLANS_BASE);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<GymEditFormValues>({
    resolver: zodResolver(gymEditSchema),
  });

  // Populate form when modal opens
  useEffect(() => {
    if (selectedGym && isEditModalOpen) {
      reset({
        name: selectedGym.name,
        ownerName: selectedGym.ownerName,
        adminEmail: selectedGym.adminEmail,
        plan: selectedGym.plan,
      });
    }
  }, [selectedGym, isEditModalOpen, reset]);

  if (!isEditModalOpen || !selectedGym) return null;

  const onSubmit = async (data: GymEditFormValues) => {
    await handleEditGym(selectedGym.id, data);
  };

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
