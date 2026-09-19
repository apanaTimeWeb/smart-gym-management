"use client";
// RESPONSIBILITY: Provides the implementation for AdminFinanceMain.tsx functionality within its module.
import { useAdminFinanceLogic } from '@/app/admin/finance/finance_context/useAdminFinanceLogic';
import AdminFinanceKPIs from '@/app/admin/finance/finance_components/AdminFinanceKPIs/AdminFinanceKPIs';
import AdminFinanceRevenueByMethod from '@/app/admin/finance/finance_components/AdminFinanceRevenueByMethod/AdminFinanceRevenueByMethod';
import AdminFinanceTabs from '@/app/admin/finance/finance_components/AdminFinanceTabs/AdminFinanceTabs';
import type { FinanceInitialData } from '@/app/admin/finance/finance_types/AdminFinanceTypes';

import { AdminFinanceDateFilterDropdown } from '@/app/admin/finance/finance_components/AdminFinanceDateFilter/AdminFinanceDateFilterDropdown';

export default function AdminFinanceMain({ initialData }: { initialData?: FinanceInitialData | null }) {
  const { status } = useAdminFinanceLogic(initialData);

  return (
    <div className="min-h-full pb-10 bg-page text-primary">
      <div className="p-6 space-y-5">
        <div className="flex justify-end items-center">
          <AdminFinanceDateFilterDropdown />
        </div>
        <AdminFinanceKPIs />
        <AdminFinanceRevenueByMethod />
        <AdminFinanceTabs />
      </div>

    </div>
  );
}