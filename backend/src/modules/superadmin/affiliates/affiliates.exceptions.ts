export class AffiliateNotFoundException extends Error {
  constructor(message = 'Affiliate not found') {
    super(message);
    this.name = 'AffiliateNotFoundException';
  }
}
