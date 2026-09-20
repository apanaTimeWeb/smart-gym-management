// RESPONSIBILITY: Root client orchestrator for the Trainer Schedule module.
'use client';
import { useTrainerScheduleStore } from '@/app/trainer/schedule/schedule_store/useTrainerScheduleStore';
import TrainerWeeklyAvailability from '@/app/trainer/schedule/schedule_components/TrainerWeeklyAvailability/TrainerWeeklyAvailability';
import TrainerLeaveRequests from '@/app/trainer/schedule/schedule_components/TrainerLeaveRequests/TrainerLeaveRequests';
import TrainerRequestLeaveModal from '@/app/trainer/schedule/schedule_components/TrainerRequestLeaveModal/TrainerRequestLeaveModal';

export default function TrainerScheduleMain() {
  const { activeTab, setActiveTab } = useTrainerScheduleStore();

  return (
    <div className="min-h-full pb-10">
      <div className="p-4 sm:p-6 max-w-screen-xl mx-auto w-full space-y-6">
        {/* Module Tabs */}
        <div className="flex flex-wrap gap-2 bg-card border border-border p-1 rounded-xl w-fit">
          <button type="button"
            onClick={() => setActiveTab('availability')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              activeTab === 'availability' ? 'bg-primary text-on-primary shadow' : 'text-secondary hover:text-primary hover:bg-surface-highlight'
            }`}
          >
            Weekly Availability
          </button>
          <button type="button"
            onClick={() => setActiveTab('leaves')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              activeTab === 'leaves' ? 'bg-primary text-on-primary shadow' : 'text-secondary hover:text-primary hover:bg-surface-highlight'
            }`}
          >
            Leave Requests
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden min-h-96">
          {activeTab === 'availability' && <TrainerWeeklyAvailability />}
          {activeTab === 'leaves' && <TrainerLeaveRequests />}
        </div>
      </div>

      <TrainerRequestLeaveModal />
    </div>
  );
}
