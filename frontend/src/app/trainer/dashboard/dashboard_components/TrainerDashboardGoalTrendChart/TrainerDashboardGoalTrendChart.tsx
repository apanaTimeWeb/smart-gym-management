'use client';

import { useTrainerDashboardQuery } from '@/app/trainer/dashboard/dashboard_queries/useTrainerDashboardQuery';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target } from 'lucide-react';

export default function TrainerDashboardGoalTrendChart() {
  const { data: stats } = useTrainerDashboardQuery();

  if (!stats?.goalCompletionTrend || stats.goalCompletionTrend.length === 0) {
    return (
      <div className="bg-card rounded-xl shadow-sm border border-border p-5 h-[300px] flex items-center justify-center">
        <p className="text-secondary text-sm">No goal completion data available.</p>
      </div>
    );
  }

  const data = stats.goalCompletionTrend.map(d => ({
    month: d.month,
    rate: d.rate
  }));

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-5 flex flex-col h-full min-h-[300px]">
      <h3 className="text-base font-bold text-foreground mb-2">Goal Completion Trend</h3>
      <div className="h-[240px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'hsl(var(--secondary))', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'hsl(var(--secondary))', fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '0.5rem', color: 'hsl(var(--foreground))' }}
              formatter={(value: number) => [`${value}%`, 'Completion Rate']}
            />
            <Line 
              type="monotone" 
              dataKey="rate" 
              stroke="#3b82f6" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} 
              activeDot={{ r: 6, fill: '#3b82f6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
