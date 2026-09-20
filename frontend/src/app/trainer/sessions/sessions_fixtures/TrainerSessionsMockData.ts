import type { TrainerSession } from '@/app/trainer/sessions/sessions_types/TrainerSessionsTypes';

const today = new Date().toISOString().split('T')[0] || '';

export const MOCK_TRAINER_SESSIONS: TrainerSession[] = [
  {
    id: 's1',
    title: 'Morning HIIT',
    type: 'Group',
    time: '07:00 AM',
    sessionDate: today,
    duration: '60 min',
    status: 'Upcoming',
    attendees: 12,
    maxAttendees: 15,
    isOnline: false,
    location: 'Studio A'
  },
  {
    id: 's2',
    title: 'PT - Rahul Sharma',
    type: 'PT',
    time: '09:00 AM',
    sessionDate: today,
    duration: '60 min',
    status: 'Completed',
    attendees: 1,
    isOnline: false,
    member: 'Rahul Sharma',
    trainerNotes: 'Focus on upper body strength'
  },
  {
    id: 's3',
    title: 'Yoga Flow',
    type: 'Group',
    time: '06:00 PM',
    sessionDate: today,
    duration: '60 min',
    status: 'Upcoming',
    attendees: 8,
    maxAttendees: 20,
    isOnline: false,
    location: 'Studio B'
  }
];


export const MOCK_TRAINER_SESSION_MEMBERS = [
  { id: 'm1', name: 'Rahul Sharma' },
  { id: 'm2', name: 'Neha Gupta' },
  { id: 'm3', name: 'Amit Kumar' },
];
