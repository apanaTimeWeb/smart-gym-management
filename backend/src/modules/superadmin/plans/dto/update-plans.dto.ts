import { PartialType } from '@nestjs/swagger';
import { CreatePlanDto } from './create-plans.dto';

export class UpdatePlanDto extends PartialType(CreatePlanDto) {}
