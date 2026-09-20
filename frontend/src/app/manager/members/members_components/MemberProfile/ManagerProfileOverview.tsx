// RESPONSIBILITY: Contains logic, types, or component definition for this module.
'use client';
import React, { useState } from 'react';
import { MessageCircle, Mail, Snowflake, Stethoscope, Ban, UserCheck } from 'lucide-react';
import { formatCurrencyFromMinorUnits } from '@/lib/formatters';
import ManagerSearchableDropdown from '@/app/manager/manager_components/ManagerShared/ManagerSearchableDropdown';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
import { useManagerMembersLogic } from '@/app/manager/members/members_hooks/ManagerUseManagerMembersLogic';
import { useFetchTrainers } from '@/app/manager/members/members_hooks/ManagerUseManagerMembersQueries';


export default function ManagerProfileOverview() {
  const { selectedMember, openMsg, freezeMember, toggleSuspend, assignTrainer } = useManagerMembersLogic();
  const { data: trainersData } = useFetchTrainers();
  const trainers = (trainersData || []) as Array<{ id: string; name: string; role?: string }>;
  const [isAssigningTrainer, setIsAssigningTrainer] = useState(false);
  const [selectedTrainerId, setSelectedTrainerId] = useState('');
  const [isPT, setIsPT] = useState(false);

 if (!selectedMember) return null;

  const totalAmount = (selectedMember.paidAmount || 0) + (selectedMember.pendingAmount || 0);
  const dues = selectedMember.pendingAmount > 0 ? selectedMember.pendingAmount : 0;
  const advance = selectedMember.advanceAmount || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wider opacity-80">Member Summary</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex flex-col p-4 bg-page rounded-xl border border-border shadow-card">
              <span className="text-xs text-secondary font-medium mb-1">Total Plan Amount</span>
              <span className="text-lg font-bold text-primary">{formatCurrencyFromMinorUnits(totalAmount, ManagerEnvConfig.currencyCode)}</span>
            </div>
            <div className="flex flex-col p-4 bg-success-bg rounded-xl border border-success shadow-card">
              <span className="text-xs text-success font-medium mb-1">Total Paid</span>
              <span className="text-lg font-bold text-success">{formatCurrencyFromMinorUnits(selectedMember.paidAmount || 0, ManagerEnvConfig.currencyCode)}</span>
            </div>
            {dues > 0 && (
              <div className="flex flex-col p-4 bg-danger-bg rounded-xl border border-border shadow-card">
                <span className="text-xs text-danger font-medium mb-1">Pending Dues</span>
                <span className="text-lg font-bold text-danger">{formatCurrencyFromMinorUnits(dues, ManagerEnvConfig.currencyCode)}</span>
              </div>
            )}
            {advance > 0 && (
              <div className="flex flex-col p-4 bg-primary-subtle rounded-xl border border-border shadow-card">
                <span className="text-xs text-primary font-medium mb-1">Advance Payment</span>
                <span className="text-lg font-bold text-primary">{formatCurrencyFromMinorUnits(advance, ManagerEnvConfig.currencyCode)}</span>
              </div>
            )}
            {selectedMember.assignedTrainerId && (
              <div className="flex flex-col p-4 bg-page rounded-xl border border-border shadow-card">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-secondary font-medium">Assigned Trainer</span>
                  <UserCheck size={18} className="text-primary" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-primary truncate">{selectedMember.assignedTrainerName}</span>
                  {selectedMember.isPT && (
                    <span className="text-xs font-semibold px-1.5 py-0.5 bg-primary-subtle text-primary rounded-full border border-border shrink-0">
                      PT
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {selectedMember.medicalHistory && (
            <div className="flex flex-col gap-2 p-4 bg-warning-bg rounded-xl border border-warning shadow-card">
              <div className="flex items-center gap-2 text-warning">
                <Stethoscope size={18} />
                <span className="text-xs font-semibold uppercase tracking-wider">Medical History / Notes</span>
              </div>
              <p className="text-sm text-primary leading-relaxed">
                {selectedMember.medicalHistory}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wider opacity-80">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3 mb-5">
            <button 
              onClick={() => openMsg(selectedMember, 'whatsapp')} 
              className="flex items-center justify-center gap-2 p-3 text-sm font-semibold text-on-success rounded-xl motion-safe:transition-all motion-safe:hover:-translate-y-0.5 hover:shadow-card bg-success" 
            >
              <MessageCircle size={18} /> WhatsApp
            </button>
            <button 
              onClick={() => openMsg(selectedMember, 'email')} 
              className="flex items-center justify-center gap-2 p-3 text-sm font-semibold text-on-info rounded-xl motion-safe:transition-all motion-safe:hover:-translate-y-0.5 hover:shadow-card bg-info" 
            >
              <Mail size={18} /> Email
            </button>
            {selectedMember.status !== 'FROZEN' ? (
              <button 
                onClick={() => freezeMember(true)} 
                className="flex items-center justify-center gap-2 p-3 text-sm font-semibold text-on-info bg-info border border-info rounded-xl motion-safe:transition-all motion-safe:hover:-translate-y-0.5 hover:shadow-card" 
              >
                <Snowflake size={18} /> Freeze
              </button>
            ) : (
              <button 
                onClick={() => freezeMember(false)} 
                className="flex items-center justify-center gap-2 p-3 text-sm font-semibold text-on-success bg-success border border-success rounded-xl motion-safe:transition-all motion-safe:hover:-translate-y-0.5 hover:shadow-card" 
              >
                Unfreeze
              </button>
            )}
            {selectedMember.status !== 'SUSPENDED' && selectedMember.pendingAmount > 0 ? (
              <button 
                onClick={() => toggleSuspend(true)} 
                className="flex items-center justify-center gap-2 p-3 text-sm font-semibold text-on-danger bg-danger border border-danger rounded-xl motion-safe:transition-all motion-safe:hover:-translate-y-0.5 hover:shadow-card" 
              >
                <Ban size={18} /> Suspend
              </button>
            ) : selectedMember.status === 'SUSPENDED' ? (
              <button 
                onClick={() => toggleSuspend(false)} 
                className="flex items-center justify-center gap-2 p-3 text-sm font-semibold text-on-success bg-success border border-success rounded-xl motion-safe:transition-all motion-safe:hover:-translate-y-0.5 hover:shadow-card" 
              >
                Unsuspend
              </button>
            ) : null}

            {trainers.length > 0 ? (
              !isAssigningTrainer ? (
                <button 
                  onClick={() => setIsAssigningTrainer(true)}
                  className="flex items-center justify-center gap-2 p-3 text-sm font-semibold text-primary bg-primary-subtle border border-border rounded-xl motion-safe:transition-all motion-safe:hover:-translate-y-0.5 hover:shadow-card"
                >
                  <UserCheck size={18} /> Assign Trainer
                </button>
              ) : (
                <div className="col-span-2 flex flex-col gap-3 p-4 bg-page border border-border rounded-xl shadow-card">
                  <ManagerSearchableDropdown
                    value={selectedTrainerId}
                    onChange={(value) => setSelectedTrainerId(String(value))}
                    options={trainers.map((trainer) => ({ value: trainer.id, label: `${trainer.name}${trainer.role ? ` (${trainer.role})` : ''}` }))}
                    placeholder="Select trainer"
                  />
                  <label className="flex items-center gap-2 text-sm text-primary cursor-pointer">
                    <input type="checkbox" checked={isPT} onChange={e => setIsPT(e.target.checked)} className="rounded border-border text-primary focus-visible:ring-primary w-4 h-4" />
                    Personal Training (PT)
                  </label>
                  <div className="flex gap-3 mt-1">
                    <button 
                      onClick={() => {
                        if(selectedTrainerId) {
                          const t = trainers.find((x) => x.id === selectedTrainerId);
                          if(t) assignTrainer(selectedMember.id, t.id, t.name, isPT);
                          setIsAssigningTrainer(false);
                        }
                      }}
                      className="flex-1 p-2.5 bg-primary text-on-primary text-sm font-semibold rounded-xl hover:opacity-90 motion-safe:transition-opacity shadow-card"
                    >
                      Save Changes
                    </button>
                    <button 
                      onClick={() => setIsAssigningTrainer(false)}
                      className="flex-1 p-2.5 bg-input text-secondary text-sm font-semibold rounded-xl hover:bg-input motion-safe:transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )
            ) : (
              <button disabled className="flex items-center justify-center gap-2 p-3 text-sm font-semibold text-secondary bg-surface-highlight border border-border rounded-xl motion-safe:transition-colors">
                No trainers found
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
 );
}
