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
 <div className="flex justify-between p-3 bg-[var(--success-bg)] rounded-lg border border-green-100 ">
 <span className="text-sm text-green-800 dark:text-[var(--success)]">Total Paid</span>
 <span className="font-bold text-[var(--success)] dark:text-[var(--success)]">{formatCurrency(selectedMember.paidAmount)}</span>
 </div>
 <div className="flex justify-between p-3 bg-[var(--danger-bg)] dark:bg-[var(--danger-bg)] rounded-lg border border-red-100 ">
 <span className="text-sm text-red-800 dark:text-[var(--danger)]">Pending Amount</span>
 <span className="font-bold text-[var(--danger)] dark:text-[var(--danger)]">{formatCurrency(selectedMember.pendingAmount)}</span>
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
