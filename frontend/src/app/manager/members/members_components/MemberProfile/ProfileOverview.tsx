// RESPONSIBILITY: Contains logic, types, or component definition for this module.
'use client';

import { MessageCircle, Mail } from 'lucide-react';
import { useMembersContext } from '@/app/manager/members/members_context/MembersContext';
import { formatCurrency } from '@/app/manager/members/members_utils/MembersSharedConstants';

export default function ProfileOverview() {
 const { selectedMember, openMsg } = useMembersContext();

 if (!selectedMember) return null;

  const totalAmount = (selectedMember.paidAmount || 0) + (selectedMember.pendingAmount || 0);
  const dues = selectedMember.pendingAmount > 0 ? selectedMember.pendingAmount : 0;
  const advance = selectedMember.pendingAmount < 0 ? Math.abs(selectedMember.pendingAmount) : 0;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      <div>
        <h3 className="font-semibold text-foreground mb-3">Member Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between p-3 bg-secondary/5 rounded-lg border border-border">
            <span className="text-sm text-secondary">Total Plan Amount</span>
            <span className="font-bold text-foreground">{formatCurrency(totalAmount)}</span>
          </div>
          <div className="flex justify-between p-3 bg-success-bg rounded-lg border border-success/20">
            <span className="text-sm text-success">Total Paid</span>
            <span className="font-bold text-success">{formatCurrency(selectedMember.paidAmount || 0)}</span>
          </div>
          {dues > 0 && (
            <div className="flex justify-between p-3 bg-danger-bg rounded-lg border border-destructive/20">
              <span className="text-sm text-destructive">Pending Dues</span>
              <span className="font-bold text-destructive">{formatCurrency(dues)}</span>
            </div>
          )}
          {advance > 0 && (
            <div className="flex justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
              <span className="text-sm text-primary">Advance Payment</span>
              <span className="font-bold text-primary">{formatCurrency(advance)}</span>
            </div>
          )}
        </div>
      </div>
 <div>
 <h3 className="font-semibold text-foreground mb-3">Quick Actions</h3>
 <div className="flex flex-col gap-2">
 <button 
 onClick={() => openMsg(selectedMember, 'whatsapp')} 
 className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl justify-center transition-opacity hover:opacity-90 bg-success" 
 >
 <MessageCircle size={14} /> Send WhatsApp
 </button>
 <button 
 onClick={() => openMsg(selectedMember, 'email')} 
 className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl justify-center transition-opacity hover:opacity-90 bg-info" 
 >
 <Mail size={14} /> Send Email
 </button>
 </div>
 </div>
 </div>
 );
}

