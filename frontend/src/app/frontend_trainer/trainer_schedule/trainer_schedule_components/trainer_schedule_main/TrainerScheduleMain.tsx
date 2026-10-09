"use client";
// RESPONSIBILITY: Root client orchestrator for the Trainer Schedule module.
import { useTranslations } from 'next-intl';

import TrainerScheduleLeaveRequests from '@/app/frontend_trainer/trainer_schedule/trainer_schedule_components/trainer_schedule_leave_requests/TrainerScheduleLeaveRequests';

import TrainerScheduleRequestLeaveModal from '@/app/frontend_trainer/trainer_schedule/trainer_schedule_components/trainer_schedule_request_leave_modal/TrainerScheduleRequestLeaveModal';

import TrainerScheduleWeeklyAvailability from '@/app/frontend_trainer/trainer_schedule/trainer_schedule_components/trainer_schedule_weekly_availability/TrainerScheduleWeeklyAvailability';

import { useTrainerScheduleStore } from '@/app/frontend_trainer/trainer_schedule/trainer_schedule_store/useTrainerScheduleStore';







/**
 * @description Root client orchestrator for the Trainer Schedule module.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Owns the schedule feature UI responsibility represented by TrainerScheduleMain, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented schedule module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerScheduleMain() {
  const t = useTranslations('TRAINER_SCHEDULE');
  const { activeTab, setActiveTab } = useTrainerScheduleStore();

  return (
    <div className="min-h-full pb-10">
      <div className="p-4 sm:p-6 max-w-screen-xl mx-auto w-full space-y-6">
        {/* Module Tabs */}
        <div className="flex flex-wrap gap-2 bg-card border border-border p-1 rounded-xl w-fit">
          <button type="button"
            onClick={() => setActiveTab('availability')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              activeTab === 'availability' ? 'bg-primary text-on-primary shadow-card' : 'text-secondary hover:text-primary hover:bg-surface-highlight'
            } motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95`}
           data-testid="trainer_schedule-main-weekly_availability">
            {t("TEXT_WEEKLY_AVAILABILITY")}</button>
          <button type="button"
            onClick={() => setActiveTab('leaves')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              activeTab === 'leaves' ? 'bg-primary text-on-primary shadow-card' : 'text-secondary hover:text-primary hover:bg-surface-highlight'
            } motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95`}
           data-testid="trainer_schedule-main-leave_requests">
            {t("TEXT_LEAVE_REQUESTS")}</button>
        </div>

        {/* Tab Content */}
        <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden min-h-96">
          {activeTab === 'availability' && <TrainerScheduleWeeklyAvailability />}
          {activeTab === 'leaves' && <TrainerScheduleLeaveRequests />}
        </div>
      </div>

      <TrainerScheduleRequestLeaveModal />
    </div>
  );
}
