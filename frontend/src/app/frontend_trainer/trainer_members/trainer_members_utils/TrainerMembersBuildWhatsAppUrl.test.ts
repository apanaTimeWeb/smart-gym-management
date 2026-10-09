import { describe, expect, it } from 'vitest';

import { TrainerMembersBuildWhatsAppUrl } from '@/app/frontend_trainer/trainer_members/trainer_members_utils/TrainerMembersBuildWhatsAppUrl';

describe('TrainerMembersBuildWhatsAppUrl', () => {
  it('encodes the message while preserving the recipient number', () => {
    expect(TrainerMembersBuildWhatsAppUrl('919876543210', 'Hello trainer & member')).toBe(
      'https://wa.me/919876543210?text=Hello%20trainer%20%26%20member'
    );
  });
});
