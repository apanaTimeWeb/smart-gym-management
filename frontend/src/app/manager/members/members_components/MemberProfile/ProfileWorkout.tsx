'use client';

import { Dumbbell, Plus } from 'lucide-react';
import { useMembersContext } from '@/app/manager/members/members_context/MembersContext';

export default function ProfileWorkout() {
  const { selectedMember } = useMembersContext();

  if (!selectedMember) return null;

  // In a real application, you'd fetch this member's assigned workout plan from an API.
  // We'll mock a simple state here.
  const hasWorkoutPlan = false; // Mock data

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-primary">Workout Plan</h3>
          <p className="text-sm text-secondary">Manage and track {selectedMember.name}&apos;s daily workouts.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95">
          <Plus size={16} /> Assign Workout
        </button>
      </div>

      {!hasWorkoutPlan ? (
        <div className="bg-input border border-border rounded-xl p-10 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
            <Dumbbell size={32} />
          </div>
          <h4 className="text-lg font-semibold text-primary mb-2">No Workout Plan Assigned</h4>
          <p className="text-secondary text-sm max-w-sm mb-6">
            {selectedMember.name} currently does not have an active workout plan. Assign a plan from the Workout Library to get them started.
          </p>
          <button className="px-6 py-2.5 bg-primary/10 text-primary border border-primary/20 rounded-xl font-semibold hover:bg-primary/20 transition-colors">
            Browse Workout Library
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Mock days */}
          {['Monday (Chest & Triceps)', 'Tuesday (Back & Biceps)', 'Wednesday (Rest)', 'Thursday (Legs)', 'Friday (Shoulders & Core)'].map((day, idx) => (
            <div key={idx} className="bg-card border border-border p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h5 className="font-semibold text-primary mb-3 pb-2 border-b border-border text-sm">{day}</h5>
              {day.includes('Rest') ? (
                <p className="text-sm text-secondary italic">Rest Day - No workout assigned.</p>
              ) : (
                <ul className="space-y-2 text-sm text-secondary">
                  <li className="flex justify-between items-center bg-input px-3 py-2 rounded-lg">
                    <span>Bench Press</span> <span className="font-medium text-primary text-xs">3x10</span>
                  </li>
                  <li className="flex justify-between items-center bg-input px-3 py-2 rounded-lg">
                    <span>Incline Dumbbell</span> <span className="font-medium text-primary text-xs">3x12</span>
                  </li>
                  <li className="flex justify-between items-center bg-input px-3 py-2 rounded-lg">
                    <span>Tricep Pushdown</span> <span className="font-medium text-primary text-xs">4x15</span>
                  </li>
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
