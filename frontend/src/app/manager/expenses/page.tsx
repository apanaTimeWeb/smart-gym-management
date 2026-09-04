import { ExpensesProvider } from '@/app/manager/expenses/expenses_context/ManagerExpensesContext';
import ManagerExpensesMain from '@/app/manager/expenses/expenses_components/ManagerExpensesMain/ManagerExpensesMain';

export const metadata = {
  title: 'Expenses | GymSmart',
  description: 'Manage gym operational expenses and inventory.',
};

export default function ExpensesPage() {
  return (
    <ExpensesProvider>
      <ManagerExpensesMain />
    </ExpensesProvider>
  );
}
