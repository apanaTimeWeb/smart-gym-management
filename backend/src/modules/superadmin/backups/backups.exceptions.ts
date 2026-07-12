export class BackupRecordNotFoundException extends Error {
  constructor(message = 'BackupRecord not found') {
    super(message);
    this.name = 'BackupRecordNotFoundException';
  }
}
