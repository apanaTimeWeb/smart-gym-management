import { HttpException, HttpStatus } from '@nestjs/common';
import { SETTINGS_ERRORS } from './settings.constants';

export class SettingsNotFoundException extends HttpException {
  constructor(id?: string) {
    super({ success: false, message: SETTINGS_ERRORS.NOT_FOUND, error: 'SettingsNotFoundException', statusCode: HttpStatus.NOT_FOUND, detail: id ? 'Resource with ID ' + id + ' not found' : 'Resource not found' }, HttpStatus.NOT_FOUND);
  }
}
