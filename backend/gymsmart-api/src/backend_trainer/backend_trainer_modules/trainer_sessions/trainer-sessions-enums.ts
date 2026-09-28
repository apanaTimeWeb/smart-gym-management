// RESPONSIBILITY: Defines canonical session domain enum values; API labels are handled by TrainerSessionsEnumMapper.
// FLOW: Frontend label → DTO transform → canonical enum → TypeORM enum → API mapper → frontend label.
export enum SessionType { PT='PT', GROUP='GROUP' }
export enum SessionStatus { UPCOMING='UPCOMING', COMPLETED='COMPLETED', NO_SHOW='NO_SHOW' }
export enum SessionRecurrence { NONE='NONE', WEEKLY='WEEKLY', BIWEEKLY='BIWEEKLY' }
