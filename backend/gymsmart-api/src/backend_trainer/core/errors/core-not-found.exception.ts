// RESPONSIBILITY: Represents fail-fast missing-resource failures with a typed code.
// FLOW: Repository findByIdOrThrow() → CoreNotFoundException → 404 envelope.


import { HttpStatus } from '@nestjs/common';
import { CoreDomainException } from '@/backend_trainer/core/errors/core-domain.exception';
export class CoreNotFoundException extends CoreDomainException { constructor(resource: string, id: string) { super(`DOMAIN.${resource}.NOT_FOUND`, `${resource} ${id} was not found`, HttpStatus.NOT_FOUND); } }
