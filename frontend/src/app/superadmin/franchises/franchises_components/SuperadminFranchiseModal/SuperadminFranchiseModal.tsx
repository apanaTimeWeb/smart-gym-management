'use client';
// RESPONSIBILITY: Renders the modal for editing a Superadmin Franchise's details.

import React, { useEffect } from 'react';
import { X, Loader2, Network } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SuperadminFranchise } from '@/app/superadmin/franchises/franchises_types/superadmin_franchises_types';
import { franchiseSchema, type FranchiseFormValues } from '@/app/superadmin/superadmin_utils/SuperadminZodSchemas';

export interface FranchiseFormData extends FranchiseFormValues {}

interface SuperadminFranchiseModalProps {
  isOpen: boolean;
  onClose: () => void;
  franchise: SuperadminFranchise;
  onSubmit: (data: FranchiseFormData) => void;
  isMutating: boolean;
}

export function SuperadminFranchiseModal({
  isOpen,
  onClose,
  franchise,
  onSubmit,
  isMutating,
}: SuperadminFranchiseModalProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FranchiseFormData>({
    resolver: zodResolver(franchiseSchema)
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        franchiseName: franchise.franchiseName,
        ownerName: franchise.ownerName,
        ownerEmail: franchise.ownerEmail,
        city: franchise.city,
        state: franchise.state,
        plan: franchise.plan,
      });
    }
  }, [isOpen, franchise, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-card w-full max-w-lg rounded-2xl shadow-xl overflow-hidden border border-border motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 flex flex-col h-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Network size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Edit Franchise</h2>
              <p className="text-xs text-secondary mt-0.5">Update details for {franchise.franchiseName}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-secondary hover:text-foreground hover:bg-input rounded-xl motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col overflow-y-auto">
          <div className="p-6 space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Franchise Name</label>
              <input
                {...register('franchiseName', { required: 'Required' })}
                className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 motion-safe:transition-all"
                placeholder="e.g. FitLife Group"
              />
              {errors.franchiseName && <p className="text-xs text-danger">{errors.franchiseName.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Owner Name</label>
                <input
                  {...register('ownerName', { required: 'Required' })}
                  className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 motion-safe:transition-all"
                  placeholder="e.g. John Doe"
                />
                {errors.ownerName && <p className="text-xs text-danger">{errors.ownerName.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Owner Email</label>
                <input
                  type="email"
                  {...register('ownerEmail', { required: 'Required' })}
                  className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 motion-safe:transition-all"
                  placeholder="e.g. john@fitlife.com"
                />
                {errors.ownerEmail && <p className="text-xs text-danger">{errors.ownerEmail.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">City</label>
                <input
                  {...register('city', { required: 'Required' })}
                  className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 motion-safe:transition-all"
                  placeholder="e.g. Mumbai"
                />
                {errors.city && <p className="text-xs text-danger">{errors.city.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">State</label>
                <input
                  {...register('state', { required: 'Required' })}
                  className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 motion-safe:transition-all"
                  placeholder="e.g. Maharashtra"
                />
                {errors.state && <p className="text-xs text-danger">{errors.state.message}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Plan Tier</label>
              <select
                {...register('plan', { required: 'Required' })}
                className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 motion-safe:transition-all appearance-none"
              >
                <option value="Enterprise">Enterprise</option>
                <option value="Pro">Pro</option>
                <option value="Scale">Scale</option>
              </select>
            </div>

          </div>

          {/* Footer */}
          <div className="p-6 pt-4 border-t border-border flex justify-end gap-3 bg-card mt-auto">
            <button
              type="button"
              onClick={onClose}
              disabled={isMutating}
              className="px-6 py-2.5 rounded-xl font-medium border border-border text-foreground hover:bg-input motion-safe:transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isMutating}
              className="px-6 py-2.5 rounded-xl font-medium bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20 motion-safe:transition-colors disabled:opacity-50 flex items-center justify-center min-w-32"
            >
              {isMutating ? <Loader2 size={18} className="motion-safe:animate-spin" /> : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
