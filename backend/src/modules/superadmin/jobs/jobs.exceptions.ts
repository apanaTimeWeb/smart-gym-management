import { HttpException, HttpStatus } from '@nestjs/common';
import { JOBS_ERRORS } from './jobs.constants';

export class JobsNotFoundException extends HttpException {
  constructor(id?: string) {
    super({ success: false, message: JOBS_ERRORS.NOT_FOUND, error: 'JobsNotFoundException', statusCode: HttpStatus.NOT_FOUND, detail: id ? 'Resource with ID ' + id + ' not found' : 'Resource not found' }, HttpStatus.NOT_FOUND);
  }
}
