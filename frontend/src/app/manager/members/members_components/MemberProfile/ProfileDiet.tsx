'use client';

import { Utensils, Plus } from 'lucide-react';
import { useMembersContext } from '@/app/manager/members/members_context/MembersContext';

export default function ProfileDiet() {
  const { selectedMember } = useMembersContext();

  if (!selectedMember) return null;

  // In a real application, you'd fetch this member's assigned diet plan from an API.
  // We'll mock a simple state here.
  const hasDietPlan = false; // Mock data

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-primary">Diet Plan</h3>
          <p className="text-sm text-secondary">Manage and track {selectedMember.name}'s nutritional goals.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95">
          <Plus size={16} /> Assign Diet
        </button>
      </div>

      {!hasDietPlan ? (
        <div className="bg-input border border-border rounded-xl p-10 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
            <Utensils size={32} />
          </div>
          <h4 className="text-lg font-semibold text-primary mb-2">No Diet Plan Assigned</h4>
          <p className="text-secondary text-sm max-w-sm mb-6">
            {selectedMember.name} currently does not have an active diet plan. Assign a template from the Diet Library.
          </p>
          <button className="px-6 py-2.5 bg-primary/10 text-primary border border-primary/20 rounded-xl font-semibold hover:bg-primary/20 transition-colors">
            Browse Diet Library
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="bg-card border border-border rounded-xl p-4 text-center shadow-sm">
                <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-1">Calories</p>
                <p className="text-xl font-bold text-primary">2,400 <span className="text-sm font-medium text-secondary">kcal</span></p>
             </div>
             <div className="bg-card border border-border rounded-xl p-4 text-center shadow-sm">
                <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-1">Protein</p>
                <p className="text-xl font-bold text-primary">180 <span className="text-sm font-medium text-secondary">g</span></p>
             </div>
             <div className="bg-card border border-border rounded-xl p-4 text-center shadow-sm">
                <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-1">Carbs</p>
                <p className="text-xl font-bold text-primary">250 <span className="text-sm font-medium text-secondary">g</span></p>
             </div>
             <div className="bg-card border border-border rounded-xl p-4 text-center shadow-sm">
                <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-1">Fats</p>
                <p className="text-xl font-bold text-primary">75 <span className="text-sm font-medium text-secondary">g</span></p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Breakfast', 'Lunch', 'Dinner'].map((meal, idx) => (
              <div key={idx} className="bg-card border border-border p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h5 className="font-semibold text-primary mb-3 pb-2 border-b border-border text-sm flex items-center justify-between">
                  {meal}
                  <span className="text-xs font-normal text-secondary bg-input px-2 py-1 rounded">~600 kcal</span>
                </h5>
                <ul className="space-y-2 text-sm text-secondary">
                  <li className="flex items-center gap-2 before:content-['•'] before:text-primary">
                    Oats with Whey Protein
                  </li>
                  <li className="flex items-center gap-2 before:content-['•'] before:text-primary">
                    2 Whole Eggs, 3 Egg Whites
                  </li>
                  <li className="flex items-center gap-2 before:content-['•'] before:text-primary">
                    1 Banana
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
