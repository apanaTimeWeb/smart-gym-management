// RESPONSIBILITY: Renders ManagerStoreProductModal's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useRef } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';
import { useManagerDialogFocusTrap } from '@/app/frontend_manager/manager_infrastructure/useManagerDialogFocusTrap';
import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';
import { CATEGORIES } from '@/app/frontend_manager/manager_store/manager_store_constants/ManagerStoreSharedConstants';
import { useManagerStoreProductForm } from '@/app/frontend_manager/manager_store/manager_store_hooks/useManagerStoreProductForm';
import type { ProductFormValues } from '@/app/frontend_manager/manager_store/manager_store_types/ManagerStoreProductFormTypes';
import type { ManagerStoreProductFieldType } from '@/app/frontend_manager/manager_store/manager_store_types/ManagerStoreTypes';


/**
 * @description Renders/orchestrates the ManagerStoreProductModal user interface for the store module without owning sibling business logic.
 * @dependencies @/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown; @/app/frontend_manager/manager_store/manager_store_hooks/useManagerStoreProductForm; @/app/frontend_manager/manager_store/manager_store_constants/ManagerStoreSharedConstants; @/app/frontend_manager/manager_store/manager_store_types/ManagerStoreProductFormTypes; @/app/frontend_manager/manager_store/manager_store_types/ManagerStoreTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const PRODUCT_FIELDS: ReadonlyArray<{ labelKey: string; key: keyof ProductFormValues; type: ManagerStoreProductFieldType }> = [
  { labelKey: 'COPY_PRODUCT_NAME', key: 'name', type: 'text' },
  { labelKey: 'COPY_UNIT_VARIANT_E_G_1_KG_500_ML', key: 'unit', type: 'text' },
  { labelKey: 'COPY_PRICE', key: 'price', type: 'number' },
  { labelKey: 'COPY_STOCK_QUANTITY', key: 'stock', type: 'number' },
  { labelKey: 'COPY_DESCRIPTION_2', key: 'description', type: 'text' },
];

/** @description Renders the ManagerStoreProductModal component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (5 documented module/import dependencies).. @edge-case Preserves error state, modal lifecycle. */
export default function ManagerStoreProductModal() {
  const t = useTranslations('MANAGER_STORE');

  const { form, showProductModal, editProductId, handleClose, submit } = useManagerStoreProductForm();
  const dialogRef = useRef<HTMLDivElement>(null);
  useManagerDialogFocusTrap({ dialogRef, isOpen: showProductModal, onClose: handleClose });
  const { register, control, formState: { errors, isSubmitting } } = form;
  if (!showProductModal) return null;

  return (
    <div data-testid="manager_store-managerstoreproductmodal-presentation" className="fixed inset-0 bg-overlay-backdrop z-40 flex items-center justify-center p-4"role="presentation">
      <div data-testid="manager_store-managerstoreproductmodal-dialog" ref={dialogRef} className="bg-overlay rounded-2xl shadow-dialog w-full max-w-md max-h-full overflow-y-auto border-2 border-warning"role="dialog" aria-modal="true" aria-labelledby="manager-store-product-title">
        <div className="sticky top-0 bg-overlay px-6 py-4 border-b border-border flex items-center justify-between">
          <h3 id="manager-store-product-title" className="text-lg font-bold text-primary">{editProductId ? t('COPY_EDIT_PRODUCT') : t('COPY_ADD_PRODUCT')}</h3>
          <button data-testid="manager_store-manager-store-product-modal-close-1" type="button" aria-label={t("COPY_CLOSE_PRODUCT_FORM")} onClick={handleClose} className="min-h-11 min-w-11 flex items-center justify-center rounded-lg hover:bg-surface-hover text-secondary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"><X size={18} strokeWidth={2} aria-hidden="true"/></button>
        </div>
        <form data-testid="manager_store-managerstoreproductmodal-form-1" onSubmit={submit} className="p-6 space-y-4">
          {PRODUCT_FIELDS.map((field, mapIndex) => {
            const error = errors[field.key];
            return (
              <div key={field.key}>
                <label htmlFor={`manager-store-product-${String(field.key)}`} className="block text-sm font-medium text-secondary mb-1">{t(field.labelKey)}</label>
                <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 ${error ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-warning'} bg-input text-primary`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_store-store-managerstoreproductmodal-input-primary-${mapIndex}`}
                  id={`manager-store-product-${String(field.key)}`}
                  type={field.type}
                  min={field.type === 'number' ? '0' : undefined}
                  step={(() => { if (field.key === 'price') return '0.01'; return (() => { if (field.type === 'number') return '1'; return undefined; })(); })()}
                  {...register(field.key, field.type === 'number' ? { valueAsNumber: true } : {})}
                  
                />
                {error && <p data-testid={`manager_store-store-storeproductmodal-alert-category-${mapIndex}`} role="alert" className="text-danger text-xs mt-1">{String(error.message ?? '')}</p>}
              </div>
            );
          })}
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">{t("COPY_CATEGORY")}</label>
            <Controller name="category" control={control} render={({ field }) => <ManagerSearchableDropdown ariaLabel={t("COPY_CATEGORY")} ariaInvalid={Boolean(errors.category)} ariaDescribedBy={errors.category ? 'managerstoreproductmodal-category-error' : undefined} dataTestId="manager_store-managerstoreproductmodal-managersearchabledropdown-1" value={field.value} onChange={field.onChange} options={CATEGORIES.map((category) => ({ label: category, value: category }))}  data-testid="manager_store-managerstoreproductmodal-searchable-dropdown-1"/>} />
            {errors.category && <p id="managerstoreproductmodal-category-error" data-testid="manager_store-manager-store-product-modal-status" role="alert" className="text-danger text-xs mt-1">{String(errors.category.message ?? '')}</p>}
          </div>
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
            <button data-testid="manager_store-manager-store-product-modal-close-2" type="button" onClick={handleClose} className="flex-1 min-h-11 py-2.5 border border-border rounded-xl text-sm font-medium text-primary hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110">{t("COPY_CANCEL")}</button>
            <button data-testid="manager_store-manager-store-product-modal-button-submit" type="submit" disabled={isSubmitting} className="min-w-32 flex-1 min-h-11 py-2.5 rounded-xl text-sm font-bold text-on-primary flex items-center justify-center gap-2 disabled:opacity-70 motion-safe:transition-all bg-primary motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110">
              {isSubmitting ? <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" aria-hidden="true"/> : <Save size={18} strokeWidth={2} aria-hidden="true"/>}
              <span>{(() => { if (isSubmitting) return t('COPY_SAVING'); return (() => { if (editProductId) return t('COPY_UPDATE'); return t('COPY_ADD_PRODUCT'); })(); })()}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
