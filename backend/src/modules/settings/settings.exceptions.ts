import { HttpException, HttpStatus } from '@nestjs/common';
import { SETTINGS_CONSTANTS } from './settings.constants';

export class SettingsNotFoundException extends HttpException {
  constructor(message?: string) {
    super(
      message || SETTINGS_CONSTANTS.ERROR_MESSAGES.SETTINGS_NOT_FOUND,
      HttpStatus.NOT_FOUND,
    );
  }
}
