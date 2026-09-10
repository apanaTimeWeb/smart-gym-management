// RESPONSIBILITY: Root client orchestrator for the Trainer Schedule module.
'use client';

import { useScheduleContext, ScheduleProvider } from '@/app/trainer/schedule/schedule_context/TrainerScheduleContext';
import TrainerWeeklyAvailability from '@/app/trainer/schedule/schedule_components/TrainerWeeklyAvailability/TrainerWeeklyAvailability';
import TrainerLeaveRequests from '@/app/trainer/schedule/schedule_components/TrainerLeaveRequests/TrainerLeaveRequests';
import TrainerRequestLeaveModal from '@/app/trainer/schedule/schedule_components/TrainerRequestLeaveModal/TrainerRequestLeaveModal';
import TrainerToast from '@/app/trainer/trainer_components/TrainerFeedback/TrainerToast';

function ScheduleContent() {
  const { activeTab, setActiveTab, toast, hideToast } = useScheduleContext();

  return (
    <div className="min-h-full pb-10">
            
      <div className="p-4 sm:p-6 max-w-screen-xl mx-auto w-full space-y-6">
        {/* Module Tabs */}
        <div className="flex flex-wrap gap-2 bg-card border border-border p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('availability')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              activeTab === 'availability' ? 'bg-primary text-primary-foreground shadow' : 'text-secondary hover:text-foreground hover:bg-accent'
            }`}
          >
            Weekly Availability
          </button>
          <button
            onClick={() => setActiveTab('leaves')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              activeTab === 'leaves' ? 'bg-primary text-primary-foreground shadow' : 'text-secondary hover:text-foreground hover:bg-accent'
            }`}
          >
            Leave Requests
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden min-h-[500px]">
          {activeTab === 'availability' && <TrainerWeeklyAvailability />}
          {activeTab === 'leaves' && <TrainerLeaveRequests />}
        </div>
      </div>

      <TrainerRequestLeaveModal />
      {toast && <TrainerToast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}

export default function TrainerScheduleMain() {
  return (
    <ScheduleProvider>
      <ScheduleContent />
    </ScheduleProvider>
  );
}
