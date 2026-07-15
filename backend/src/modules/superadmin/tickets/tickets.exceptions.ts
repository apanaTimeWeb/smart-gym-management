export class SupportTicketNotFoundException extends Error {
  constructor(message = 'SupportTicket not found') {
    super(message);
    this.name = 'SupportTicketNotFoundException';
  }
}
