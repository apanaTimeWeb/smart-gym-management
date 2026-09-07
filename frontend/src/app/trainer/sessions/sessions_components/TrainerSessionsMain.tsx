'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, User, CheckCircle, XCircle } from 'lucide-react';
import TrainerHeader from '@/app/trainer/trainer_components/TrainerLayout/TrainerHeader';

type SessionType = 'PT' | 'Group';
type SessionStatus = 'Upcoming' | 'Completed' | 'Cancelled';

interface Session {
  id: string;
  title: string;
  type: SessionType;
  time: string;
  duration: string;
  status: SessionStatus;
  attendees: number;
  maxAttendees?: number;
  member?: string;
}

const MOCK_SESSIONS: Session[] = [
  { id: '1', title: 'Morning HIIT', type: 'Group', time: '07:00 AM', duration: '45m', status: 'Completed', attendees: 12, maxAttendees: 15 },
  { id: '2', title: 'PT with Rahul', type: 'PT', time: '09:00 AM', duration: '60m', status: 'Completed', attendees: 1, member: 'Rahul Sharma' },
  { id: '3', title: 'Strength Training', type: 'PT', time: '11:30 AM', duration: '60m', status: 'Upcoming', attendees: 1, member: 'Priya Patel' },
  { id: '4', title: 'Evening Yoga', type: 'Group', time: '06:00 PM', duration: '60m', status: 'Upcoming', attendees: 8, maxAttendees: 20 },
  { id: '5', title: 'PT with Amit', type: 'PT', time: '07:30 PM', duration: '45m', status: 'Cancelled', attendees: 0, member: 'Amit Kumar' },
];

export default function TrainerSessionsMain() {
  const [filter, setFilter] = useState<'All' | 'PT' | 'Group'>('All');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const filteredSessions = MOCK_SESSIONS.filter(s => filter === 'All' || s.type === filter);

  return (
    <div className="min-h-full pb-10">
      <TrainerHeader title="My Schedule" subtitle="Manage your daily PT and group class sessions" />
      
      <div className="p-6 space-y-6">
        {/* Toolbar */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex bg-input rounded-lg p-1">
            {['All', 'PT', 'Group'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md motion-safe:transition-colors ${
                  filter === f ? 'bg-card text-foreground shadow-sm' : 'text-secondary hover:text-foreground'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon size={16} className="text-secondary" />
            <input 
              type="date" 
              value={date}
              onChange={e => setDate(e.target.value)}
              className="bg-input border border-border text-foreground text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Sessions List */}
        <div className="grid gap-4">
          {filteredSessions.map(session => (
            <div key={session.id} className="bg-card rounded-xl shadow-sm border border-border p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-primary/30 transition-colors">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl mt-1 ${
                  session.type === 'PT' ? 'bg-info-bg text-info' : 'bg-purple-bg text-purple'
                }`}>
                  {session.type === 'PT' ? <User size={24} /> : <Users size={24} />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-foreground text-lg">{session.title}</h3>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      session.type === 'PT' ? 'bg-info-bg text-info' : 'bg-purple-bg text-purple'
                    }`}>
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

              <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t border-border md:border-none">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  session.status === 'Completed' ? 'bg-success-bg text-success' :
                  session.status === 'Cancelled' ? 'bg-danger-bg text-danger' :
                  'bg-warning-bg text-warning'
                }`}>
                  {session.status === 'Completed' && <CheckCircle size={12} />}
                  {session.status === 'Cancelled' && <XCircle size={12} />}
                  {session.status}
                </span>

                {session.status === 'Upcoming' && session.type === 'Group' && (
                  <button className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                    Mark Attendance
                  </button>
                )}
                {session.status === 'Upcoming' && session.type === 'PT' && (
                  <button className="px-4 py-2 bg-info text-white text-sm font-semibold rounded-lg hover:bg-info/90 transition-colors">
                    Start Session
                  </button>
                )}
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
    </div>
  );
}
