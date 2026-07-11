import { HttpException, HttpStatus } from '@nestjs/common';
import { BROADCASTS_ERRORS } from './broadcasts.constants';

export class BroadcastNotFoundException extends HttpException {
  constructor(id: string) {
    super({ success: false, message: BROADCASTS_ERRORS.NOT_FOUND, error: 'BroadcastNotFoundException', statusCode: HttpStatus.NOT_FOUND, detail: `Broadcast with ID "${id}" not found` }, HttpStatus.NOT_FOUND);
  }
}

export class BroadcastAlreadySentException extends HttpException {
  constructor(id: string) {
    super({ success: false, message: BROADCASTS_ERRORS.ALREADY_SENT, error: 'BroadcastAlreadySentException', statusCode: HttpStatus.CONFLICT, detail: `Broadcast "${id}" has status SENT and cannot be modified` }, HttpStatus.CONFLICT);
  }
}
