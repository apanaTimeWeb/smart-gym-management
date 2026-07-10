import { HttpException, HttpStatus } from '@nestjs/common';

export class WorkoutNotFoundException extends HttpException {
  constructor(message = 'Workout not found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}
