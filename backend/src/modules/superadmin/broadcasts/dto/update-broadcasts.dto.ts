import { PartialType } from '@nestjs/swagger';
import { CreateBroadcastDto } from './create-broadcasts.dto';

export class UpdateBroadcastDto extends PartialType(CreateBroadcastDto) {}
