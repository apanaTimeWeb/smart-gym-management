import type { GrievanceTicket } from '@/app/manager/grievance/grievance_types/ManagerGrievanceTypes';

export const MOCK_GRIEVANCE_TICKETS: GrievanceTicket[] = [
  {
    id: 'gt1',
    memberName: 'Rahul Sharma',
    category: 'HYGIENE',
    issue: 'Washroom smells bad and no handwash',
    status: 'OPEN',
    loggedAt: '2026-09-19T08:30:00Z',
  },
  {
    id: 'gt2',
    memberName: 'Sneha Patel',
    category: 'STAFF_BEHAVIOUR',
    issue: 'Trainer John is not paying attention during general training',
    status: 'RESOLVING',
    loggedAt: '2026-09-17T18:15:00Z',
  },
  {
    id: 'gt3',
    memberName: 'Vikas Singh',
    category: 'EQUIPMENT',
    issue: 'Leg press machine is making a weird noise',
    status: 'CLOSED',
    loggedAt: '2026-09-10T07:45:00Z',
    resolvedAt: '2026-09-11T12:00:00Z',
    resolutionNote: 'Machine oiled and tightened. Working fine now.',
  }
];
