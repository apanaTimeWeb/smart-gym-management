export class GlobalSettingNotFoundException extends Error {
  constructor(message = 'GlobalSetting not found') {
    super(message);
    this.name = 'GlobalSettingNotFoundException';
  }
}
