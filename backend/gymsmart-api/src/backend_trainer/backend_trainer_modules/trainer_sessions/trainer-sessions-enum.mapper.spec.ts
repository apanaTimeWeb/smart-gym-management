// RESPONSIBILITY: Proves canonical session enums preserve the frozen frontend transport values.
// FLOW: Jest → TrainerSessionsEnumMapper → canonical enum/API label.

import { TrainerSessionsEnumMapper } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/trainer-sessions-enum.mapper';
import { SessionStatus, SessionType, SessionRecurrence } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/trainer-sessions-enums';

describe('TrainerSessionsEnumMapper', () => {
  it('normalizes legacy frontend session labels', () => {
    expect(TrainerSessionsEnumMapper.toType('Group')).toBe(SessionType.GROUP);
    expect(TrainerSessionsEnumMapper.toStatus('No Show')).toBe(SessionStatus.NO_SHOW);
    expect(TrainerSessionsEnumMapper.toRecurrence('weekly')).toBe(SessionRecurrence.WEEKLY);
  });

  it('serializes canonical session values back to frontend values', () => {
    expect(TrainerSessionsEnumMapper.toApiType(SessionType.GROUP)).toBe('Group');
    expect(TrainerSessionsEnumMapper.toApiStatus(SessionStatus.UPCOMING)).toBe('Upcoming');
    expect(TrainerSessionsEnumMapper.toApiRecurrence(SessionRecurrence.BIWEEKLY)).toBe('biweekly');
  });
});
