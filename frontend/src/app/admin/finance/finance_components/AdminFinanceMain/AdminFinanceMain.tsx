"use client";
// RESPONSIBILITY: Provides the implementation for AdminFinanceMain.tsx functionality within its module.

import AdminHeader from '@/app/admin/admin_components/AdminLayout/AdminHeader';
import { useAdminFinanceLogic } from '@/app/admin/finance/finance_context/useAdminFinanceLogic';
import AdminFinanceKPIs from '@/app/admin/finance/finance_components/AdminFinanceKPIs/AdminFinanceKPIs';
import AdminFinanceRevenueByMethod from '@/app/admin/finance/finance_components/AdminFinanceRevenueByMethod/AdminFinanceRevenueByMethod';
import AdminFinanceTabs from '@/app/admin/finance/finance_components/AdminFinanceTabs/AdminFinanceTabs';
import type { FinanceInitialData } from '@/app/admin/finance/finance_types/AdminFinanceTypes';

import { AdminDateFilterDropdown } from '@/app/admin/admin_components/AdminShared/AdminDateFilterDropdown';

export default function AdminFinanceMain({ initialData }: { initialData?: FinanceInitialData | null }) {
  const { status } = useAdminFinanceLogic(initialData);

  return (
    <div className="min-h-full pb-10 bg-background text-foreground">
      <AdminHeader title="Finance" subtitle="Track revenue, payments and financial overview" />
      <div className="p-6 space-y-5">
        <div className="flex justify-end items-center">
          <AdminDateFilterDropdown />
        </div>
        <AdminFinanceKPIs />
        <AdminFinanceRevenueByMethod />
        <AdminFinanceTabs />
      </div>

    </div>
  );
}