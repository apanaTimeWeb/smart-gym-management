// RESPONSIBILITY: Proves Trainer member-note identifiers remain UUID strings at the API boundary.
// FLOW: ORM note entity → MembersMemberNoteMapper → frontend note contract.

import { MembersMemberNoteMapper } from '@/backend_trainer/backend_trainer_modules/trainer_members/trainer-members-member-note.mapper';

describe('MembersMemberNoteMapper', () => {
  it('keeps UUID identifiers as strings', () => {
    const mapped = MembersMemberNoteMapper({ id: '7f6c7d3c-1b56-4c8a-b1db-54c06b1e2e33', text: 'Check form', createdAt: new Date('2026-09-24T10:00:00.000Z') } as never);
    expect(mapped.id).toBe('7f6c7d3c-1b56-4c8a-b1db-54c06b1e2e33');
  });
});
