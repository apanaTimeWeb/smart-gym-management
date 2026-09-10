// RESPONSIBILITY: Modal for editing an existing trainer session (title, time, duration, location, room).
// DATA FLOW: TrainerSessionsMain → TrainerSessionsEditModal → updateTrainerSession API
'use client';

import { useState } from 'react';
import { X, Loader2, Save } from 'lucide-react';
import type { TrainerSession } from '@/app/trainer/sessions/sessions_types/TrainerSessionsTypes';
import { updateTrainerSession } from '@/app/trainer/sessions/sessions_api/TrainerSessionsApi';
import { DURATION_OPTIONS } from '@/app/trainer/sessions/sessions_utils/TrainerSessionsSharedConstants';
import { SearchableDropdown } from '@/app/trainer/trainer_components/TrainerShared/SearchableDropdown';

interface TrainerSessionsEditModalProps {
  session: TrainerSession;
  onClose: () => void;
  onSuccess: (updatedSession: TrainerSession) => void;
}

export default function TrainerSessionsEditModal({
  session,
  onClose,
  onSuccess,
}: TrainerSessionsEditModalProps) {
  const [time, setTime] = useState(session.time ?? '');
  const [duration, setDuration] = useState<string | number>(session.duration ?? '60m');
  const [location, setLocation] = useState(session.location ?? '');
  const [room, setRoom] = useState(session.room ?? '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const durationOptions = DURATION_OPTIONS.map((d) => ({ value: d.value, label: d.label }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!time || !duration) return;
    setIsSubmitting(true);
    setError('');
    try {
      const updated = await updateTrainerSession(session.id, {
        time,
        duration: String(duration),
        location: location || undefined,
      });
      onSuccess(updated);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update session.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-overlay w-full max-w-md rounded-2xl shadow-2xl border border-border overflow-hidden motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-200">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h3 className="text-lg font-bold text-foreground">Edit Session</h3>
            <p className="text-xs text-secondary mt-0.5 truncate max-w-[260px]">{session.title}</p>
          </div>
          <button
            onClick={onClose}
            className="text-secondary hover:text-foreground hover:bg-input p-1 rounded-lg motion-safe:transition-colors"
            aria-label="Close edit session modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <p className="text-sm text-danger bg-danger-bg rounded-lg px-3 py-2">{error}</p>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="edit-session-time" className="block text-sm font-semibold text-secondary mb-1">
                Session Time
              </label>
              <input
                id="edit-session-time"
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-secondary mb-1">Duration</label>
              <SearchableDropdown
                options={durationOptions}
                value={duration}
                onChange={setDuration}
                placeholder="Select duration"
              />
            </div>
          </div>

          <div>
            <label htmlFor="edit-session-location" className="block text-sm font-semibold text-secondary mb-1">
              Location / Studio <span className="text-secondary font-normal">(optional)</span>
            </label>
            <input
              id="edit-session-location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Main Floor, Yoga Studio"
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="edit-session-room" className="block text-sm font-semibold text-secondary mb-1">
              Room <span className="text-secondary font-normal">(optional)</span>
            </label>
            <input
              id="edit-session-room"
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="e.g. Room A, Studio 2"
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-border mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-secondary hover:text-foreground hover:bg-input rounded-lg motion-safe:transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 motion-safe:transition-colors disabled:opacity-70"
            >
              {isSubmitting ? <Loader2 size={16} className="motion-safe:animate-spin" /> : <Save size={16} />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
