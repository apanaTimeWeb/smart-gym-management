'use client';
// RESPONSIBILITY: Renders a modal for creating or editing a member.
import { useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import { useMembersContext } from '@/app/manager/members/members_context/ManagerMembersContext';
import { useFetchPlans } from '@/app/manager/members/members_api/ManagerUseManagerMembersQueries';
import { useIsMutating } from '@tanstack/react-query';
import { MEMBERS_CYCLE_LABELS, getPriceForCycle, formatCurrency, type MemberFormValues, GENDER_OPTIONS, MEMBER_EDIT_STATUS_OPTIONS } from '@/app/manager/members/members_utils/ManagerMembersSharedConstants';
import ManagerMemberProfilePictureUpload from '@/app/manager/members/members_components/ManagerMembersModal/ManagerMemberProfilePictureUpload';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_utils/ManagerUnsavedChangesGuard';
import { useManagerMembersModalForm } from '@/app/manager/members/members_components/ManagerMembersModal/ManagerUseManagerMembersModalForm';

export default function ManagerMembersModal() {
  const {
    showAddModal, setShowAddModal, editId, editData,
    saveMember
  } = useMembersContext();

  const { data: plansData } = useFetchPlans();
  const plans = plansData || [];
  const saving = useIsMutating() > 0;

  const {
    useFormReturn,
    register,
    handleSubmit,
    errors,
    isDirty,
    watchPlanId,
    watchBillingCycle,
    watchCustomDays,
    selectedPlan,
  } = useManagerMembersModalForm(editData, showAddModal, plans, saveMember, editId);

  useManagerUnsavedChangesGuard(isDirty && !saving);

  if (!showAddModal) return null;

  return (
    <div className="fixed inset-0 bg-foreground/60 z-40 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-2xl shadow-2xl w-full max-w-2xl max-h-full overflow-y-auto border-2 border-warning">
        <div className="sticky top-0 px-8 py-5 border-b border-border bg-card flex items-center justify-between z-10">
          <h3 className="text-xl font-bold text-foreground">{editId ? 'Edit Member' : 'Add New Member'}</h3>
          <button
            type="button"
            onClick={() => setShowAddModal(false)}
            className="p-2 rounded-full hover:bg-primary/10 motion-safe:transition-colors text-secondary hover:text-primary"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          
          {/* Profile Picture Upload — extracted component (Rule 1: file size ceiling) */}
          <ManagerMemberProfilePictureUpload />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
            {[
              { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Rahul Sharma', fullWidth: true },
              { label: 'Email', key: 'email', type: 'email', placeholder: 'rahul@gmail.com' },
              { label: 'Phone', key: 'phone', type: 'tel', placeholder: '+91 98765 43210' },
              { label: 'Aadhaar No.', key: 'aadhaar', type: 'tel', placeholder: '123456789012' },
              { label: 'Address', key: 'address', type: 'text', placeholder: 'Andheri, Mumbai', fullWidth: true },
            ].map(f => (
              <div key={f.key} className={f.fullWidth ? 'sm:col-span-2' : ''}>
                <label className="block text-sm font-medium text-secondary mb-0.5">{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  maxLength={f.key === 'aadhaar' ? 12 : f.type === 'tel' ? 10 : undefined}
                  onKeyDown={f.type === 'tel' ? (e) => { 
                    if (['e', 'E', '-', '+', '.'].includes(e.key)) e.preventDefault(); 
                    if (e.key.length === 1 && !/^[0-9]$/.test(e.key) && !e.ctrlKey && !e.metaKey) e.preventDefault(); 
                  } : undefined}
                  {...register(f.key as keyof MemberFormValues)}
                  className={`w-full border rounded-xl px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary motion-safe:transition-all duration-200 ${
                    errors[f.key as keyof MemberFormValues] ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
                  }`}
                />
                {errors[f.key as keyof MemberFormValues] && (
                  <p className="text-danger text-xs mt-1.5">{errors[f.key as keyof MemberFormValues]?.message as string}</p>
                )}
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-secondary mb-0.5">Gender</label>
              <Controller
                name="gender"
                control={useFormReturn.control}
                render={({ field }) => (
                  <SearchableDropdown
                    value={field.value || ''}
                    onChange={field.onChange}
                    options={GENDER_OPTIONS}
                  />
                )}
              />
            </div>
            
            {editId && (
              <div>
                <label className="block text-sm font-medium text-secondary mb-0.5">Member Status</label>
                <Controller
                  name="status"
                  control={useFormReturn.control}
                  render={({ field }) => (
                    <SearchableDropdown
                      value={field.value || 'ACTIVE'}
                      onChange={field.onChange}
                      options={MEMBER_EDIT_STATUS_OPTIONS}
                    />
                  )}
                />
              </div>
            )}

            <div className={editId ? 'sm:col-span-2' : ''}>
              <label className="block text-sm font-medium text-secondary mb-0.5">Plan</label>
              <Controller
                name="planId"
                control={useFormReturn.control}
                render={({ field }) => (
                  <SearchableDropdown
                    options={plans.map(p => ({ value: p.id, label: p.name }))}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select plan..."
                    disabled={!!editId}
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-0.5">Billing Cycle</label>
              <Controller
                name="billingCycle"
                control={useFormReturn.control}
                render={({ field }) => (
                  <SearchableDropdown
                    value={field.value || ''}
                    onChange={field.onChange}
                    options={Object.entries(MEMBERS_CYCLE_LABELS).map(([val, label]) => ({ label, value: val }))}
                    disabled={!!editId}
                  />
                )}
              />
            </div>
            {watchBillingCycle === 'CUSTOM' && (
              <div>
                <label className="block text-sm font-medium text-secondary mb-0.5">Custom Days</label>
                <input
                  type="number"
                  min="0"
                  readOnly={!!editId}
                  onKeyDown={(e) => { if (e.key === '-' || e.key === 'e' || e.key === '+') e.preventDefault(); }}
                  {...register('customDays')}
                  placeholder="e.g. 15"
                  className={`w-full border rounded-xl px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary motion-safe:transition-all duration-200 ${
                    errors.customDays ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
                  } ${editId ? 'opacity-80 cursor-not-allowed' : ''}`}
                />
                {errors.customDays && (
                  <p className="text-danger text-xs mt-0.5">{errors.customDays?.message as string}</p>
                )}
              </div>
            )}

            {watchPlanId && (
              <div className="sm:col-span-2 bg-warning-bg rounded-xl p-4 text-sm border border-warning/30 flex justify-between items-center">
                <div>
                  <span className="font-semibold text-warning">Calculated Price:</span>
                  <span className="text-warning ml-1 font-bold">
                    {formatCurrency(getPriceForCycle(selectedPlan, watchBillingCycle, Number(watchCustomDays) || 0))}
                  </span>
                </div>
                {watchBillingCycle === 'CUSTOM' && (
                  <div className="text-warning text-xs opacity-80">
                    (Per Day: {formatCurrency(selectedPlan?.priceCustom || 0)} × {watchCustomDays || 0} days)
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-secondary mb-0.5">Join Date</label>
              <input
                type="date"
                readOnly={!!editId}
                {...register('joinDate')}
                className={`w-full border rounded-xl px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary motion-safe:transition-all duration-200 ${editId ? 'opacity-80 cursor-not-allowed' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-0.5">Expiry Date</label>
              <input
                type="date"
                readOnly
                {...register('expiryDate')}
                className="w-full border rounded-xl px-4 py-2 text-sm focus-visible:outline-none bg-input text-primary motion-safe:transition-all duration-200 opacity-80 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-0.5">Total Plan Amount ({formatCurrency(0).replace(/0/g, '').trim()})</label>
              <input
                type="number"
                readOnly
                {...register('totalAmount', { valueAsNumber: true })}
                className="w-full border rounded-xl px-4 py-2 text-sm focus-visible:outline-none bg-input opacity-80 cursor-not-allowed text-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-0.5">Amount Paid ({formatCurrency(0).replace(/0/g, '').trim()})</label>
              <input
                type="number"
                min="0"
                readOnly={!!editId}
                onKeyDown={(e) => { if (e.key === '-' || e.key === 'e' || e.key === '+') e.preventDefault(); }}
                {...register('paidAmount', { valueAsNumber: true })}
                className={`w-full border rounded-xl px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary motion-safe:transition-all duration-200 ${editId ? 'opacity-80 cursor-not-allowed' : ''}`}
              />
            </div>
            
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-secondary mb-0.5">Medical History / Notes (Optional)</label>
              <textarea
                rows={2}
                placeholder="e.g. Asthma, Knee injury, High BP..."
                {...register('medicalHistory')}
                className="w-full border rounded-xl px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary motion-safe:transition-all duration-200 border-border focus-visible:ring-primary"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-6 py-2.5 text-sm font-semibold rounded-xl border border-border text-secondary hover:bg-primary/5 hover:text-primary motion-safe:transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-2.5 rounded-xl text-sm font-bold text-primary-foreground flex items-center justify-center gap-2 disabled:opacity-70 motion-safe:transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95 bg-primary"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full motion-safe:animate-spin" />
              ) : (
                <><Save size={16} /> {editId ? 'Update' : 'Add Member'}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
