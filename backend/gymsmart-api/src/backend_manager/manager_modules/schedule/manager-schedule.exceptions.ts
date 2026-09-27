// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { ManagerCoreNotFoundException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-not-found.exception';

export class ManagerScheduleNotFoundException extends ManagerCoreNotFoundException {
  constructor(id: string) { super('schedule', id); }
}

export { ManagerScheduleNotFoundException as ScheduleNotFoundException };
