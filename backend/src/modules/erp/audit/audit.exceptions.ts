export class AuditLogNotFoundException extends Error {
  constructor(message = 'Audit log not found') {
    super(message);
    this.name = 'AuditLogNotFoundException';
  }
}
