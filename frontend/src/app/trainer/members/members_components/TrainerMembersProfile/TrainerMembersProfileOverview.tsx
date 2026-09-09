// RESPONSIBILITY: Encapsulates logic, UI, or types for the trainer module.
// DATA FLOW: Standard component data flow.
// RESPONSIBILITY: Contains logic, types, or component definition for this module.
'use client';

import { useState, useRef } from 'react';
import { MessageCircle, Mail, Target, X, Trash2 } from 'lucide-react';
import { useMembersContext } from '@/app/trainer/members/members_context/MembersContext';
import { membersApi } from '@/app/trainer/members/members_api/members_api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const progressData = [
  { month: 'Jan', weight: 82, bodyFat: 24 },
  { month: 'Feb', weight: 80, bodyFat: 22 },
  { month: 'Mar', weight: 79, bodyFat: 21 },
  { month: 'Apr', weight: 77, bodyFat: 19 },
  { month: 'May', weight: 76, bodyFat: 18 },
  { month: 'Jun', weight: 75, bodyFat: 17 },
];

export default function TrainerMembersProfileOverview() {
  const { selectedMember, openMsg, showToast } = useMembersContext();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [notes, setNotes] = useState<{ id: number; text: string; date: string }[]>(
    () => selectedMember?.trainerNotes ?? []
  );
  const [isSavingNote, setIsSavingNote] = useState(false);
  const noteTextRef = useRef<HTMLTextAreaElement>(null);
  const feedbackTextRef = useRef<HTMLTextAreaElement>(null);

  if (!selectedMember) return null;

  const handleSaveNote = async () => {
    const text = noteTextRef.current?.value.trim();
    if (!text) return;
    setIsSavingNote(true);
    try {
      const newNote = { id: Date.now(), text, date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) };
      const updated = [...notes, newNote];
      await membersApi.updateMember(selectedMember.id, { trainerNotes: updated } as any);
      setNotes(updated);
      showToast('Note saved successfully', 'success');
      setShowNoteModal(false);
    } catch {
      showToast('Failed to save note', 'error');
    } finally {
      setIsSavingNote(false);
    }
  };

  const handleDeleteNote = async (id: number) => {
    const updated = notes.filter(n => n.id !== id);
    try {
      await membersApi.updateMember(selectedMember.id, { trainerNotes: updated } as any);
      setNotes(updated);
    } catch {
      showToast('Failed to delete note', 'error');
    }
  };

  const handleSendFeedback = () => {
    const text = feedbackTextRef.current?.value.trim();
    if (!text) return;
    showToast('Feedback sent via Email', 'email');
    setShowFeedbackModal(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2">
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="bg-card border border-border p-4 rounded-xl">
              <p className="text-xs text-secondary mb-1">Fitness Goal</p>
              <p className="text-sm font-semibold text-foreground">{selectedMember.fitnessGoal || 'Not specified'}</p>
            </div>
            <div className="bg-card border border-border p-4 rounded-xl">
              <p className="text-xs text-secondary mb-1">Days Since Last Check-in</p>
              <p className="text-sm font-semibold text-foreground">{selectedMember.daysSinceLastCheckIn ?? 'N/A'}</p>
            </div>
          </div>
          <h3 className="font-semibold text-foreground mb-3">Physical Progress</h3>
          <div className="bg-card border border-border p-4 rounded-xl h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--secondary)' }} dy={10} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--secondary)' }} dx={-10} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--secondary)' }} dx={10} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '14px' }}
                />
                <Line yAxisId="left" type="monotone" name="Weight (kg)" dataKey="weight" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line yAxisId="right" type="monotone" name="Body Fat (%)" dataKey="bodyFat" stroke="var(--warning)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-foreground mb-3">PT Package & Actions</h3>
          <div className="bg-input/50 rounded-xl p-4 mb-4 border border-border flex items-center justify-between">
            <div>
              <p className="text-xs text-secondary">PT Sessions Remaining</p>
              <p className="text-xl font-bold text-foreground">7 <span className="text-sm font-medium text-secondary">/ 12</span></p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <Target size={20} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => showToast('Member Checked In', 'success')}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-primary rounded-xl justify-center motion-safe:transition-colors hover:bg-primary/90"
            >
              Check-in Member
            </button>
            <button
              onClick={() => openMsg(selectedMember, 'whatsapp')}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl justify-center motion-safe:transition-colors bg-success hover:bg-success/90"
            >
              <MessageCircle size={14} /> Send WhatsApp
            </button>
            <button
              onClick={() => setShowFeedbackModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl justify-center motion-safe:transition-colors bg-info hover:bg-info/90"
            >
              <Mail size={14} /> Send Feedback
            </button>
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-primary bg-primary-subtle rounded-xl justify-center motion-safe:transition-colors hover:bg-primary/20"
            >
              Share Progress
            </button>
            <button
              onClick={() => setShowNoteModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-secondary bg-input border border-border rounded-xl justify-center motion-safe:transition-colors hover:bg-border"
            >
              Add Note
            </button>
          </div>
          <div className="mt-6 border-t border-border pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">Trainer Notes</h3>
            </div>
            <div className="space-y-3">
              {notes.map(note => (
                <div key={note.id} className="bg-input/50 p-3 rounded-xl border border-border group relative">
                  <p className="text-sm text-foreground mb-1">{note.text}</p>
                  <p className="text-xs text-secondary">{note.date}</p>
                  <button onClick={() => handleDeleteNote(note.id)} className="absolute top-2 right-2 p-1.5 text-danger bg-danger-bg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              {notes.length === 0 && (
                <p className="text-sm text-secondary italic text-center py-4">No notes added.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 1. Send Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-card w-full max-w-md rounded-2xl shadow-xl overflow-hidden motion-safe:animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="text-lg font-bold text-foreground">Send Feedback</h3>
              <button onClick={() => setShowFeedbackModal(false)} className="text-secondary hover:text-foreground hover:bg-input p-1 rounded-lg transition-colors"><X size={20} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-secondary mb-1">Feedback Message</label>
                <textarea ref={feedbackTextRef} rows={4} className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary custom-scrollbar" placeholder="e.g. Your form is improving, but strictly follow the diet..."></textarea>
              </div>
              <div className="pt-4 flex justify-end gap-2 border-t border-border mt-4">
                <button onClick={() => setShowFeedbackModal(false)} className="px-4 py-2 text-sm font-semibold text-secondary hover:text-foreground hover:bg-input rounded-lg transition-colors">Cancel</button>
                <button onClick={handleSendFeedback} className="px-4 py-2 text-sm font-semibold text-white bg-info rounded-lg hover:bg-info/90 transition-colors">Submit Feedback</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Add Trainer Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-card w-full max-w-md rounded-2xl shadow-xl overflow-hidden motion-safe:animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="text-lg font-bold text-foreground">Trainer Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-secondary hover:text-foreground hover:bg-input p-1 rounded-lg transition-colors"><X size={20} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-secondary mb-1">Private Internal Note</label>
                <textarea ref={noteTextRef} rows={4} className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary custom-scrollbar" placeholder="e.g. Member has a slight knee injury, avoid heavy squats..."></textarea>
                <p className="text-xs text-secondary mt-1">This note is only visible to you. The member cannot see this.</p>
              </div>
              <div className="pt-4 flex justify-end gap-2 border-t border-border mt-4">
                <button onClick={() => setShowNoteModal(false)} className="px-4 py-2 text-sm font-semibold text-secondary hover:text-foreground hover:bg-input rounded-lg transition-colors">Cancel</button>
                <button onClick={handleSaveNote} disabled={isSavingNote} className="px-4 py-2 text-sm font-semibold text-foreground bg-input border border-border rounded-lg hover:bg-border transition-colors disabled:opacity-50">
                  {isSavingNote ? 'Saving...' : 'Save Note'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Share Progress Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-card w-full max-w-md rounded-2xl shadow-xl overflow-hidden motion-safe:animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="text-lg font-bold text-foreground">Share Progress</h3>
              <button onClick={() => setShowShareModal(false)} className="text-secondary hover:text-foreground hover:bg-input p-1 rounded-lg transition-colors"><X size={20} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-secondary mb-1">Generated Summary</label>
                <textarea rows={6} className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary custom-scrollbar font-mono text-xs" readOnly value={`Hi ${selectedMember.name},\n\nHere is your progress update:\n- Current Weight: 75 kg (-1 kg)\n- Body Fat: 17% (-1%)\n- Current Goal: ${selectedMember.fitnessGoal || 'Fat Loss'}\n\nKeep up the great work!\n- Your Trainer`}></textarea>
              </div>
              <div className="pt-4 flex justify-end gap-2 border-t border-border mt-4">
                <button onClick={() => setShowShareModal(false)} className="px-4 py-2 text-sm font-semibold text-secondary hover:text-foreground hover:bg-input rounded-lg transition-colors">Cancel</button>
                <button onClick={() => {
                  const msg = encodeURIComponent(`Hi ${selectedMember.name},\n\nHere is your progress update:\n- Current Weight: 75 kg (-1 kg)\n- Body Fat: 17% (-1%)\n- Current Goal: ${selectedMember.fitnessGoal || 'Fat Loss'}\n\nKeep up the great work!\n- Your Trainer`);
                  window.open(`https://wa.me/?text=${msg}`, '_blank');
                  setShowShareModal(false);
                }} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-success rounded-lg hover:bg-success/90 transition-colors">
                  <MessageCircle size={16} /> Share via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
