// RESPONSIBILITY: Renders the ManagerWorkoutContent sub-view extracted from ManagerWorkoutMain; owns only this presentation responsibility.
'use client';
import { useState } from 'react';
import { formatDate } from '@/lib/formatters';
import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import { getManagerErrorMessage } from '@/app/manager/manager_infrastructure/ManagerErrorMessage';
import ManagerWorkoutBanner from '@/app/manager/workout/workout_components/ManagerWorkoutBanner/ManagerWorkoutBanner';
import ManagerWorkoutExerciseModal from '@/app/manager/workout/workout_components/ManagerWorkoutExerciseModal/ManagerWorkoutExerciseModal';
import ManagerWorkoutExerciseTable from '@/app/manager/workout/workout_components/ManagerWorkoutExerciseTable/ManagerWorkoutExerciseTable';
import ManagerWorkoutModal from '@/app/manager/workout/workout_components/ManagerWorkoutModal/ManagerWorkoutModal';
import ManagerWorkoutPlansGrid from '@/app/manager/workout/workout_components/ManagerWorkoutPlansGrid/ManagerWorkoutPlansGrid';
import ManagerWorkoutToolbar from '@/app/manager/workout/workout_components/ManagerWorkoutToolbar/ManagerWorkoutToolbar';
import { useManagerWorkoutLogic  } from '@/app/manager/workout/workout_hooks/ManagerUseManagerWorkoutLogic';
import { useWorkoutAssignmentsQuery } from '@/app/manager/workout/workout_hooks/ManagerUseManagerWorkoutQueries';


export function ManagerWorkoutContent() {
  const { tab } = useManagerWorkoutLogic();
  const { data: assignments = [], isPending: assignmentsLoading, isError: assignmentsError, error: assignmentsErrorValue } = useWorkoutAssignmentsQuery();
  const [activeTab, setActiveTab] = useState('View Workout Plans');

  return (
  <div className="min-h-full pb-10 workout-module bg-page text-primary">
  <ManagerHeader title="Workout Management" subtitle="Comprehensive exercise and workout plan database" />
  
  <div className="p-6 space-y-5">
  <ManagerWorkoutBanner />

   <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
     <div className="border-b border-border flex gap-4 p-4 overflow-x-auto">
       {['View Workout Plans', 'View Assigned Plans', 'Exercise Library'].map(t => (
         <button 
           key={t}
           onClick={() => setActiveTab(t)} 
           className={`px-4 py-2 whitespace-nowrap font-semibold border-b-2 motion-safe:transition-colors ${activeTab === t ? 'text-primary border-primary' : 'text-secondary border-transparent hover:text-primary'}`}
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
         <h3 className="text-lg font-bold text-primary mb-4">Assigned Workout Plans</h3>
         {assignmentsLoading ? <div className="h-32 bg-input rounded-xl motion-safe:animate-pulse" aria-label="Loading assigned plans" /> : assignmentsError ? <p role="alert" className="text-sm text-danger">{getManagerErrorMessage(assignmentsErrorValue)}</p> : <div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className="border-b border-border"><th className="py-3 px-4 text-sm font-medium text-secondary">Member Name</th><th className="py-3 px-4 text-sm font-medium text-secondary">Assigned Plan</th><th className="py-3 px-4 text-sm font-medium text-secondary">Assigned By</th><th className="py-3 px-4 text-sm font-medium text-secondary">Start Date</th></tr></thead><tbody className="divide-y divide-border">{assignments.map((assignment) => <tr key={assignment.id}><td className="py-3 px-4 text-sm text-primary">{assignment.memberName}</td><td className="py-3 px-4 text-sm text-secondary">{assignment.planName}</td><td className="py-3 px-4 text-sm text-secondary">{assignment.assignedBy}</td><td className="py-3 px-4 text-sm text-secondary">{formatDate(assignment.startDate)}</td></tr>)}</tbody></table></div>}
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
