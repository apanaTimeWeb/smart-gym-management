'use client';

import { useState } from 'react';
import { X, Loader2, Check, Users } from 'lucide-react';
import type { TrainerSession } from '@/app/trainer/sessions/sessions_types/TrainerSessionsTypes';

export interface TrainerSessionAttendanceModalProps {
  session: TrainerSession;
  onClose: () => void;
  onSubmit: (sessionId: string, attendedMemberIds: string[]) => Promise<void>;
}

export default function TrainerSessionAttendanceModal({
  session,
  onClose,
  onSubmit,
}: TrainerSessionAttendanceModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attendedIds, setAttendedIds] = useState<Set<string>>(
    new Set(session.enrolledMembers?.map(m => m.id) || [])
  );

  const toggleAttendance = (memberId: string) => {
    const newSet = new Set(attendedIds);
    if (newSet.has(memberId)) {
      newSet.delete(memberId);
    } else {
      newSet.add(memberId);
    }
    setAttendedIds(newSet);
  };

  const handleSelectAll = () => {
    if (session.enrolledMembers) {
      if (attendedIds.size === session.enrolledMembers.length) {
        setAttendedIds(new Set()); // deselect all
      } else {
        setAttendedIds(new Set(session.enrolledMembers.map(m => m.id))); // select all
      }
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit(session.id, Array.from(attendedIds));
    } finally {
      setIsSubmitting(false);
    }
  };

  const members = session.enrolledMembers || [];
  const allSelected = members.length > 0 && attendedIds.size === members.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-card w-full max-w-lg rounded-2xl shadow-2xl border border-border flex flex-col max-h-[90vh] overflow-hidden motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border bg-header">
          <div>
            <h3 className="text-lg font-bold text-foreground">Mark Attendance</h3>
            <p className="text-sm text-secondary mt-0.5">{session.title} — {session.time}</p>
          </div>
          <button
            onClick={onClose}
            className="text-secondary hover:text-foreground hover:bg-input p-1.5 rounded-xl motion-safe:transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto custom-scrollbar flex-1">
          {members.length === 0 ? (
            <div className="text-center py-10">
              <Users size={32} className="mx-auto text-secondary/50 mb-3" />
              <p className="text-sm font-semibold text-foreground">No members enrolled.</p>
              <p className="text-xs text-secondary mt-1">Cannot mark attendance for an empty session.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">
                  Enrolled Members ({members.length})
                </span>
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  {allSelected ? 'Deselect All' : 'Select All'}
                </button>
              </div>

              <div className="grid gap-2">
                {members.map(member => {
                  const isPresent = attendedIds.has(member.id);
                  return (
                    <div
                      key={member.id}
                      onClick={() => toggleAttendance(member.id)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer motion-safe:transition-colors ${
                        isPresent
                          ? 'border-primary/50 bg-primary/5'
                          : 'border-border bg-input hover:border-primary/30'
                      }`}
                    >
                      <span className="text-sm font-medium text-foreground">{member.name}</span>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        isPresent ? 'bg-primary border-primary text-white' : 'border-secondary/50'
                      }`}>
                        {isPresent && <Check size={14} strokeWidth={3} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-border bg-header flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-secondary hover:text-foreground hover:bg-input rounded-xl motion-safe:transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || members.length === 0}
            className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-primary rounded-xl hover:bg-primary-hover motion-safe:transition-colors disabled:opacity-50"
          >
            {isSubmitting && <Loader2 size={16} className="motion-safe:animate-spin" />}
            Save Attendance
          </button>
        </div>
      </div>
    </div>
  );
}
