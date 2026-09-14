'use client';
// RESPONSIBILITY: Root client component for Trainer Sessions. Renders session list, filter toolbar, schedule modal, and edit/attendance modals.
// DATA FLOW: page.tsx (Server) → TrainerSessionsMain (Client) → useTrainerSessionsLogic → TrainerSessionsApi
import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, User, CheckCircle, XCircle, Plus, X, Loader2, Pencil } from 'lucide-react';
import type { TrainerSession, CreateSessionDto } from '@/app/trainer/sessions/sessions_types/TrainerSessionsTypes';
import {
  SESSION_FILTER_OPTIONS,
  SESSION_STATUS_STYLES,
  SESSION_TYPE_STYLES,
} from '@/app/trainer/sessions/sessions_utils/TrainerSessionsSharedConstants';
import { useTrainerSessionsFilters } from '@/app/trainer/sessions/sessions_utils/useTrainerSessionsFilters';
import { useTrainerSessionsQuery } from '@/app/trainer/sessions/sessions_queries/useTrainerSessionsQuery';
import { useTrainerSessionMutations } from '@/app/trainer/sessions/sessions_queries/useTrainerSessionMutations';
import { useMembersBasicQuery } from '@/app/trainer/sessions/sessions_queries/useTrainerSessionsQuery';
import { useConfirm } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerConfirmProvider';
import TrainerSessionAttendanceModal from '@/app/trainer/sessions/sessions_components/TrainerSessionAttendanceModal/TrainerSessionAttendanceModal';
import TrainerSessionsEditModal from '@/app/trainer/sessions/sessions_components/TrainerSessionsEditModal/TrainerSessionsEditModal';
import TrainerSessionsKPIs from '@/app/trainer/sessions/sessions_components/TrainerSessionsKPIs/TrainerSessionsKPIs';
import TrainerSessionsScheduleModal from '@/app/trainer/sessions/sessions_components/TrainerSessionsScheduleModal/TrainerSessionsScheduleModal';

export default function TrainerSessionsMain() {
  const { filter, setFilter, date, setDate } = useTrainerSessionsFilters();
  const { data: sessions = [], isLoading, isError } = useTrainerSessionsQuery(date);
  const { data: memberOptionsRaw = [] } = useMembersBasicQuery();
  const memberOptions = memberOptionsRaw.map(m => ({ value: m.id, label: m.name }));
  const { createSession, cancelSession, markAttendance } = useTrainerSessionMutations();
  const { confirm } = useConfirm();

  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [attendanceSession, setAttendanceSession] = useState<TrainerSession | null>(null);
  const [editingSession, setEditingSession] = useState<TrainerSession | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const clearToast = () => setToast(null);
  const showToast = (message: string, type: 'success' | 'error') => setToast({ message, type });

  const filteredSessions: TrainerSession[] = sessions.filter(
    (s) => filter === 'All' || s.type === filter
  );

  const handleAttendanceSubmit = async (sessionId: string, attendedMemberIds: string[]) => {
    try {
      await markAttendance.mutateAsync({ id: sessionId, memberIds: attendedMemberIds });
      setAttendanceSession(null);
      showToast('Attendance marked successfully', 'success');
    } catch {
      showToast('Failed to mark attendance', 'error');
    }
  };

  const handleCancelSession = async (sessionId: string) => {
    const ok = await confirm({
      title: 'Cancel Session',
      message: 'Are you sure you want to cancel this session? This action cannot be undone.',
      type: 'danger',
      confirmText: 'Cancel Session',
    });
    if (!ok) return;
    try {
      await cancelSession.mutateAsync(sessionId);
      showToast('Session cancelled', 'success');
    } catch (err) {
      showToast((err as Error).message ?? 'Failed to cancel session', 'error');
    }
  };

  const handleScheduleSubmit = async (dto: CreateSessionDto) => {
    try {
      await createSession.mutateAsync(dto);
      setShowScheduleModal(false);
      showToast('Session scheduled successfully', 'success');
    } catch (err) {
      showToast((err as Error).message ?? 'Failed to schedule session', 'error');
    }
  };

  return (
    <div className="min-h-full pb-10">
      {/* Toast notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-semibold motion-safe:animate-in fade-in slide-in-from-top-2 ${
            toast.type === 'success' ? 'bg-success text-white' : 'bg-danger text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>{toast.message}</span>
            <button onClick={clearToast} className="ml-2 opacity-70 hover:opacity-100" aria-label="Dismiss">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      <div className="p-6 space-y-6">
        <TrainerSessionsKPIs sessions={sessions} />
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
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="motion-safe:animate-spin text-primary" />
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-danger">Failed to load sessions. Please try again.</p>
          </div>
        ) : (
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
                        onClick={() => setEditingSession(session)}
                        className="flex items-center gap-1 text-sm font-semibold text-secondary hover:text-foreground hover:underline motion-safe:transition-colors"
                        aria-label={`Edit session ${session.title}`}
                      >
                        <Pencil size={13} /> Edit
                      </button>
                      <button
                        onClick={() => handleCancelSession(session.id)}
                        className="text-sm font-semibold text-danger hover:text-danger/80 hover:underline motion-safe:transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => setAttendanceSession(session)}
                        className="text-sm font-medium text-white bg-primary px-4 py-2 rounded-xl hover:bg-primary/90 motion-safe:transition-colors"
                      >
                        Mark Attendance
                      </button>
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
        )}
      </div>

      {showScheduleModal && (
        <TrainerSessionsScheduleModal
          onClose={() => setShowScheduleModal(false)}
          onSubmit={handleScheduleSubmit}
          memberOptions={memberOptions}
          isSubmitting={createSession.isPending}
        />
      )}

      {/* Attendance Modal */}
      {attendanceSession && (
        <TrainerSessionAttendanceModal
          session={attendanceSession}
          onClose={() => setAttendanceSession(null)}
          onSubmit={handleAttendanceSubmit}
        />
      )}

      {editingSession && (
        <TrainerSessionsEditModal
          session={editingSession}
          onClose={() => setEditingSession(null)}
          onSuccess={() => {
            setEditingSession(null);
            showToast('Session updated successfully', 'success');
          }}
        />
      )}
    </div>
  );
}
