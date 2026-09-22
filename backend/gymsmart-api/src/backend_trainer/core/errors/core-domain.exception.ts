// RESPONSIBILITY: Represents typed domain failures with machine-readable error codes.
// FLOW: Service/repository failure → CoreDomainException → canonical exception filter.


import { HttpStatus } from '@nestjs/common';
export class CoreDomainException extends Error {
  constructor(public readonly errorCode: string, message: string, public readonly status: HttpStatus = HttpStatus.BAD_REQUEST) { super(message); }
}
