// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { CoreNotFoundException } from '@/backend_manager/core/exceptions/core-not-found.exception';

export class WorkoutNotFoundException extends CoreNotFoundException {
  constructor(id: string) { super('workout', id); }
}
