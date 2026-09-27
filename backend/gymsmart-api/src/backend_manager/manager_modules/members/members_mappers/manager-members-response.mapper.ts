// RESPONSIBILITY: Shapes Manager member domain objects into the complete frontend member response without accessing persistence.
// FLOW: Member domain projection -> aliases/explicit API fields -> response DTO contract.
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { MembersDomainData } from '@/backend_manager/manager_modules/members/members_types/manager-members.types';

export class ManagerMembersResponseMapper {
  /** Returns the complete member payload with explicit member id/currency and detail aliases. */
  static toMember(data: MembersDomainData): ManagerCoreJsonObject {
    const payload = { ...data.payload };
    const id = data.id;
    payload.id = id;
    if (payload.dietPlan === undefined && payload.assignedDiet !== undefined) payload.dietPlan = payload.assignedDiet;
    if (payload.workoutPlan === undefined && payload.assignedWorkout !== undefined) payload.workoutPlan = payload.assignedWorkout;
    return payload;
  }
}

export { ManagerMembersResponseMapper as MembersResponseMapper };
