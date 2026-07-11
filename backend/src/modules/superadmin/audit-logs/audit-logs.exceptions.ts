export class GlobalAuditLogNotFoundException extends Error {
  constructor(message = 'GlobalAuditLog not found') {
    super(message);
    this.name = 'GlobalAuditLogNotFoundException';
  }
}
