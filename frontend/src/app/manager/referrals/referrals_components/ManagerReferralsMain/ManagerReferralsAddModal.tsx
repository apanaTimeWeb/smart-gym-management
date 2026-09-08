// RESPONSIBILITY: Modal for adding a new referral manually.
'use client';

import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useManagerReferralsLogic } from '@/app/manager/referrals/referrals_context/useManagerReferralsLogic';

export default function ManagerReferralsAddModal() {
  const { isAddModalOpen, setIsAddModalOpen, createReferral, isCreating } = useManagerReferralsLogic();
  
  const [referrerName, setReferrerName] = useState('');
  const [referrerId, setReferrerId] = useState('');
  const [refereeName, setRefereeName] = useState('');
  const [refereePhone, setRefereePhone] = useState('');

  if (!isAddModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createReferral({ referrerName, referrerId, refereeName, refereePhone });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-overlay backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in">
      <div className="bg-card border border-border w-full max-w-md rounded-xl shadow-lg flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-input/10">
          <h2 className="text-lg font-bold text-foreground">Log New Referral</h2>
          <button 
            onClick={() => setIsAddModalOpen(false)}
            className="p-1 text-secondary hover:text-foreground rounded-md motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 overflow-y-auto">
          <form id="referral-form" onSubmit={handleSubmit} className="space-y-4">
            
            <div className="bg-input/20 p-3 rounded-lg border border-border space-y-3">
              <h3 className="text-xs font-bold text-secondary uppercase tracking-wider">Referrer (Existing Member)</h3>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Member Name *</label>
                <input 
                  type="text" 
                  required
                  value={referrerName}
                  onChange={(e) => setReferrerName(e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" 
                  placeholder="e.g. Arjun Sharma"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Member ID *</label>
                <input 
                  type="text" 
                  required
                  value={referrerId}
                  onChange={(e) => setReferrerId(e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" 
                  placeholder="e.g. M001"
                />
              </div>
            </div>

            <div className="bg-input/20 p-3 rounded-lg border border-border space-y-3">
              <h3 className="text-xs font-bold text-secondary uppercase tracking-wider">Referee (New Lead)</h3>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Lead Name *</label>
                <input 
                  type="text" 
                  required
                  value={refereeName}
                  onChange={(e) => setRefereeName(e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" 
                  placeholder="e.g. Vikram Singh"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Phone Number *</label>
                <input 
                  type="tel" 
                  required
                  value={refereePhone}
                  onChange={(e) => setRefereePhone(e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" 
                  placeholder="e.g. 9876543210"
                />
              </div>
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-input/10 flex justify-end gap-2 shrink-0">
          <button 
            type="button"
            onClick={() => setIsAddModalOpen(false)}
            className="px-4 py-2 text-sm font-medium text-secondary hover:text-foreground motion-safe:transition-colors focus-visible:outline-none"
          >
            Cancel
          </button>
          <button 
            type="submit"
            form="referral-form"
            disabled={isCreating}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg text-sm font-bold hover:bg-primary-hover motion-safe:transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background"
          >
            {isCreating ? <Loader2 size={16} className="motion-safe:animate-spin" /> : 'Save Referral'}
          </button>
        </div>

      </div>
    </div>
  );
}
