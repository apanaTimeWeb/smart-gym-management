import { PartialType } from '@nestjs/mapped-types';
import { CreateBroadcastDto } from './create-broadcasts.dto';

export class UpdateBroadcastDto extends PartialType(CreateBroadcastDto) {}
