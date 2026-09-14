'use client';
import { useTrainerDashboardQuery } from '@/app/trainer/dashboard/dashboard_queries/useTrainerDashboardQuery';
import { useTrainerDashboardStore } from '@/app/trainer/dashboard/dashboard_store/useTrainerDashboardStore';
import TrainerDashboardEmptyState from '@/app/trainer/dashboard/dashboard_components/TrainerDashboardEmptyState/TrainerDashboardEmptyState';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Users } from 'lucide-react';

const COLORS = ['#2563eb', '#16a34a', '#eab308', '#dc2626']; // Tailwind primary, success, warning, danger

export default function TrainerDashboardMembershipDistribution() {
  const { data: stats } = useTrainerDashboardQuery();
  const timeRange = useTrainerDashboardStore(s => s.timeRange);
  if (!stats) return null;

  const timeMultiplier = timeRange === 'weekly' ? 0.25 : timeRange === 'yearly' ? 12 : timeRange === 'custom' ? 1.5 : 1;

  const data = (stats.membersByPlan || []).map(p => ({
    name: p.plan,
    value: Math.round(p.count * timeMultiplier),
  }));

  return (
    <div className="rounded-xl shadow-sm border p-5 bg-card border-border flex flex-col h-full min-h-[300px]">
      <h2 className="font-semibold mb-4 text-primary">Membership Distribution</h2>
      {data.length === 0 ? (
        <TrainerDashboardEmptyState type="memberships" />
      ) : (
        <div className="h-[260px] w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '0.5rem', color: 'hsl(var(--foreground))' }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
