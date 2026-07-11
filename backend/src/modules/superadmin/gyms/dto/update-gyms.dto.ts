import { PartialType } from '@nestjs/mapped-types';
import { CreateTenantDto } from './create-gyms.dto';

export class UpdateTenantDto extends PartialType(CreateTenantDto) {}
