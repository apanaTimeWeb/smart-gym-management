// RESPONSIBILITY: Owns the framework-level transaction-safe member-creation boundary used by cross-feature orchestrators.
// FLOW: Feature orchestrator -> core member-creation port -> registered Members persistence callback -> same transaction context.
import { HttpStatus, Injectable } from '@nestjs/common';

import { ManagerCoreContextException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-context.exception';

import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface ManagerCoreMemberCreationResult {
  id: string;
  payload: ManagerCoreJsonObject;
}

type MemberCreator = (data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext) => Promise<ManagerCoreMemberCreationResult>;

@Injectable()
export class ManagerCoreMemberCreationRegistry {
  private creator?: MemberCreator;

  /** @description Registers the transaction-bound Members persistence callback. @param creator - Members feature creator. @returns Nothing. */
  register(creator: MemberCreator): void {
    this.creator = creator;
  }

  /** @description Creates a member in the exact caller transaction. @param data - Validated member payload. @param context - Active transaction context. @returns Created member identity and payload. @throws Error when the Members feature has not registered its callback. */
  create(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerCoreMemberCreationResult> {
    if (!this.creator) throw new ManagerCoreContextException('Members creation boundary is not registered.', 'CORE.MEMBER_CREATOR.MISSING', HttpStatus.INTERNAL_SERVER_ERROR);
    return this.creator(data, context);
  }
}
