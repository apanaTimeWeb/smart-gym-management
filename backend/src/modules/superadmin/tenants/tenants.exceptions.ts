export class TenantNotFoundException extends Error {
  constructor(message = 'Tenant not found') {
    super(message);
    this.name = 'TenantNotFoundException';
  }
}
