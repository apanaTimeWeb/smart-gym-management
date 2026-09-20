// RESPONSIBILITY: Renders the modal form for creating or editing an expense.
'use client';
import { X, Save } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { useManagerExpensesForm } from '@/app/manager/expenses/expenses_hooks/ManagerUseManagerExpensesForm';
import { EXPENSE_CATEGORIES, EXPENSE_STATUS_LABELS, MANAGER_EXPENSE_MAX_AMOUNT_MAJOR_UNITS } from '@/app/manager/expenses/expenses_utils/ManagerExpensesSharedConstants';
import ManagerSearchableDropdown from '@/app/manager/manager_components/ManagerShared/ManagerSearchableDropdown';


export default function ManagerExpensesModal() {
  const { showModal, editId, saving, form, handleClose, submit } = useManagerExpensesForm();
  const { register, control, formState: { errors } } = form;

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-overlay-backdrop">
      <div className="bg-overlay rounded-2xl shadow-dialog w-full max-w-md overflow-visible border border-border max-h-full flex flex-col">
        <div className="sticky top-0 bg-overlay px-6 py-4 border-b border-border flex items-center justify-between z-10 rounded-t-2xl">
          <h3 className="text-lg font-bold text-primary">{editId ? 'Edit Expense' : 'Add Expense'}</h3>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 rounded-lg motion-safe:transition-colors hover:bg-primary-subtle text-secondary"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>
        <div className="overflow-y-auto flex-1">
          <form onSubmit={submit} className="p-6 space-y-4 pb-32">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Title</label>
              <input
                type="text"
                placeholder="e.g. October Electricity Bill"
                {...register('title')}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary motion-safe:transition-colors ${
                  errors.title ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
                }`}
              />
              {errors.title && <p className="text-danger text-xs mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Category</label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <ManagerSearchableDropdown
                    value={field.value || ''}
                    onChange={field.onChange}
                    options={EXPENSE_CATEGORIES.map(c => ({ label: c, value: c }))}
                    placeholder="Select Category..."
                  />
                )}
              />
              {errors.category && <p className="text-danger text-xs mt-1">{errors.category.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Amount (₹)</label>
                <input
                  type="number"
                  min="0"
                  max={MANAGER_EXPENSE_MAX_AMOUNT_MAJOR_UNITS}
                  step="0.01"
                  placeholder="0.00"
                  {...register('amount', { valueAsNumber: true })}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary motion-safe:transition-colors ${
                    errors.amount ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
                  }`}
                />
                {errors.amount && <p className="text-danger text-xs mt-1">{errors.amount.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Date</label>
                <input
                  type="date"
                  {...register('date')}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary motion-safe:transition-colors ${
                    errors.date ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
                  }`}
                />
                {errors.date && <p className="text-danger text-xs mt-1">{errors.date.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Status</label>
              <select
                {...register('status')}
                className="w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary motion-safe:transition-colors border-border focus-visible:ring-primary"
              >
                {Object.entries(EXPENSE_STATUS_LABELS).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Reference / Invoice No. (Optional)</label>
              <input
                type="text"
                placeholder="e.g. INV-2023-001"
                {...register('referenceNo')}
                className="w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary motion-safe:transition-colors border-border focus-visible:ring-primary"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Receipt URL (Optional)</label>
              <input
                type="url"
                placeholder="https://example.com/receipt.jpg"
                {...register('receiptUrl')}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary motion-safe:transition-colors ${
                  errors.receiptUrl ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
                }`}
              />
              {errors.receiptUrl && (
                <p className="text-danger text-xs mt-1">{errors.receiptUrl.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Notes (Optional)</label>
              <textarea
                rows={3}
                placeholder="Any additional details..."
                {...register('notes')}
                className="w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary motion-safe:transition-colors border-border focus-visible:ring-primary resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium text-primary hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="min-w-32 flex-1 py-2.5 rounded-xl text-sm font-bold bg-primary text-on-primary flex items-center justify-center gap-2 disabled:opacity-70 hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95"
              >
                {saving
                  ? <div className="w-4 h-4 border-2 border-border border-t-on-primary rounded-full motion-safe:animate-spin" />
                  : <><Save size={18} />{editId ? 'Update' : 'Save Expense'}</>
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
