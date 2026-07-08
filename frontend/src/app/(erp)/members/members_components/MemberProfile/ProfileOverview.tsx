"use client";

import { MessageCircle, Mail } from 'lucide-react';
import { useMembersContext } from '../../members_context/MembersContext';
import { formatCurrency } from '../../members_utils/MembersSharedConstants';

export default function ProfileOverview() {
  const { selectedMember, openMsg } = useMembersContext();

  if (!selectedMember) return null;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      <div>
        <h3 className="font-semibold text-[var(--members-text-primary)] mb-3">Member Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-100 dark:border-green-900/50">
            <span className="text-sm text-green-800 dark:text-green-400">Total Paid</span>
            <span className="font-bold text-green-600 dark:text-green-500">{formatCurrency(selectedMember.paidAmount)}</span>
          </div>
          <div className="flex justify-between p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-100 dark:border-red-900/50">
            <span className="text-sm text-red-800 dark:text-red-400">Pending Amount</span>
            <span className="font-bold text-red-600 dark:text-red-500">{formatCurrency(selectedMember.pendingAmount)}</span>
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-[var(--members-text-primary)] mb-3">Quick Actions</h3>
        <div className="flex flex-col gap-2">
          <button 
            onClick={() => openMsg(selectedMember, 'whatsapp')} 
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl justify-center transition-opacity hover:opacity-90" 
            style={{ background: '#25D366' }}
          >
            <MessageCircle size={14} /> Send WhatsApp
          </button>
          <button 
            onClick={() => openMsg(selectedMember, 'email')} 
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl justify-center transition-opacity hover:opacity-90" 
            style={{ background: 'hsl(217 91% 60%)' }}
          >
            <Mail size={14} /> Send Email
          </button>
        </div>
      </div>
    </div>
  );
}
