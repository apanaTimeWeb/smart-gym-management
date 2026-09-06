// RESPONSIBILITY: Contains logic, types, or component definition for this module.
'use client';

// RESPONSIBILITY: Contains logic, types, or component definition for this module.
'use client';

import React, { useState } from 'react';
import { MessageCircle, Mail, Snowflake, Stethoscope, Ban, UserCheck } from 'lucide-react';
import { useMembersContext } from '@/app/manager/members/members_context/ManagerMembersContext';
import { formatCurrency } from '@/app/manager/members/members_utils/ManagerMembersSharedConstants';

export default function ManagerProfileOverview() {
  const { selectedMember, openMsg, freezeMember, toggleSuspend, trainers, assignTrainer } = useMembersContext();
  const [isAssigningTrainer, setIsAssigningTrainer] = useState(false);
  const [selectedTrainerId, setSelectedTrainerId] = useState('');
  const [isPT, setIsPT] = useState(false);

 if (!selectedMember) return null;

  const totalAmount = (selectedMember.paidAmount || 0) + (selectedMember.pendingAmount || 0);
  const dues = selectedMember.pendingAmount > 0 ? selectedMember.pendingAmount : 0;
  const advance = selectedMember.advanceAmount || 0;

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
              <span className="text-sm text-danger">Pending Dues</span>
              <span className="font-bold text-danger">{formatCurrency(dues)}</span>
            </div>
          )}
          {advance > 0 && (
            <div className="flex justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
              <span className="text-sm text-primary">Advance Payment</span>
              <span className="font-bold text-primary">{formatCurrency(advance)}</span>
            </div>
          )}
        </div>
          {selectedMember.assignedTrainerId && (
            <div className="flex flex-col gap-1 p-3 bg-secondary/5 rounded-lg border border-border mt-2">
              <span className="text-sm font-semibold text-foreground flex items-center gap-1.5"><UserCheck size={14}/> Assigned Trainer</span>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground opacity-90">{selectedMember.assignedTrainerName}</span>
                {selectedMember.isPT && <span className="text-xs font-semibold px-2 py-0.5 bg-primary/20 text-primary rounded-full">Personal Training</span>}
              </div>
            </div>
          )}
          {selectedMember.medicalHistory && (
            <div className="flex flex-col gap-1 p-3 bg-warning-bg rounded-lg border border-warning/20 mt-2">
              <span className="text-sm font-semibold text-warning flex items-center gap-1.5"><Stethoscope size={14}/> Medical History / Notes</span>
              <span className="text-sm text-foreground opacity-90">{selectedMember.medicalHistory}</span>
            </div>
          )}
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
  {selectedMember.status !== 'FROZEN' ? (
    <button 
    onClick={() => freezeMember(true)} 
    className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-info bg-info-bg border border-info/30 rounded-xl justify-center transition-opacity hover:opacity-90" 
    >
    <Snowflake size={14} /> Freeze Membership
    </button>
  ) : (
    <button 
    onClick={() => freezeMember(false)} 
    className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-success bg-success-bg border border-success/30 rounded-xl justify-center transition-opacity hover:opacity-90" 
    >
    Unfreeze Membership
    </button>
  )}
  {selectedMember.status !== 'SUSPENDED' && selectedMember.pendingAmount > 0 ? (
    <button 
    onClick={() => toggleSuspend(true)} 
    className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-danger bg-danger-bg border border-danger/30 rounded-xl justify-center transition-opacity hover:opacity-90" 
    >
    <Ban size={14} /> Suspend Member
    </button>
  ) : selectedMember.status === 'SUSPENDED' ? (
    <button 
    onClick={() => toggleSuspend(false)} 
    className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-success bg-success-bg border border-success/30 rounded-xl justify-center transition-opacity hover:opacity-90" 
    >
    Unsuspend Member
    </button>
  ) : null}
  {trainers.length > 0 && (
    <div className="mt-4 pt-4 border-t border-border">
      <h4 className="text-sm font-semibold mb-2">Assign Trainer</h4>
      {!isAssigningTrainer ? (
        <button 
          onClick={() => setIsAssigningTrainer(true)}
          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-primary bg-primary-subtle border border-primary/30 rounded-xl justify-center transition-opacity hover:opacity-90"
        >
          <UserCheck size={14} /> Assign New Trainer
        </button>
      ) : (
        <div className="flex flex-col gap-2 p-3 bg-secondary/5 rounded-lg border border-border">
          <select 
            value={selectedTrainerId} 
            onChange={(e) => setSelectedTrainerId(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
          >
            <option value="">Select Trainer</option>
            {trainers.map(t => (
              <option key={t.id} value={t.id}>{t.name} ({t.role})</option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
            <input type="checkbox" checked={isPT} onChange={e => setIsPT(e.target.checked)} className="rounded border-border text-primary focus:ring-primary" />
            Personal Training (PT)
          </label>
          <div className="flex gap-2 mt-1">
            <button 
              onClick={() => {
                if(selectedTrainerId) {
                  const t = trainers.find(x => x.id === selectedTrainerId);
                  if(t) assignTrainer(selectedMember.id, t.id, t.name, isPT);
                  setIsAssigningTrainer(false);
                }
              }}
              className="flex-1 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90"
            >
              Save
            </button>
            <button 
              onClick={() => setIsAssigningTrainer(false)}
              className="flex-1 py-2 bg-secondary/10 text-secondary text-sm font-semibold rounded-lg hover:opacity-90"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )}
 </div>
 </div>
 </div>
 );
}
