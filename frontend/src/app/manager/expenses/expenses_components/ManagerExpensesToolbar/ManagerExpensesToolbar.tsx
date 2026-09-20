// RESPONSIBILITY: Renders the action bar for Expenses: Search, Filters, and "Add Expense" button.
'use client';
import { Search, Plus, Download } from 'lucide-react';
import { useManagerExpensesLogic } from '@/app/manager/expenses/expenses_hooks/ManagerUseManagerExpensesLogic';
import { EXPENSE_STATUS_LABELS } from '@/app/manager/expenses/expenses_utils/ManagerExpensesSharedConstants';
import ManagerSearchableDropdown from '@/app/manager/manager_components/ManagerShared/ManagerSearchableDropdown';


export default function ManagerExpensesToolbar() {
  const { search, setSearch, statusFilter, setStatusFilter, openAdd, exportExpenses } = useManagerExpensesLogic();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-4 rounded-xl border border-border shadow-card">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
        <h1 className="text-2xl font-bold text-primary mr-4">Expenses</h1>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} />
          <input
            type="text"
            placeholder="Search expenses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-primary motion-safe:transition-all"
          />
        </div>
        <div className="w-full sm:w-48">
          <ManagerSearchableDropdown
            value={statusFilter}
            onChange={(val) => setStatusFilter(val.toString())}
            options={[
              { value: 'All', label: 'All Statuses' },
              ...Object.entries(EXPENSE_STATUS_LABELS).map(([val, label]) => ({ value: val, label }))
            ]}
            className="bg-input"
          />
        </div>
      </div>
      <div className="flex w-full sm:w-auto items-center gap-2">
        <button
          onClick={() => exportExpenses && exportExpenses()}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-input border border-border text-secondary px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-subtle hover:text-primary motion-safe:transition-all motion-safe:duration-base"
        >
          <Download size={18} />
          Export
        </button>
        <button
          onClick={openAdd}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-lg text-sm font-bold shadow-card shadow-card hover:shadow-card hover:shadow-card motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:transition-all motion-safe:duration-base"
        >
          <Plus size={18} />
          Add Expense
        </button>
      </div>
    </div>
  );
}
