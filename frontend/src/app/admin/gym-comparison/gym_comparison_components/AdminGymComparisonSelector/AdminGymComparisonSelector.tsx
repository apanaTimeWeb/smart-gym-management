// RESPONSIBILITY: Renders the gym selector checkboxes (2–4 gyms) for the Gym Comparison module.
'use client';

import { useAdminGymComparisonStore } from '@/app/admin/gym-comparison/gym_comparison_store/useAdminGymComparisonStore';
import { MOCK_GYM_COMPARISON_DATA } from '@/app/admin/gym-comparison/gym_comparison_utils/AdminGymComparisonSharedConstants';

export default function AdminGymComparisonSelector() {
  const { selectedGymIds, toggleGym } = useAdminGymComparisonStore();
  const allGyms = MOCK_GYM_COMPARISON_DATA.gyms;

  return (
    <div className="bg-card rounded-xl border border-border px-5 py-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-secondary whitespace-nowrap">Compare Gyms:</span>
        {allGyms.map((gym) => {
          const selected = selectedGymIds.includes(gym.gymId);
          return (
            <button
              key={gym.gymId}
              onClick={() => toggleGym(gym.gymId)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border motion-safe:transition-all motion-safe:duration-200 ${
                selected
                  ? 'bg-primary-subtle text-primary border-primary'
                  : 'bg-input text-secondary border-border hover:border-primary hover:text-foreground'
              }`}
            >
              {gym.gymName}
            </button>
          );
        })}
        <span className="text-xs text-secondary ml-auto">Select 2–4 gyms</span>
      </div>
    </div>
  );
}
