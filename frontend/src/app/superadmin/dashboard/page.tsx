// RESPONSIBILITY: page.tsx handles the logic and UI for its corresponding feature.
import { Users, Building2, CreditCard, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSuperadminData } from '@/app/superadmin/superadmin_utils/useSuperadminData';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { SaaSDashboardMetrics, Tenant } from '@/app/superadmin/superadmin_types/superadmin_types';

export default function SaaSDashboard() {
  const { data, loading, error } = useSuperadminData<{ metrics: SaaSDashboardMetrics, revenue: any[], growth: any[] }>(SuperadminUrlConfig.BACKEND_API.DASHBOARD_BASE);

  if (loading) return <div className="p-8 text-center text-disabled">Loading...</div>;
  if (error || !data) return <div className="p-8 text-center text-destructive">Error loading data.</div>;

  const { metrics: DUMMY_DASHBOARD_METRICS, revenue: REVENUE_CHART_DATA, growth: GYM_GROWTH_DATA } = data;

  const metrics = [
    { label: 'Total MRR', value: `$${DUMMY_DASHBOARD_METRICS.monthlyRecurringRevenue.toLocaleString()}`, icon: CreditCard, color: 'text-success' },
    { label: 'Total Gyms (Tenants)', value: DUMMY_DASHBOARD_METRICS.totalGyms, icon: Building2, color: 'text-primary' },
    { label: 'Active Gyms', value: DUMMY_DASHBOARD_METRICS.activeGyms, icon: Activity, color: 'text-primary' },
    { label: 'Total End Users', value: DUMMY_DASHBOARD_METRICS.totalEndUsers.toLocaleString(), icon: Users, color: 'text-purple' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
          SaaS Overview
        </h1>
        <p className="text-secondary mt-1">Monitor the health and growth of your Multi-Tenant SaaS platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m) => (
          <div key={m.label} className="bg-background border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-secondary font-medium text-sm">{m.label}</span>
              <m.icon className={`w-5 h-5 ${m.color}`} />
            </div>
            <div className="text-3xl font-bold text-foreground">{m.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-background border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-6">MRR Growth (Monthly Recurring Revenue)</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_CHART_DATA}>
                <defs>
                  <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#f3f4f6' }}
                  itemStyle={{ color: '#60a5fa' }}
                />
                <Area type="monotone" dataKey="mrr" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorMrr)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-background border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-6">Recent Onboards</h2>
          <div className="space-y-4">
            {DUMMY_DASHBOARD_METRICS.recentOnboards.map((tenant) => (
              <div key={tenant.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                <div>
                  <h3 className="font-semibold text-foreground">{tenant.name}</h3>
                  <p className="text-xs text-secondary mt-1">{tenant.ownerName}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold
                    ${
                      tenant.plan?.toUpperCase() === 'ENTERPRISE' ? 'bg-purple-bg text-purple border border-purple' : 
                      tenant.plan?.toUpperCase() === 'PRO' ? 'bg-primary-subtle text-primary border border-primary' : 
                      tenant.plan?.toUpperCase() === 'STARTER' || tenant.plan?.toUpperCase() === 'BASIC' ? 'bg-success-bg text-success border border-success' :
                      'bg-input text-secondary border border-border'
                    }
                  `}>
                    {tenant.plan?.toUpperCase() || 'UNKNOWN'}
                  </span>
                  <p className="text-xs text-disabled mt-2">{tenant.createdAt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}




