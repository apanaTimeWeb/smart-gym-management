export class SaaSInvoiceNotFoundException extends Error {
  constructor(message = 'SaaSInvoice not found') {
    super(message);
    this.name = 'SaaSInvoiceNotFoundException';
  }
}
