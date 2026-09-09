import React, { useEffect, useState } from 'react';
import { X, History, TrendingDown } from 'lucide-react';
import type { Coupon, RedemptionRecord } from '@/app/superadmin/coupons/superadmin_coupons_types/superadmin_coupons_types';
import SuperadminCouponsStatusBadge from '@/app/superadmin/coupons/coupons_components/SuperadminCouponsStatusBadge/SuperadminCouponsStatusBadge';

interface SuperadminCouponsRedemptionDrawerProps {
  coupon: Coupon | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function SuperadminCouponsRedemptionDrawer({ coupon, isOpen, onClose }: SuperadminCouponsRedemptionDrawerProps) {
  // Prevent scrolling on body when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !coupon) return null;

  // Mock data if no redemptions present
  const redemptions = coupon.redemptions || [
    { id: '1', tenantName: 'Fitness First', redeemedAt: new Date(Date.now() - 86400000 * 2).toISOString(), planName: 'PRO', discountApplied: coupon.discountType === 'EXACT' ? coupon.discountValue : 5000 },
    { id: '2', tenantName: 'Gold Gym', redeemedAt: new Date(Date.now() - 86400000 * 5).toISOString(), planName: 'ENTERPRISE', discountApplied: coupon.discountType === 'EXACT' ? coupon.discountValue : 8000 },
  ].slice(0, coupon.currentUses);

  const totalDiscount = redemptions.reduce((acc, curr) => acc + curr.discountApplied, 0);

  return (
    <>
      <div 
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in"
        onClick={onClose}
      />
      
      <div 
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-card border-l border-border shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-border bg-card-hover/30">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-bold text-foreground">Redemption History</h2>
              <SuperadminCouponsStatusBadge status={coupon.status} />
            </div>
            <p className="text-sm font-mono text-primary">{coupon.code}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-secondary hover:text-foreground hover:bg-input rounded-full motion-safe:transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-input/50 p-4 rounded-xl border border-border">
              <p className="text-xs text-secondary uppercase tracking-wider mb-1">Total Uses</p>
              <p className="text-2xl font-bold text-foreground">{coupon.currentUses} <span className="text-sm font-normal text-secondary">/ {coupon.maxUses}</span></p>
            </div>
            <div className="bg-input/50 p-4 rounded-xl border border-border">
              <p className="text-xs text-secondary uppercase tracking-wider mb-1">Total Value Given</p>
              <p className="text-2xl font-bold text-success">₹{totalDiscount.toLocaleString('en-IN')}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <History size={16} className="text-primary" /> Recent Redemptions
            </h3>
            
            {redemptions.length > 0 ? (
              <div className="space-y-3">
                {redemptions.map((record) => (
                  <div key={record.id} className="p-4 bg-background border border-border rounded-lg hover:border-primary/50 motion-safe:transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-foreground">{record.tenantName}</p>
                      <p className="text-xs text-secondary">{new Date(record.redeemedAt).toLocaleDateString('en-IN')}</p>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-secondary bg-input px-2 py-0.5 rounded text-xs font-medium">{record.planName} Plan</span>
                      <span className="text-success font-medium flex items-center gap-1">
                        <TrendingDown size={14} /> ₹{record.discountApplied.toLocaleString('en-IN')} saved
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 px-4 border border-dashed border-border rounded-xl">
                <History className="w-8 h-8 text-secondary/30 mx-auto mb-3" />
                <p className="text-foreground font-medium mb-1">No Redemptions Yet</p>
                <p className="text-sm text-secondary">This coupon hasn't been used by any tenant.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
