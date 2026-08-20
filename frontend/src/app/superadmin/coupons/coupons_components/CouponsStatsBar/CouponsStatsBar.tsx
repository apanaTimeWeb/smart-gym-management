'use client';
// RESPONSIBILITY: Renders the KPI stat cards (Active Coupons, Total Redeemed) for the Coupons page. Purely presentational — receives data via props.
import { Tag } from 'lucide-react';
interface CouponsStatsBarProps {
  activeCoupons: number;
  totalRedeemed: number;
}

export default function CouponsStatsBar({ activeCoupons, totalRedeemed }: CouponsStatsBarProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-card border border-border rounded-xl p-5 flex flex-col justify-center hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-in-out">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Tag className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xs font-medium text-secondary uppercase tracking-wider">Active Coupons</span>
        </div>
        <div className="text-3xl font-bold text-foreground mt-1">{activeCoupons}</div>
      </div>
      <div className="bg-card border border-border rounded-xl p-5 flex flex-col justify-center hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-in-out">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-success-bg/30 flex items-center justify-center">
            <Tag className="w-5 h-5 text-success" />
          </div>
          <span className="text-xs font-medium text-secondary uppercase tracking-wider">Total Redeemed</span>
        </div>
        <div className="text-3xl font-bold text-foreground mt-1">{totalRedeemed.toLocaleString()}</div>
      </div>
    </div>
  );
}
