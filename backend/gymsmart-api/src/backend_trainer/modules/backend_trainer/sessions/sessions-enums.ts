// RESPONSIBILITY: Defines finite sessions domain enum values used by DTOs and persistence.
// FLOW: sessions DTO/entity → typed enum → API/DB contract.

export enum SessionType { PT = 'PT', Group = 'Group' }
export enum SessionStatus { Upcoming = 'Upcoming', Completed = 'Completed', NoShow = 'No Show' }
export enum SessionRecurrence { None = 'none', Weekly = 'weekly', Biweekly = 'biweekly' }
