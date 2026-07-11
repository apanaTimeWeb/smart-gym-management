import { HttpException, HttpStatus } from '@nestjs/common';
import { FEATURES_ERRORS } from './features.constants';

export class FeaturesNotFoundException extends HttpException {
  constructor(id?: string) {
    super({ success: false, message: FEATURES_ERRORS.NOT_FOUND, error: 'FeaturesNotFoundException', statusCode: HttpStatus.NOT_FOUND, detail: id ? 'Resource with ID ' + id + ' not found' : 'Resource not found' }, HttpStatus.NOT_FOUND);
  }
}
