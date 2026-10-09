import { describe, expect, it } from 'vitest';

import { TrainerMembersBuildMailtoUrl } from '@/app/frontend_trainer/trainer_members/trainer_members_utils/TrainerMembersBuildMailtoUrl';

describe('TrainerMembersBuildMailtoUrl', () => {
  it('encodes subject and body for mailto delivery', () => {
    expect(TrainerMembersBuildMailtoUrl('member@example.com', 'GymSmart & You', 'Line one & line two')).toBe(
      'mailto:member@example.com?subject=GymSmart%20%26%20You&body=Line%20one%20%26%20line%20two'
    );
  });
});
