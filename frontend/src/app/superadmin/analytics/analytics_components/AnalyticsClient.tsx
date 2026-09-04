'use client';
/**
 * RESPONSIBILITY: Renders the Revenue Analytics dashboard for superadmins.
 * DATA FLOW: analyticsApi -> AnalyticsClient -> UI
 */

// RESPONSIBILITY: Renders the AnalyticsClient component.
import { useState, useEffect } from 'react';
import { analyticsApi } from '@/app/superadmin/analytics/analytics_api/analytics_api';
import type { RevenueMetrics } from '@/app/superadmin/analytics/analytics_types/analytics_types';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

export default function AnalyticsClient() {
  const [metrics, setMetrics] = useState<RevenueMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsApi.getRevenueMetrics().then(res => {
      if (res.success && res.data) {
        setMetrics(res.data);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        {[1, 2, 3, 4].map(i => (
          <div key={`skeleton-${i}`} className="h-32 bg-card motion-safe:animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  if (!metrics) return null;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Revenue Analytics</h1>
        <p className="text-secondary mt-1">Global SaaS metrics and financial intelligence.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card border border-border p-6 rounded-xl shadow-sm hover:shadow-md motion-safe:transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-secondary font-medium">MRR</span>
            <div className="p-2 bg-success/10 rounded-lg text-success"><DollarSign size={18} /></div>
          </div>
          <p className="text-3xl font-bold text-foreground">${metrics.mrr.toLocaleString()}</p>
          <p className="text-sm text-success mt-2 font-medium">+12% from last month</p>
        </div>

        <div className="bg-card border border-border p-6 rounded-xl shadow-sm hover:shadow-md motion-safe:transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-secondary font-medium">ARR</span>
            <div className="p-2 bg-primary/10 rounded-lg text-primary"><TrendingUp size={18} /></div>
          </div>
          <p className="text-3xl font-bold text-foreground">${metrics.arr.toLocaleString()}</p>
          <p className="text-sm text-success mt-2 font-medium">+15% from last year</p>
        </div>

        <div className="bg-card border border-border p-6 rounded-xl shadow-sm hover:shadow-md motion-safe:transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-secondary font-medium">Churn Rate</span>
            <div className="p-2 bg-danger-bg/10 rounded-lg text-danger"><Activity size={18} /></div>
          </div>
          <p className="text-3xl font-bold text-foreground">{metrics.churnRate}%</p>
          <p className="text-sm text-secondary mt-2">Target: &lt; 2%</p>
        </div>

        <div className="bg-card border border-border p-6 rounded-xl shadow-sm hover:shadow-md motion-safe:transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-secondary font-medium">Active Tenants</span>
            <div className="p-2 bg-warning/10 rounded-lg text-warning"><Users size={18} /></div>
          </div>
          <p className="text-3xl font-bold text-foreground">{metrics.activeTenants}</p>
          <p className="text-sm text-success mt-2 font-medium">+3 this week</p>
        </div>
      </div>
    </div>
  );
}
