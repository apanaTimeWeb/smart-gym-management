// RESPONSIBILITY: Owns backend core NestJS metadata/decorator contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { SetMetadata } from '@nestjs/common';

 export const CorePublicDecorator=()=>SetMetadata('core_public',true);
