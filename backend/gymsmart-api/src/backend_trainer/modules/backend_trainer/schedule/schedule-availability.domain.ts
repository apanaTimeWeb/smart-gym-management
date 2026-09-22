// RESPONSIBILITY: Defines the schedule business object independent from TypeORM persistence.
// FLOW: schedule repository → mapper → domain object → service.

export interface ScheduleAvailabilityDomain {
  id: string;
  trainerId: string;
  day: string;
  isAvailable: boolean;
  startTime: string;
  endTime: string;
}
