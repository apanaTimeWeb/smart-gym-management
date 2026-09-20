'use client';
import React, { useState } from 'react';
import { Layers } from 'lucide-react';
import toast from 'react-hot-toast';

const FEATURES_LIST = [
  { id: 'hr', name: 'HR Module' },
  { id: 'payroll', name: 'Payroll & Payouts' },
  { id: 'custom_domain', name: 'Custom Domain' },
  { id: 'whitelabel', name: 'White-labeling' },
  { id: 'analytics', name: 'Advanced Analytics' },
  { id: 'franchise', name: 'Franchise Management' }
];

const TIERS = [
  { id: 'basic', name: 'Basic' },
  { id: 'pro', name: 'Pro' },
  { id: 'enterprise', name: 'Enterprise' }
];

export default function SuperadminFeaturesTierMatrix() {
  const [tierMatrix, setTierMatrix] = useState<Record<string, Record<string, boolean>>>({
    hr: { basic: false, pro: true, enterprise: true },
    payroll: { basic: false, pro: true, enterprise: true },
    custom_domain: { basic: false, pro: false, enterprise: true },
    whitelabel: { basic: false, pro: false, enterprise: true },
    analytics: { basic: false, pro: true, enterprise: true },
    franchise: { basic: false, pro: false, enterprise: true }
  });

  const handleToggle = (featureId: string, tierId: string) => {
    setTierMatrix(prev => {
      const next = { ...prev };
      const currentFeature = next[featureId] || {};
      next[featureId] = { ...currentFeature, [tierId]: !currentFeature[tierId] };
      return next;
    });
    toast.success('Tier configuration updated', { id: `tier-update-${featureId}-${tierId}` });
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <Layers className="text-primary" /> Global Feature Tiering
          </h2>
          <p className="text-sm text-secondary mt-1">Gate access to premium features based on SaaS subscriptions.</p>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-input border-b border-border">
              <th className="p-4 text-sm font-semibold text-primary">Feature</th>
              {TIERS.map(tier => (
                <th key={tier.id} className="p-4 text-sm font-semibold text-primary text-center">
                  {tier.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {FEATURES_LIST.map(feature => (
              <tr key={feature.id} className="hover:bg-input/50 motion-safe:transition-colors">
                <td className="p-4 text-sm font-medium text-primary border-r border-border/50">
                  {feature.name}
                </td>
                {TIERS.map(tier => (
                  <td key={tier.id} className="p-4 text-center border-r border-border/50 last:border-r-0">
                    <label className="inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="rounded border-border text-primary focus:ring-primary w-5 h-5"
                        checked={tierMatrix[feature.id]?.[tier.id] || false}
                        onChange={() => handleToggle(feature.id, tier.id)}
                      />
                    </label>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
