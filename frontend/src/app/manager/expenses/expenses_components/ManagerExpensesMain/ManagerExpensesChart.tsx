// RESPONSIBILITY: Renders a category-wise breakdown chart for expenses using Recharts.
'use client';

import { useMemo } from 'react';
import { useManagerExpensesStore } from '@/app/manager/expenses/expenses_store/useManagerExpensesStore';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const COLORS = ['#eab308', '#3b82f6', '#22c55e', '#ef4444', '#a855f7', '#f97316'];

export default function ManagerExpensesChart() {
  const expenses = useManagerExpensesStore(s => s.expenses);

  const chartData = useMemo(() => {
    const categoryTotals: Record<string, number> = {};
    
    // Group and sum expenses by category
    expenses.forEach(exp => {
      const cat = exp.category || 'Other';
      if (!categoryTotals[cat]) {
        categoryTotals[cat] = 0;
      }
      categoryTotals[cat] += exp.amount;
    });

    // Convert to array format required by Recharts
    const data = Object.keys(categoryTotals).map(category => ({
      name: category,
      value: categoryTotals[category]
    }));

    // Sort descending by value
    return data.sort((a, b) => (b.value || 0) - (a.value || 0));
  }, [expenses]);

  if (chartData.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-secondary font-medium">No expense data available to chart.</p>
      </div>
    );
  }

  // Calculate total and highest for the summary headers
  const totalThisMonth = chartData.reduce((acc, curr) => acc + (curr.value || 0), 0);
  const highestCategory = chartData.length > 0 ? chartData[0] : null;

  return (
    <div className="flex flex-col h-full w-full p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-input rounded-lg border border-border">
          <p className="text-sm font-bold text-secondary uppercase tracking-wider mb-1">Total Tracked Expenses</p>
          <p className="text-2xl font-black text-danger">
            ₹{totalThisMonth.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="p-4 bg-input rounded-lg border border-border">
          <p className="text-sm font-bold text-secondary uppercase tracking-wider mb-1">Highest Category</p>
          <p className="text-2xl font-black text-warning">
            {highestCategory ? `${highestCategory.name} (₹${(highestCategory.value || 0).toLocaleString('en-IN')})` : 'N/A'}
          </p>
        </div>
        <div className="p-4 bg-input rounded-lg border border-border">
          <p className="text-sm font-bold text-secondary uppercase tracking-wider mb-1">Total Categories</p>
          <p className="text-2xl font-black text-primary">
            {chartData.length}
          </p>
        </div>
      </div>

      <div className="flex-1 min-h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="var(--secondary)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="var(--secondary)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip 
              cursor={{ fill: 'var(--input)' }}
              contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px', color: 'var(--foreground)', fontWeight: 'bold' }}
              itemStyle={{ color: 'var(--foreground)' }}
              formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Amount']}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
