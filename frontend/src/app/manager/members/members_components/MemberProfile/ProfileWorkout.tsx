'use client';

import { useState, useEffect } from 'react';
import { Dumbbell, Plus, Check } from 'lucide-react';
import { useMembersContext } from '@/app/manager/members/members_context/MembersContext';
import { workoutApi } from '@/app/manager/workout/workout_api/workout_api';
import type { Workout } from '@/app/manager/workout/workout_types/workout_types';

export default function ProfileWorkout() {
  const { selectedMember, assignWorkout } = useMembersContext();
  const [isAssigning, setIsAssigning] = useState(false);
  const [availableWorkouts, setAvailableWorkouts] = useState<Workout[]>([]);
  const [loadingWorkouts, setLoadingWorkouts] = useState(false);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string>('');

  useEffect(() => {
    if (isAssigning && availableWorkouts.length === 0) {
      setLoadingWorkouts(true);
      workoutApi.getWorkouts().then(res => {
        setAvailableWorkouts(res.data?.workouts || []);
      }).catch(err => console.error(err)).finally(() => setLoadingWorkouts(false));
    }
  }, [isAssigning, availableWorkouts.length]);

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
    <div className="space-y-6 motion-safe:animate-in fade-in zoom-in-95 duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-primary">Workout Plan</h3>
          <p className="text-sm text-secondary">Manage and track {selectedMember.name}&apos;s daily workouts.</p>
        </div>
        {!hasWorkoutPlan && !isAssigning && (
          <button 
            onClick={() => setIsAssigning(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95"
          >
            <Plus size={16} /> Assign Workout
          </button>
        )}
      </div>

      {isAssigning && (
        <div className="bg-card border border-border p-6 rounded-xl space-y-4 shadow-sm">
          <h4 className="font-semibold text-primary">Assign Workout Plan from Library</h4>
          {loadingWorkouts ? (
            <p className="text-sm text-secondary">Loading workout plans...</p>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                className="flex-1 bg-input border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={selectedWorkoutId}
                onChange={(e) => setSelectedWorkoutId(e.target.value)}
              >
                <option value="">Select a Workout Plan...</option>
                {availableWorkouts.map(w => (
                  <option key={w.id} value={w.id}>{w.name} ({w.level})</option>
                ))}
              </select>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsAssigning(false)}
                  className="px-4 py-2 bg-input text-secondary hover:text-foreground rounded-xl text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAssign}
                  disabled={!selectedWorkoutId}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Check size={16} /> Confirm Assign
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {!hasWorkoutPlan && !isAssigning ? (
        <div className="bg-input border border-border rounded-xl p-10 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
            <Dumbbell size={32} />
          </div>
          <h4 className="text-lg font-semibold text-primary mb-2">No Workout Plan Assigned</h4>
          <p className="text-secondary text-sm max-w-sm mb-6">
            {selectedMember.name} currently does not have an active workout plan. Assign a plan from the Workout Library to get them started.
          </p>
          <button 
            onClick={() => setIsAssigning(true)}
            className="px-6 py-2.5 bg-primary/10 text-primary border border-primary/20 rounded-xl font-semibold hover:bg-primary/20 transition-colors"
          >
            Browse Workout Library
          </button>
        </div>
      ) : workout ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {typeof workout.days === 'number' && workout.days > 0 ? Array.from({ length: workout.days }).map((_, idx) => (
            <div key={idx} className="bg-card border border-border p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h5 className="font-semibold text-primary mb-3 pb-2 border-b border-border text-sm">Day {idx + 1}: {workout.focus}</h5>
              <ul className="space-y-2 text-sm text-secondary">
                <li className="flex justify-between items-center bg-input px-3 py-2 rounded-lg">
                  <span>Main Compound Movement</span> <span className="font-medium text-primary text-xs">3x10</span>
                </li>
                <li className="flex justify-between items-center bg-input px-3 py-2 rounded-lg">
                  <span>Accessory Movement 1</span> <span className="font-medium text-primary text-xs">3x12</span>
                </li>
                <li className="flex justify-between items-center bg-input px-3 py-2 rounded-lg">
                  <span>Accessory Movement 2</span> <span className="font-medium text-primary text-xs">4x8</span>
                </li>
              </ul>
            </div>
          )) : (
            <div className="col-span-full text-center py-4 text-secondary text-sm">No specific days mapped for this workout plan.</div>
          )}
        </div>
      ) : null}
    </div>
  );
}
