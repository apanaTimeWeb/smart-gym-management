// RESPONSIBILITY: Standard not-found exception for repository OrThrow methods.
// FLOW: Repository miss → CoreNotFoundException → global canonical error response.
import { HttpStatus } from '@nestjs/common'; export class CoreNotFoundException extends Error{readonly status=HttpStatus.NOT_FOUND;readonly errorCode='CORE.ENTITY.NOT_FOUND';constructor(entity:string,id:string){super(`${entity} with id ${id} was not found`);this.name='CoreNotFoundException'}}
