// RESPONSIBILITY: Renders the member's assigned workout plan and handles the assignment flow.
'use client';
// DATA FLOW: useManagerMembersLogic -> ManagerProfileWorkout -> workoutApi
import{ useState } from 'react';
import { Dumbbell, Plus, Check, MessageCircle, Edit2 } from 'lucide-react';
import ManagerSearchableDropdown from '@/app/manager/manager_components/ManagerShared/ManagerSearchableDropdown';
import { useManagerMembersLogic } from '@/app/manager/members/members_hooks/ManagerUseManagerMembersLogic';
import { useManagerMembersWorkoutPlansQuery } from '@/app/manager/members/members_hooks/ManagerUseManagerMembersWorkoutPlansQuery';
import { ManagerMembersUrlConfig } from '@/app/manager/members/members_url_config';


export default function ManagerProfileWorkout() {
  const { selectedMember, assignWorkout } = useManagerMembersLogic();
  const [isAssigning, setIsAssigning] = useState(false);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string>('');

  const { data: workoutResponse, isPending: workoutsLoading } = useManagerMembersWorkoutPlansQuery(isAssigning);
  const availableWorkouts = workoutResponse?.data || [];


  if (!selectedMember) return null;

  const hasWorkoutPlan = !!selectedMember.assignedWorkout;
  const workout = selectedMember.assignedWorkout;

  const handleAssign = async () => {
    if (!selectedWorkoutId) return;
  const selected = availableWorkouts.find(w => String(w.id) === selectedWorkoutId) || null;
    await assignWorkout(selectedMember.id, selected);
    setIsAssigning(false);
  };

  return (
    <div className="space-y-6 motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-slow">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-primary">Workout Plan</h3>
          <p className="text-sm text-secondary">Manage and track {selectedMember.name}&apos;s daily workouts.</p>
        </div>
        {hasWorkoutPlan ? (
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                const text = `*WORKOUT PLAN: ${workout?.name || 'Assigned'}*\nLevel: ${workout?.level || 'N/A'}\n\n*Routine:*\n${(workout?.days || []).map(d => `*Day ${d.day}: ${d.focus}*\n${(d.exercises || []).length === 0 ? 'Rest Day' : (d.exercises || []).map(e => `- ${e.name} (${e.sets}x${e.reps})`).join('\n')}`).join('\n\n')}`;
                window.open(`${ManagerMembersUrlConfig.INTEGRATIONS.WHATSAPP_WEB_BASE}/?text=${encodeURIComponent(text)}`, '_blank');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-success text-on-success rounded-xl text-sm font-semibold hover:shadow-card hover:shadow-card motion-safe:transition-all motion-safe:active:scale-95"
            >
              <MessageCircle size={18} /> Send via WhatsApp
            </button>
            <button 
              onClick={() => setIsAssigning(true)}
              className="flex items-center gap-2 px-4 py-2 bg-input text-primary border border-border rounded-xl text-sm font-semibold hover:bg-primary-subtle motion-safe:transition-all motion-safe:active:scale-95"
            >
              <Edit2 size={18} /> Change
            </button>
          </div>
        ) : !isAssigning && (
          <button 
            onClick={() => setIsAssigning(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:shadow-card hover:shadow-card motion-safe:transition-all motion-safe:active:scale-95"
          >
            <Plus size={18} /> Assign Workout
          </button>
        )}
      </div>

      {isAssigning && (
        <div className="bg-card border border-border p-6 rounded-xl space-y-4 shadow-card">
          <h4 className="font-semibold text-primary">Assign Workout Plan from Library</h4>
          {workoutsLoading ? (
            <p className="text-sm text-secondary">Loading workout plans...</p>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4">
              <ManagerSearchableDropdown
                value={selectedWorkoutId}
                onChange={(value) => setSelectedWorkoutId(String(value))}
                options={availableWorkouts.map((workoutPlan) => ({ value: workoutPlan.id, label: `${workoutPlan.name} (${workoutPlan.level})` }))}
                placeholder="Select a Workout Plan..."
                className="flex-1"
              />
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsAssigning(false)}
                  className="px-4 py-2 bg-input text-secondary hover:text-primary rounded-xl text-sm font-semibold motion-safe:transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAssign}
                  disabled={!selectedWorkoutId}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed motion-safe:transition-colors"
                >
                  <Check size={18} /> Confirm Assign
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {!hasWorkoutPlan && !isAssigning ? (
        <div className="bg-input border border-border rounded-xl p-10 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-primary-subtle flex items-center justify-center text-primary mb-4">
            <Dumbbell size={18} />
          </div>
          <h4 className="text-lg font-semibold text-primary mb-2">No Workout Plan Assigned</h4>
          <p className="text-secondary text-sm max-w-sm mb-6">
            {selectedMember.name} currently does not have an active workout plan. Assign a plan from the Workout Library to get them started.
          </p>
          <button 
            onClick={() => setIsAssigning(true)}
            className="px-6 py-2.5 bg-primary-subtle text-primary border border-border rounded-xl font-semibold hover:bg-primary-subtle motion-safe:transition-colors"
          >
            Browse Workout Library
          </button>
        </div>
      ) : workout ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-xl p-4 text-center shadow-card">
              <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-1">Days</p>
              <p className="text-lg font-bold text-primary">{workout.days?.length || 0}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 text-center shadow-card">
              <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-1">Focus</p>
              <p className="text-lg font-bold text-primary">{workout.goal || 'General'}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 text-center shadow-card">
              <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-1">Days Per Week</p>
              <p className="text-lg font-bold text-primary">{workout.daysPerWeek || 'Varied'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workout.days && workout.days.length > 0 ? (
              workout.days.map((day, idx) => (
                <div key={`actual-day-${day.day ?? `focus-${day.focus}`}-${day.focus}`} className="bg-card border border-border p-4 rounded-xl shadow-card hover:shadow-card motion-safe:transition-shadow">
                  <h5 className="font-semibold text-primary mb-3 pb-2 border-b border-border text-sm">Day {day.day || idx + 1}: {day.focus}</h5>
                  {(!day.exercises || day.exercises.length === 0) ? (
                    <p className="text-sm text-secondary italic">Rest Day - No workout assigned.</p>
                  ) : (
                    <ul className="space-y-2 text-sm text-secondary">
                      {day.exercises.map((ex, i) => (
                        <li key={`act-ex-${ex.name}-${ex.sets}-${ex.reps}`} className="flex justify-between items-center bg-input px-3 py-2 rounded-lg">
                          <span>{ex.name}</span> <span className="font-medium text-primary text-xs">{ex.sets}x{ex.reps}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full bg-input border border-border rounded-xl p-6 text-center">
                <Dumbbell className="mx-auto text-secondary mb-3" size={18} />
                <p className="text-lg text-primary font-bold">{workout.name}</p>
                <p className="text-secondary text-sm mt-2 max-w-md mx-auto">
                  This plan is a {workout.level} level routine focused on {workout.goal}, spanning {workout.days?.length || 0} days per cycle.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
