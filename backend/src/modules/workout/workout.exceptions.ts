import { HttpException, HttpStatus } from '@nestjs/common';
import { WORKOUT_CONSTANTS } from './workout.constants';

export class WorkoutNotFoundException extends HttpException {
  constructor(message?: string) {
    super(
      message || WORKOUT_CONSTANTS.ERROR_MESSAGES.WORKOUT_NOT_FOUND,
      HttpStatus.NOT_FOUND,
    );
  }
}

export class DietPlanNotFoundException extends HttpException {
  constructor(message?: string) {
    super(
      message || WORKOUT_CONSTANTS.ERROR_MESSAGES.DIET_PLAN_NOT_FOUND,
      HttpStatus.NOT_FOUND,
    );
  }
}
