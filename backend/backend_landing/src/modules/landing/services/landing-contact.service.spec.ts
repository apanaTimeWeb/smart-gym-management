// RESPONSIBILITY: Proves the contact service persists the message and its audit event through named boundaries.
// FLOW: Unit test → LandingContactService.createContact → repositories.
import { LandingContactService } from '@/modules/landing/services/landing-contact.service';

describe('LandingContactService', () => {
  it('creates a contact message and writes its audit entry', async () => {
    const contact = {
      id: 'contact-1',
      name: 'Member One',
      email: 'member@example.org',
      message: 'Need a callback.',
      createdAt: new Date('2026-09-21T00:00:00.000Z'),
      updatedAt: new Date('2026-09-21T00:00:00.000Z'),
      deletedAt: null,
    };
    const contactRepository = { createContact: jest.fn().mockResolvedValue(contact) };
    const auditRepository = { recordCreate: jest.fn().mockResolvedValue(undefined) };
    const service = new LandingContactService(contactRepository as never, auditRepository as never);

    const result = await service.createContact(
      { name: contact.name, email: contact.email, message: contact.message },
      { manager: {} as never },
    );

    expect(result).toEqual(contact);
    expect(auditRepository.recordCreate).toHaveBeenCalledWith(
      expect.anything(),
      'LANDING_CONTACT_CREATED',
      'LandingContact',
      'contact-1',
      {},
    );
  });
});
