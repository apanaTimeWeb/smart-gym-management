import { PartialType } from '@nestjs/mapped-types';
import { CreateBackgroundJobDto } from './create-jobs.dto';

export class UpdateBackgroundJobDto extends PartialType(CreateBackgroundJobDto) {}
