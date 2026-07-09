import { HttpException, HttpStatus } from '@nestjs/common';

export class PlanNotFoundException extends HttpException {
  constructor() {
    super('Plan not found', HttpStatus.NOT_FOUND);
  }
}

export class DuplicatePlanTierException extends HttpException {
  constructor() {
    super('A plan with this tier already exists', HttpStatus.CONFLICT);
  }
}
