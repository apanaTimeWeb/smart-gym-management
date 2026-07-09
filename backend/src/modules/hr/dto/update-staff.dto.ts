import { PartialType } from '@nestjs/swagger';
import { CreateStaffDto } from '@/modules/hr/dto/create-staff.dto';

export class UpdateStaffDto extends PartialType(CreateStaffDto) {}
