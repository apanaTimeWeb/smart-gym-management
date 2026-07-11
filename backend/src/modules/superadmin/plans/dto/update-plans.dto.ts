import { PartialType } from '@nestjs/mapped-types';
import { CreateSubscriptionPlanDto } from './create-plans.dto';

export class UpdateSubscriptionPlanDto extends PartialType(CreateSubscriptionPlanDto) {}
