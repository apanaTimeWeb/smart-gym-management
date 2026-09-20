// RESPONSIBILITY: Main container for the Expenses module. Assembles Header, Toolbar, KPIs, Table, Chart, and Modal while feature hooks own query and UI state orchestration.
'use client';
import { ManagerExpensesContent } from '@/app/manager/expenses/expenses_components/ManagerExpensesMain/ManagerExpensesContent/ManagerExpensesContent';

export default function ManagerExpensesMain() {
  return <ManagerExpensesContent />;
}
