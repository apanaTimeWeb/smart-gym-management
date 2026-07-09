import { HttpException, HttpStatus } from '@nestjs/common';
import { PLAN_ERRORS } from '@/modules/plans/plans.constants';

export class PlanNotFoundException extends HttpException {
  constructor() {
    super(PLAN_ERRORS.NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}

export class DuplicatePlanTierException extends HttpException {
  constructor() {
    super(PLAN_ERRORS.DUPLICATE_TIER, HttpStatus.CONFLICT);
  }
}
