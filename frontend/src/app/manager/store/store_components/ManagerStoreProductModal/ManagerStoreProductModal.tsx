// RESPONSIBILITY: Renders the Store product add/edit modal; all form state, validation, submission, and dirty guards are delegated to the form hook.
'use client';
import { X, Save, Loader2 } from 'lucide-react';
import { Controller } from 'react-hook-form';
import ManagerSearchableDropdown from '@/app/manager/manager_components/ManagerShared/ManagerSearchableDropdown';
import { useManagerStoreProductForm } from '@/app/manager/store/store_hooks/ManagerUseManagerStoreProductForm';
import { CATEGORIES } from '@/app/manager/store/store_utils/ManagerStoreSharedConstants';
import type { ProductFormValues } from '@/app/manager/store/store_types/ManagerStoreProductFormTypes';
import type { ManagerStoreProductFieldType } from '@/app/manager/store/store_types/ManagerStoreTypes';


const PRODUCT_FIELDS: ReadonlyArray<{ label: string; key: keyof ProductFormValues; type: ManagerStoreProductFieldType }> = [
  { label: 'Product Name', key: 'name', type: 'text' },
  { label: 'Unit/Variant (e.g. 1 KG, 500 ML)', key: 'unit', type: 'text' },
  { label: 'Price (₹)', key: 'price', type: 'number' },
  { label: 'Stock Quantity', key: 'stock', type: 'number' },
  { label: 'Description', key: 'description', type: 'text' },
];

export default function ManagerStoreProductModal() {
  const { form, showProductModal, editProductId, saving, handleClose, submit } = useManagerStoreProductForm();
  const { register, control, formState: { errors } } = form;
  if (!showProductModal) return null;

  return (
    <div className="fixed inset-0 bg-overlay-backdrop z-40 flex items-center justify-center p-4" role="presentation">
      <div className="bg-overlay rounded-2xl shadow-dialog w-full max-w-md max-h-full overflow-y-auto border-2 border-warning" role="dialog" aria-modal="true" aria-labelledby="manager-store-product-title">
        <div className="sticky top-0 bg-overlay px-6 py-4 border-b border-border flex items-center justify-between">
          <h3 id="manager-store-product-title" className="text-lg font-bold text-primary">{editProductId ? 'Edit Product' : 'Add Product'}</h3>
          <button type="button" aria-label="Close product form" onClick={handleClose} className="min-h-11 min-w-11 flex items-center justify-center rounded-lg hover:bg-surface-hover text-secondary motion-safe:transition-colors"><X size={18} aria-hidden="true" /></button>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          {PRODUCT_FIELDS.map((field) => {
            const error = errors[field.key];
            return (
              <div key={field.key}>
                <label htmlFor={`manager-store-product-${String(field.key)}`} className="block text-sm font-medium text-secondary mb-1">{field.label}</label>
                <input
                  id={`manager-store-product-${String(field.key)}`}
                  type={field.type}
                  min={field.type === 'number' ? '0' : undefined}
                  step={field.key === 'price' ? '0.01' : field.type === 'number' ? '1' : undefined}
                  {...register(field.key, field.type === 'number' ? { valueAsNumber: true } : {})}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 ${error ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-warning'} bg-input text-primary`}
                />
                {error && <p role="alert" className="text-danger text-xs mt-1">{String(error.message ?? '')}</p>}
              </div>
            );
          })}
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Category</label>
            <Controller name="category" control={control} render={({ field }) => <ManagerSearchableDropdown value={field.value} onChange={field.onChange} options={CATEGORIES.map((category) => ({ label: category, value: category }))} />} />
            {errors.category && <p role="alert" className="text-danger text-xs mt-1">{String(errors.category.message ?? '')}</p>}
          </div>
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
            <button type="button" onClick={handleClose} className="flex-1 min-h-11 py-2.5 border border-border rounded-xl text-sm font-medium text-primary hover:bg-primary-subtle motion-safe:transition-colors">Cancel</button>
            <button type="submit" disabled={saving} className="min-w-32 flex-1 min-h-11 py-2.5 rounded-xl text-sm font-bold text-on-primary flex items-center justify-center gap-2 disabled:opacity-70 motion-safe:transition-colors bg-primary">
              {saving ? <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" /> : <Save size={18} aria-hidden="true" />}
              <span>{saving ? 'Saving…' : editProductId ? 'Update' : 'Add Product'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
