// RESPONSIBILITY: Modal for trainers to submit a new leave request.
'use client';

import { useScheduleContext } from '@/app/trainer/schedule/schedule_context/TrainerScheduleContext';
import { useTrainerScheduleStore } from '@/app/trainer/schedule/schedule_store/useTrainerScheduleStore';
import { X, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function TrainerRequestLeaveModal() {
  const { showLeaveModal, setShowLeaveModal, submitLeave } = useScheduleContext();
  const saving = useTrainerScheduleStore(s => s.saving);
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  if (!showLeaveModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate || !reason) return;
    submitLeave({ startDate, endDate, reason });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 motion-safe:transition-opacity" onClick={() => setShowLeaveModal(false)} />
      <div className="fixed right-0 top-0 h-full w-full sm:w-[450px] bg-card border-l border-border shadow-2xl z-50 flex flex-col motion-safe:transition-transform motion-safe:duration-300">
        
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border bg-header">
          <div>
            <h2 className="text-xl font-black text-foreground">Request Leave</h2>
            <p className="text-xs text-secondary mt-1">Submit time off for manager approval</p>
          </div>
          <button onClick={() => setShowLeaveModal(false)} className="p-2 bg-input hover:bg-border text-secondary rounded-full motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 custom-scrollbar">
          <div>
            <label className="block text-sm font-bold text-foreground mb-1.5">Start Date</label>
            <input 
              type="date"
              required
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary motion-safe:transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-foreground mb-1.5">End Date</label>
            <input 
              type="date"
              required
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary motion-safe:transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground mb-1.5">Reason for Leave</label>
            <textarea 
              rows={4}
              required
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="E.g., Medical reasons, family function..."
              className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary motion-safe:transition-all resize-none"
            />
          </div>
        </form>

        <div className="p-4 sm:p-6 border-t border-border bg-header flex justify-end gap-3">
          <button 
            type="button"
            onClick={() => setShowLeaveModal(false)}
            className="px-5 py-2.5 text-sm font-bold text-secondary bg-input hover:bg-border rounded-xl motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            disabled={saving || !startDate || !endDate || !reason}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-primary-foreground bg-primary hover:opacity-90 rounded-xl motion-safe:transition-opacity disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {saving ? <Loader2 size={16} className="motion-safe:animate-spin" /> : null}
            Submit Request
          </button>
        </div>

      </div>
    </>
  );
}
