'use client';

import { useState, useEffect } from 'react';
import { usageMetersApi } from './usage-meters_api/usage-meters_api';
import type { UsageMeter } from './usage-meters_types/usage-meters_types';
import { BarChart2, HardDrive, MessageSquare, Users } from 'lucide-react';

export default function UsageMetersClient() {
  const [meters, setMeters] = useState<UsageMeter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    usageMetersApi.getAll().then(res => {
      if (res.success && res.data) {
        setMeters(res.data);
      }
      setLoading(false);
    });
  }, []);

  const getProgressColor = (used: number, limit: number) => {
    const percent = (used / limit) * 100;
    if (percent > 90) return 'bg-danger';
    if (percent > 75) return 'bg-warning';
    return 'bg-success';
  };

  const getPercentage = (used: number, limit: number) => {
    return Math.min(100, (used / limit) * 100).toFixed(1);
  };

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-32 bg-card motion-safe:animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Usage Meters</h1>
          <p className="text-secondary mt-1">Monitor tenant resource consumption and billing limits.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {meters.map(meter => (
          <div key={meter.id} className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-primary mb-4 truncate" title={meter.tenantName}>{meter.tenantName}</h3>
            
            <div className="space-y-5">
              {/* SMS Meter */}
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="flex items-center gap-1.5 text-secondary font-medium">
                    <MessageSquare size={14} /> SMS Sent
                  </span>
                  <span className="text-foreground font-semibold">{meter.smsSent} / {meter.smsLimit}</span>
                </div>
                <div className="h-2 w-full bg-input rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${getProgressColor(meter.smsSent, meter.smsLimit)}`} 
                    style={{ width: `${getPercentage(meter.smsSent, meter.smsLimit)}%` }}
                  />
                </div>
              </div>

              {/* Storage Meter */}
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="flex items-center gap-1.5 text-secondary font-medium">
                    <HardDrive size={14} /> Storage (GB)
                  </span>
                  <span className="text-foreground font-semibold">{meter.storageGb} / {meter.storageLimitGb}</span>
                </div>
                <div className="h-2 w-full bg-input rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${getProgressColor(meter.storageGb, meter.storageLimitGb)}`} 
                    style={{ width: `${getPercentage(meter.storageGb, meter.storageLimitGb)}%` }}
                  />
                </div>
              </div>

              {/* Members Meter */}
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="flex items-center gap-1.5 text-secondary font-medium">
                    <Users size={14} /> Active Members
                  </span>
                  <span className="text-foreground font-semibold">{meter.activeMembers} / {meter.memberLimit}</span>
                </div>
                <div className="h-2 w-full bg-input rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${getProgressColor(meter.activeMembers, meter.memberLimit)}`} 
                    style={{ width: `${getPercentage(meter.activeMembers, meter.memberLimit)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-border flex justify-between items-center text-xs text-secondary">
              <span>Billing Cycle Ends:</span>
              <span className="font-semibold text-foreground">{meter.billingCycleEnd}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
