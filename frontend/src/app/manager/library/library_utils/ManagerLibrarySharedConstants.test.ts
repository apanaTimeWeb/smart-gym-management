import { describe, expect, it } from 'vitest';
import { GOALS } from '@/app/manager/library/library_utils/ManagerLibrarySharedConstants';


describe('ManagerLibrarySharedConstants', () => {
  it('contains the supported diet-plan goals', () => {
    expect(GOALS).toEqual(['Weight Loss', 'Muscle Gain', 'Maintenance', 'Endurance', 'Flexibility']);
  });
});
