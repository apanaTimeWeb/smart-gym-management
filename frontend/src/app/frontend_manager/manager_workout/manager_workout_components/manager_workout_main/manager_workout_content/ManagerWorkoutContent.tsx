// RESPONSIBILITY: Renders ManagerWorkoutContent's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ManagerHeader from '@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader';
import { getManagerErrorMessage } from '@/app/frontend_manager/manager_infrastructure/ManagerErrorMessage';
import ManagerWorkoutBanner from '@/app/frontend_manager/manager_workout/manager_workout_components/manager_workout_banner/ManagerWorkoutBanner';
import ManagerWorkoutExerciseModal from '@/app/frontend_manager/manager_workout/manager_workout_components/manager_workout_exercise_modal/ManagerWorkoutExerciseModal';
import ManagerWorkoutExerciseTable from '@/app/frontend_manager/manager_workout/manager_workout_components/manager_workout_exercise_table/ManagerWorkoutExerciseTable';
import ManagerWorkoutModal from '@/app/frontend_manager/manager_workout/manager_workout_components/manager_workout_modal/ManagerWorkoutModal';
import ManagerWorkoutPlansGrid from '@/app/frontend_manager/manager_workout/manager_workout_components/manager_workout_plans_grid/ManagerWorkoutPlansGrid';
import ManagerWorkoutToolbar from '@/app/frontend_manager/manager_workout/manager_workout_components/manager_workout_toolbar/ManagerWorkoutToolbar';
import { useManagerWorkoutLogic } from '@/app/frontend_manager/manager_workout/manager_workout_hooks/useManagerWorkoutLogic';
import { useWorkoutAssignmentsQuery } from '@/app/frontend_manager/manager_workout/manager_workout_hooks/useManagerWorkoutQueries';
import { ManagerWorkoutFormatDate } from '@/app/frontend_manager/manager_workout/manager_workout_utils/ManagerWorkoutFormatters';


/** @description Renders the ManagerWorkoutContent component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (11 documented module/import dependencies).. @edge-case Preserves loading state, error state, modal lifecycle. */
export function ManagerWorkoutContent() {
  const t = useTranslations('MANAGER_WORKOUT');

  const { tab } = useManagerWorkoutLogic();
  const { data: assignments = [], isPending: assignmentsLoading, isError: assignmentsError, error: assignmentsErrorValue } = useWorkoutAssignmentsQuery();
  const [activeTab, setActiveTab] = useState('View Workout Plans');

  return (
  <div className="min-h-full pb-10 workout-module bg-page text-primary">
  <ManagerHeader data-testid="manager_workout-managerworkoutcontent-managerheader-1" title={t("COPY_WORKOUT_MANAGEMENT")} subtitle={t("COPY_COMPREHENSIVE_EXERCISE_WORKOUT_PLAN_DATABASE")} />
  
  <div className="p-6 space-y-5">
  <ManagerWorkoutBanner />

   <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
     <div className="border-b border-border flex gap-4 p-4 overflow-x-auto">
       {[t('COPY_VIEW_WORKOUT_PLANS'), t('COPY_VIEW_ASSIGNED_PLANS'), t('COPY_EXERCISE_LIBRARY')].map((t, mapIndex) => (
         <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`px-4 py-2 whitespace-nowrap font-semibold border-b-2 motion-safe:transition-all ${activeTab === t ? 'text-primary border-primary' : 'text-secondary border-transparent hover:text-primary'} motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_workout-workout-managerworkoutcontent-button-view-workout-plans-${mapIndex}`} 
           key={t}
           onClick={() => setActiveTab(t)} 
           
         >
           {t}
         </button>
       ))}
     </div>

     {activeTab === 'View Workout Plans' && (
       <>
         <ManagerWorkoutToolbar />
         <div className="p-5">
           {tab === 'Workout Plans' ? <ManagerWorkoutPlansGrid /> : <ManagerWorkoutExerciseTable />}
         </div>
       </>
     )}

     {activeTab === 'View Assigned Plans' && (
       <div className="p-5">
         <h3 className="text-lg font-bold text-primary mb-4">{t("COPY_ASSIGNED_WORKOUT_PLANS")}</h3>
         {(() => { if (assignmentsLoading) return <div className="h-32 bg-input rounded-xl motion-safe:animate-pulse" aria-label={t("COPY_LOADING_ASSIGNED_PLANS")}/>; return (() => { if (assignmentsError) return <p data-testid="manager_workout-manager-workout-content-status" role="alert" className="text-sm text-danger">{getManagerErrorMessage(assignmentsErrorValue)}</p>; return <div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className="border-b border-border"><th className="py-3 px-4 text-sm font-medium text-secondary">{t("COPY_MEMBER_NAME")}</th><th className="py-3 px-4 text-sm font-medium text-secondary">{t("COPY_ASSIGNED_PLAN")}</th><th className="py-3 px-4 text-sm font-medium text-secondary">{t("COPY_ASSIGNED")}</th><th className="py-3 px-4 text-sm font-medium text-secondary">{t("COPY_START_DATE")}</th></tr></thead><tbody className="divide-y divide-border">{assignments.map((assignment) => <tr key={assignment.id}><td className="py-3 px-4 text-sm text-primary">{assignment.memberName}</td><td className="py-3 px-4 text-sm text-secondary">{assignment.planName}</td><td className="py-3 px-4 text-sm text-secondary">{assignment.assignedBy}</td><td className="py-3 px-4 text-sm text-secondary">{ManagerWorkoutFormatDate(assignment.startDate)}</td></tr>)}</tbody></table></div>; })(); })()}
       </div>
     )}

     {activeTab === 'Exercise Library' && (
       <>
         <ManagerWorkoutToolbar />
         <div className="p-5">
           <ManagerWorkoutExerciseTable />
         </div>
       </>
     )}
  </div>
  </div>

 <ManagerWorkoutModal />
 <ManagerWorkoutExerciseModal />
 </div>
 );
}
