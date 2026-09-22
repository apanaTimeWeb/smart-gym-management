// RESPONSIBILITY: Base typed domain exception.
// FLOW: Business invariant failure → typed exception → canonical HTTP filter.
import { HttpStatus } from '@nestjs/common'; export class CoreBusinessException extends Error{constructor(message:string,public readonly errorCode:string,public readonly status:HttpStatus=HttpStatus.UNPROCESSABLE_ENTITY){super(message);this.name='CoreBusinessException'}}
