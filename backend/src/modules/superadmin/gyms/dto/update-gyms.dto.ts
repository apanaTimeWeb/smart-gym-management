import { PartialType } from '@nestjs/swagger';
import { CreateGymDto } from './create-gyms.dto';

export class UpdateGymDto extends PartialType(CreateGymDto) {}
