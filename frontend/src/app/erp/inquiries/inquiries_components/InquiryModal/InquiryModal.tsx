// RESPONSIBILITY: Renders the modal form for creating or editing an inquiry lead. Uses React Hook Form + Zod validation.
'use client';

import { useEffect } from 'react';
import { useInquiriesContext } from '@/app/erp/inquiries/inquiries_context/InquiriesContext';
import { INQUIRY_MODAL_FIELDS, INQUIRIES_STATUS_LABELS, INQUIRY_SOURCES, InquirySchema, type InquiryFormValues } from '@/app/erp/inquiries/inquiries_utils/InquiriesSharedConstants';
import { X, Save } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchableDropdown } from '@/app/erp/erp_components/ErpShared/SearchableDropdown';

export default function InquiryModal() {
  const { showModal, setShowModal, editId, editData, saveInquiry, saving } = useInquiriesContext();

  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<InquiryFormValues>({
    resolver: zodResolver(InquirySchema),
    defaultValues: editData || {},
  });

  // Sync form values when modal opens with new editData
  useEffect(() => {
    if (showModal && editData) reset(editData);
  }, [showModal, editData, reset]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/60">
      <div className="bg-card rounded-2xl shadow-2xl shadow-black/50 w-full max-w-md max-h-[90vh] overflow-y-auto border border-border">
        <div className="sticky top-0 bg-card px-6 py-4 border-b border-border flex items-center justify-between">
          <h3 className="text-lg font-bold text-primary">{editId ? 'Edit Inquiry' : 'New Inquiry'}</h3>
          <button
            onClick={() => setShowModal(false)}
            className="p-2 rounded-lg transition-colors hover:bg-primary-subtle text-secondary"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit(saveInquiry)} className="p-6 space-y-4">
          {INQUIRY_MODAL_FIELDS.map(f => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-secondary mb-1">{f.label}</label>
              <input
                type={f.type}
                placeholder={'placeholder' in f ? f.placeholder : undefined}
                {...register(f.key as keyof InquiryFormValues)}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary transition-colors ${
                  errors[f.key as keyof InquiryFormValues] ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
                }`}
              />
              {errors[f.key as keyof InquiryFormValues] && (
                <p className="text-danger text-xs mt-1">{errors[f.key as keyof InquiryFormValues]?.message}</p>
              )}
            </div>
          ))}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Status</label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <SearchableDropdown
                    value={field.value || ''}
                    onChange={field.onChange}
                    options={Object.entries(INQUIRIES_STATUS_LABELS).map(([val, label]) => ({ label, value: val }))}
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Source</label>
              <Controller
                name="source"
                control={control}
                render={({ field }) => (
                  <SearchableDropdown
                    value={field.value || ''}
                    onChange={field.onChange}
                    options={INQUIRY_SOURCES.map(s => ({ label: s, value: s }))}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium text-primary hover:bg-primary-subtle transition-all duration-200 active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-primary text-white flex items-center justify-center gap-2 disabled:opacity-70 hover:bg-primary-hover transition-all duration-200 active:scale-95"
            >
              {saving
                ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <><Save size={15} />{editId ? 'Update' : 'Add Inquiry'}</>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
