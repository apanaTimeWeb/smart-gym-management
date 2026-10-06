import { MANAGER_EXPENSES_STATUS_VALUES } from '@/app/frontend_manager/manager_expenses/manager_expenses_constants/ManagerExpensesConstants';
import type { Expense, ExpenseStats } from '@/app/frontend_manager/manager_expenses/manager_expenses_types/ManagerExpensesTypes';

/**
 * @description Provides the ManagerExpensesMockData implementation for the expenses module.
 * @dependencies @/app/frontend_manager/manager_expenses/manager_expenses_types/ManagerExpensesTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MOCK_EXPENSES_STATS: ExpenseStats = {
  totalAmount: 15500000,
  paidAmount: 14000000,
  pendingAmount: 1500000,
  thisMonthAmount: 4500000 };

export const MOCK_EXPENSES_LIST: Expense[] = [
  {
    id: '1',
    title: 'Electricity Bill - August',
    category: 'Utilities',
    amount: 1250000,
    date: new Date().toISOString().split('T')[0] || '',
    status: MANAGER_EXPENSES_STATUS_VALUES.PAID,
    paymentMode: 'NetBanking',
    vendorName: 'State Electricity Board',
    createdAt: new Date().toISOString(),
    isRecurring: true,
    recurringFrequency: 'Monthly' },
  {
    id: '2',
    title: 'Gym Equipment Maintenance',
    category: 'Maintenance',
    amount: 800000,
    date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0] || '',
    status: MANAGER_EXPENSES_STATUS_VALUES.PAID,
    paymentMode: 'Card',
    vendorName: 'FitTech Services',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    isRecurring: false },
  {
    id: '3',
    title: 'Cleaning Supplies',
    category: 'Supplies',
    amount: 350000,
    date: new Date(Date.now() - 86400000 * 5).toISOString().split('T')[0] || '',
    status: MANAGER_EXPENSES_STATUS_VALUES.PENDING,
    paymentMode: 'Cash',
    vendorName: 'Local Market',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    isRecurring: true,
    recurringFrequency: 'Weekly' },
  {
    id: '4',
    title: 'Facebook Ads Campaign',
    category: 'Marketing',
    amount: 1500000,
    date: new Date(Date.now() - 86400000 * 10).toISOString().split('T')[0] || '',
    status: MANAGER_EXPENSES_STATUS_VALUES.PAID,
    paymentMode: 'Card',
    vendorName: 'Meta',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    isRecurring: false },
  {
    id: '5',
    title: 'Trainer Certifications',
    category: 'Training',
    amount: 2500000,
    date: new Date(Date.now() - 86400000 * 15).toISOString().split('T')[0] || '',
    status: MANAGER_EXPENSES_STATUS_VALUES.PENDING,
    paymentMode: 'Bank Transfer',
    vendorName: 'ACE Fitness',
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
    isRecurring: false }
];
