// RESPONSIBILITY: Root client component for Trainer Sessions. Renders session list, filter toolbar, and schedule modal. No direct API calls.
// DATA FLOW: page.tsx (Server) → TrainerSessionsMain (Client) → session cards
'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, User, CheckCircle, XCircle, Plus, X, Loader2 } from 'lucide-react';
import type { SessionFilter, TrainerSession } from '@/app/trainer/sessions/sessions_types/TrainerSessionsTypes';
import {
  SESSION_FILTER_OPTIONS,
  SESSION_STATUS_STYLES,
  SESSION_TYPE_STYLES,
  MOCK_SESSIONS,
  MOCK_MEMBERS_FOR_SCHEDULE,
  DURATION_OPTIONS,
} from '@/app/trainer/sessions/sessions_utils/TrainerSessionsSharedConstants';
import { SearchableDropdown } from '@/app/trainer/trainer_components/TrainerShared/SearchableDropdown';
import { useConfirm } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerConfirmProvider';
import TrainerSessionAttendanceModal from '@/app/trainer/sessions/sessions_components/TrainerSessionAttendanceModal';
import { markTrainerSessionAttendance } from '@/app/trainer/sessions/sessions_api/TrainerSessionsApi';

export default function TrainerSessionsMain() {
  const [filter, setFilter] = useState<SessionFilter>('All');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0] ?? '');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | number>('');
  const [selectedDuration, setSelectedDuration] = useState<string | number>('60m');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attendanceSession, setAttendanceSession] = useState<TrainerSession | null>(null);
  const { confirm } = useConfirm();

  const filteredSessions: TrainerSession[] = MOCK_SESSIONS.filter(
    (s) => filter === 'All' || s.type === filter
  );

  const memberOptions = MOCK_MEMBERS_FOR_SCHEDULE.map((m) => ({ value: m.id, label: m.name }));
  const durationOptions = DURATION_OPTIONS.map((d) => ({ value: d.value, label: d.label }));

  const handleCancelSession = async (sessionId: string) => {
    const ok = await confirm({
      title: 'Cancel Session',
      message: 'Are you sure you want to cancel this session? This action cannot be undone.',
      type: 'danger',
      confirmText: 'Cancel Session',
    });
    if (!ok) return;
    // TODO: call cancelSession(sessionId) from sessions_api when backend is ready
    void sessionId;
  };

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: call createSession(dto) from sessions_api when backend is ready
    await new Promise((r) => setTimeout(r, 600));
    setIsSubmitting(false);
    setShowScheduleModal(false);
    setSelectedMemberId('');
    setSelectedDuration('60m');
  };

  const handleAttendanceSubmit = async (sessionId: string, attendedMemberIds: string[]) => {
    try {
      await markTrainerSessionAttendance(sessionId, attendedMemberIds);
      // In a real app, refresh the list here
      setAttendanceSession(null);
    } catch (error) {
      console.error('Failed to mark attendance:', error);
      // Add toast notification logic here if needed
    }
  };

  return (
    <div className="min-h-full pb-10">
      <div className="p-6 space-y-6">
        {/* Toolbar */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex bg-input rounded-lg p-1">
            {SESSION_FILTER_OPTIONS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md motion-safe:transition-colors ${
                  filter === f ? 'bg-card text-foreground shadow-sm' : 'text-secondary hover:text-foreground'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <CalendarIcon size={16} className="text-secondary" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-input border border-border text-foreground text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              onClick={() => setShowScheduleModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 motion-safe:transition-opacity ml-auto"
            >
              <Plus size={16} /> Schedule PT
            </button>
          </div>
        </div>

        {/* Sessions List */}
        <div className="grid gap-4">
          {filteredSessions.map((session) => (
            <div
              key={session.id}
              className="bg-card rounded-xl shadow-sm border border-border p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 motion-safe:hover:-translate-y-0.5 motion-safe:transition-transform"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl mt-1 ${SESSION_TYPE_STYLES[session.type]}`}>
                  {session.type === 'PT' ? <User size={24} /> : <Users size={24} />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-foreground text-lg">{session.title}</h3>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${SESSION_TYPE_STYLES[session.type]}`}>
                      {session.type}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-secondary">
                    <span className="flex items-center gap-1.5"><Clock size={14} /> {session.time} ({session.duration})</span>
                    <span>•</span>
                    {session.type === 'PT' ? (
                      <span className="flex items-center gap-1.5"><User size={14} /> {session.member}</span>
                    ) : (
                      <span className="flex items-center gap-1.5"><Users size={14} /> {session.attendees} / {session.maxAttendees} Enrolled</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between md:justify-end gap-4 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t border-border md:border-none">
                {session.status === 'Upcoming' && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowScheduleModal(true)}
                      className="text-sm font-semibold text-secondary hover:text-foreground hover:underline motion-safe:transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleCancelSession(session.id)}
                      className="text-sm font-semibold text-danger hover:text-danger/80 hover:underline motion-safe:transition-colors"
                    >
                      Cancel
                    </button>
                    {session.isOnline && (
                      <button 
                        onClick={() => setAttendanceSession(session)}
                        className="text-sm font-medium text-white bg-primary px-4 py-2 rounded-xl hover:bg-primary/90 motion-safe:transition-colors"
                      >
                        Mark Attendance
                      </button>
                    )}
                  </div>
                )}
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${SESSION_STATUS_STYLES[session.status]}`}>
                  {session.status === 'Completed' && <CheckCircle size={12} />}
                  {session.status === 'Cancelled' && <XCircle size={12} />}
                  {session.status}
                </span>
              </div>
            </div>
          ))}

          {filteredSessions.length === 0 && (
            <div className="bg-card rounded-xl border border-border border-dashed p-10 flex flex-col items-center justify-center text-center">
              <CalendarIcon size={48} className="text-secondary opacity-50 mb-4" />
              <h3 className="text-lg font-bold text-foreground">No sessions found</h3>
              <p className="text-secondary mt-1">You have no scheduled sessions for this day.</p>
            </div>
          )}
        </div>
      </div>

      {/* Schedule PT Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-overlay w-full max-w-md rounded-2xl shadow-2xl border border-border overflow-hidden motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-200">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="text-lg font-bold text-foreground">Schedule PT Session</h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-secondary hover:text-foreground hover:bg-input p-1 rounded-lg motion-safe:transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleScheduleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-secondary mb-1">Select Member</label>
                <SearchableDropdown
                  options={memberOptions}
                  value={selectedMemberId}
                  onChange={setSelectedMemberId}
                  placeholder="-- Choose Member --"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-secondary mb-1">Date</label>
                  <input
                    type="date"
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-secondary mb-1">Time</label>
                  <input
                    type="time"
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-secondary mb-1">Duration</label>
                <SearchableDropdown
                  options={durationOptions}
                  value={selectedDuration}
                  onChange={setSelectedDuration}
                  placeholder="Select duration"
                />
              </div>
              <div className="pt-4 flex justify-end gap-2 border-t border-border mt-4">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 text-sm font-semibold text-secondary hover:text-foreground hover:bg-input rounded-lg motion-safe:transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 motion-safe:transition-colors disabled:opacity-70"
                >
                  {isSubmitting && <Loader2 size={16} className="motion-safe:animate-spin" />}
                  Confirm Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Attendance Modal */}
      {attendanceSession && (
        <TrainerSessionAttendanceModal
          session={attendanceSession}
          onClose={() => setAttendanceSession(null)}
          onSubmit={handleAttendanceSubmit}
        />
      )}
    </div>
  );
}
