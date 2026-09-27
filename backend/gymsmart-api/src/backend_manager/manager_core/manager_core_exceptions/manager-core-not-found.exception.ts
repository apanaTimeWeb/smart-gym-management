// RESPONSIBILITY: Owns canonical not-found exception behavior for Manager backend features.
// FLOW: Missing domain resource -> typed 404 exception -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';

import { ManagerCoreBusinessException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-business.exception';

export class ManagerCoreNotFoundException extends ManagerCoreBusinessException {
  /** @description Creates a standard not-found error for a domain resource. @param entity - Domain entity name. @param id - Resource UUID. @returns Nothing. */
  constructor(entity: string, id: string) {
    super(`${entity} with id ${id} was not found`, 'CORE.ENTITY.NOT_FOUND', HttpStatus.NOT_FOUND);
  }
}
