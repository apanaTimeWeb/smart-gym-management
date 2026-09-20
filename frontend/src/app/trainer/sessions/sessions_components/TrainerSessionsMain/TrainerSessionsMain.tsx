'use client';
// RESPONSIBILITY: Root client component for Trainer Sessions. Renders session list, filter toolbar, schedule modal, and edit/attendance modals.
// DATA FLOW: page.tsx (Server) → TrainerSessionsMain (Client) → useTrainerSessionsLogic → TrainerSessionsApi
import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, User, CheckCircle, XCircle, Plus, Pencil } from 'lucide-react';
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
import { useTrainerFeedback } from '@/app/trainer/trainer_components/TrainerFeedback/useTrainerFeedback';
import TrainerSessionAttendanceModal from '@/app/trainer/sessions/sessions_components/TrainerSessionAttendanceModal/TrainerSessionAttendanceModal';
import TrainerSessionsEditModal from '@/app/trainer/sessions/sessions_components/TrainerSessionsEditModal/TrainerSessionsEditModal';
import TrainerSessionsKPIs from '@/app/trainer/sessions/sessions_components/TrainerSessionsKPIs/TrainerSessionsKPIs';
import TrainerSessionsScheduleModal from '@/app/trainer/sessions/sessions_components/TrainerSessionsScheduleModal/TrainerSessionsScheduleModal';
import TrainerSessionsLoadingSkeleton from '@/app/trainer/sessions/sessions_components/TrainerSessionsLoadingSkeleton/TrainerSessionsLoadingSkeleton';
import TrainerSessionsEmptyState from '@/app/trainer/sessions/sessions_components/TrainerSessionsEmptyState/TrainerSessionsEmptyState';

export default function TrainerSessionsMain() {
  const { filter, setFilter, date, setDate } = useTrainerSessionsFilters();
  const { data: sessions = [], isLoading, isError, refetch } = useTrainerSessionsQuery(date);
  const { data: memberOptionsRaw = [] } = useMembersBasicQuery();
  const memberOptions = memberOptionsRaw.map(m => ({ value: m.id, label: m.name }));
  const { createSession, markNoShowSession, markAttendance } = useTrainerSessionMutations();
  const { confirm } = useConfirm();
  const { showSuccess, showError } = useTrainerFeedback();

  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [attendanceSession, setAttendanceSession] = useState<TrainerSession | null>(null);
  const [editingSession, setEditingSession] = useState<TrainerSession | null>(null);

  const filteredSessions: TrainerSession[] = sessions.filter(
    (s) => filter === 'All' || s.type === filter
  );

  const handleAttendanceSubmit = async (sessionId: string, attendedMemberIds: string[]) => {
    try {
      const response = await markAttendance.mutateAsync({ id: sessionId, memberIds: attendedMemberIds, idempotencyKey: crypto.randomUUID() });
      setAttendanceSession(null);
      showSuccess(response.message, 'trainer-sessions-attendance-success');
    } catch (err) {
      showError(err, 'trainer-sessions-attendance-error');
    }
  };

  const handleNoShowSession = async (sessionId: string) => {
    const ok = await confirm({
      title: 'Mark No Show',
      message: 'Are you sure you want to mark this session as No Show? This action cannot be undone.',
      type: 'danger',
      confirmText: 'Mark No Show',
    });
    if (!ok) return;
    try {
      const response = await markNoShowSession.mutateAsync({ id: sessionId, idempotencyKey: crypto.randomUUID() });
      showSuccess(response.message, 'trainer-sessions-noshow-success');
    } catch (err) {
      showError(err, 'trainer-sessions-noshow-error');
    }
  };

  const handleScheduleSubmit = async (dto: CreateSessionDto) => {
    try {
      const response = await createSession.mutateAsync({ dto, idempotencyKey: crypto.randomUUID() });
      setShowScheduleModal(false);
      showSuccess(response.message, 'trainer-sessions-schedule-success');
    } catch (err) {
      showError(err, 'trainer-sessions-schedule-error');
    }
  };

  return (
    <div className="min-h-full pb-10">
      <div className="p-6 space-y-6">
        <TrainerSessionsKPIs sessions={sessions} />
        {/* Toolbar */}
        <div className="bg-card rounded-xl shadow-card border border-border p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex bg-input rounded-lg p-1">
            {SESSION_FILTER_OPTIONS.map((f) => (
              <button type="button"
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md motion-safe:transition-colors ${
                  filter === f ? 'bg-card text-primary shadow-card' : 'text-secondary hover:text-primary'
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
                className="bg-input border border-border text-primary text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button type="button"
              onClick={() => setShowScheduleModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold hover:opacity-90 motion-safe:transition-opacity ml-auto"
            >
              <Plus size={16} /> Schedule PT
            </button>
          </div>
        </div>

        {/* Sessions List */}
        {isLoading ? (
          <TrainerSessionsLoadingSkeleton />
        ) : isError ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 bg-card rounded-xl border border-border">
            <p className="text-danger">Unable to load sessions right now. Please retry.</p>
            <button type="button" onClick={() => void refetch()} className="px-4 py-2 rounded-lg border border-border text-primary hover:bg-primary-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Retry</button>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredSessions.map((session) => (
              <div
                key={session.id}
                className="bg-card rounded-xl shadow-card border border-border p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 motion-safe:hover:-translate-y-0.5 motion-safe:transition-transform"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl mt-1 ${SESSION_TYPE_STYLES[session.type]}`}>
                    {session.type === 'PT' ? <User size={24} /> : <Users size={24} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-primary text-lg">{session.title}</h3>
                      <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${SESSION_TYPE_STYLES[session.type]}`}>
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
                      <button type="button"
                        onClick={() => setEditingSession(session)}
                        className="flex items-center gap-1 text-sm font-semibold text-secondary hover:text-primary hover:underline motion-safe:transition-colors motion-safe:duration-base"
                        aria-label={`Edit session ${session.title}`}
                      >
                        <Pencil size={13} /> Edit
                      </button>
                      <button type="button"
                        onClick={() => handleNoShowSession(session.id)}
                        className="text-sm font-semibold text-danger hover:text-danger hover:underline motion-safe:transition-colors motion-safe:duration-base"
                      >
                        No Show
                      </button>
                      <button type="button"
                        onClick={() => setAttendanceSession(session)}
                        className="text-sm font-medium text-on-primary bg-primary px-4 py-2 rounded-xl hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base"
                      >
                        Mark Attendance
                      </button>
                    </div>
                  )}
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${SESSION_STATUS_STYLES[session.status]}`}>
                    {session.status === 'Completed' && <CheckCircle size={12} />}
                    {session.status === 'No Show' && <XCircle size={12} />}
                    {session.status}
                  </span>
                </div>
              </div>
            ))}

            {filteredSessions.length === 0 && (
              <TrainerSessionsEmptyState onSchedule={() => setShowScheduleModal(true)} />
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
          onSuccess={(_updatedSession, message) => {
            setEditingSession(null);
            showSuccess(message, 'trainer-sessions-update-success');
          }}
        />
      )}
    </div>
  );
}
