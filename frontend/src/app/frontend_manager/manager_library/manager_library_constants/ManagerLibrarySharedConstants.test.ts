import { describe, expect, it } from 'vitest';
import { GOALS } from '@/app/frontend_manager/manager_library/manager_library_constants/ManagerLibrarySharedConstants';


describe('ManagerLibrarySharedConstants', () => {
  it('contains the supported diet-plan goals', () => {
    expect(GOALS).toEqual(['Weight Loss', 'Muscle Gain', 'Maintenance', 'Endurance', 'Flexibility']);
  });
});
