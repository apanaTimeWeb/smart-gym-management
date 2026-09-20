// RESPONSIBILITY: Feature-owned notification fixtures used by the module MSW handlers.
export const MOCK_TRAINER_NOTIFICATIONS = [
  { id: 'n1', text: 'You have a PT session at 2:00 PM.', time: '2h ago', unread: true, type: 'SYSTEM' as const },
  { id: 'n2', text: 'A member completed the assigned workout plan.', time: 'Yesterday', unread: false, type: 'WORKOUT' as const },
  { id: 'n3', text: 'Your weekly availability was updated.', time: '2d ago', unread: true, type: 'ATTENDANCE' as const },
] ;
