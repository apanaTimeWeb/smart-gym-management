'use client';
// RESPONSIBILITY: Renders the member's assigned diet plan and handles diet plan assignment for trainers.
// DATA FLOW: useMembersContext -> TrainerMembersProfileDiet -> libraryApi

import { useState } from 'react';
import { Apple, Plus, Check, MessageCircle, RefreshCw, Flame, PieChart, Utensils } from 'lucide-react';
import { useTrainerMembersStore } from '@/app/trainer/members/members_store/useTrainerMembersStore';
import { useTrainerSelectedMember } from '@/app/trainer/members/members_queries/useTrainerSelectedMember';
import TrainerSearchableDropdown from '@/app/trainer/trainer_components/TrainerShared/TrainerSearchableDropdown/TrainerSearchableDropdown';
import { displayValue } from '@/lib/formatters';
import { useTrainerMembersMutations } from '@/app/trainer/members/members_queries/useTrainerMembersMutations';
import { useTrainerMemberDietPlansQuery } from '@/app/trainer/members/members_queries/useTrainerMembersQuery';

export default function TrainerMembersProfileDiet() {
  const { member: selectedMember } = useTrainerSelectedMember();
  const { assignDiet } = useTrainerMembersMutations();
  const [isAssigning, setIsAssigning] = useState(false);
  const [selectedDietId, setSelectedDietId] = useState('');
  const [saving, setSaving] = useState(false);
  const dietsQuery = useTrainerMemberDietPlansQuery(isAssigning);
  const availableDiets = dietsQuery.data ?? [];

  if (!selectedMember) return null;

  const diet = selectedMember.assignedDiet;
  const hasDietPlan = !!diet;

  const handleAssign = async () => {
    if (!selectedDietId) return;
    const selected = availableDiets.find((d) => String(d.id) === selectedDietId) || null;
    setSaving(true);
    try {
      await assignDiet.mutateAsync({ id: selectedMember.id, diet: selected });
      setIsAssigning(false);
      setSelectedDietId('');
    } finally {
      setSaving(false);
    }
  };

  const handleShareWhatsApp = () => {
    if (!diet) return;
    const mealsText = Array.isArray(diet.meals) 
      ? diet.meals.map((m: string | { name?: string; time?: string; items?: string; description?: string }, i: number) => typeof m === 'string' ? `• ${m}` : `• *${m.name || `Meal ${i+1}`}* (${m.time || ''}): ${m.items || m.description || ''}`).join('\n')
      : 'Follow balanced nutrition as advised.';

    const text = `*GYMSMART NUTRITION & DIET PLAN FOR ${selectedMember.name.toUpperCase()}*\n` +
      `Plan: *${diet.name}*\n` +
      `Goal: ${displayValue(diet.goal)}\n` +
      `Target Calories: *${displayValue(diet.calories)} kcal*\n` +
      `Macros: Protein ${displayValue(diet.protein)}g · Carbs ${displayValue(diet.carbs)}g · Fats ${displayValue(diet.fats)}g\n\n` +
      `*Meal Schedule:*\n${mealsText}\n\n` +
      '';
    window.open(`https://wa.me/${selectedMember.phone?.replace(/[^0-9]/g, '') || ''}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-6 motion-safe:animate-in fade-in motion-safe:duration-slow">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">Diet & Nutrition Plan</h3>
          <p className="text-sm text-secondary">Manage and customize daily meal requirements for {selectedMember.name}.</p>
        </div>
        <div className="flex items-center gap-2">
          {hasDietPlan ? (
            <>
              <button 
                onClick={handleShareWhatsApp}
                className="flex items-center gap-2 px-4 py-2 bg-success text-white rounded-xl text-sm font-semibold hover:opacity-90 shadow-sm motion-safe:transition-all motion-safe:active:scale-95"
              >
                <MessageCircle size={16} /> Share via WhatsApp
              </button>
              <button 
                onClick={() => {
                  setSelectedDietId(diet.id || '');
                  setIsAssigning(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-input text-foreground border border-border rounded-xl text-sm font-semibold hover:bg-primary-subtle motion-safe:transition-all motion-safe:active:scale-95"
              >
                <RefreshCw size={15} /> Change Diet
              </button>
            </>
          ) : !isAssigning ? (
            <button 
              onClick={() => setIsAssigning(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-primary/30 motion-safe:transition-all motion-safe:active:scale-95"
            >
              <Plus size={16} /> Assign Diet Plan
            </button>
          ) : null}
        </div>
      </div>

      {/* Plan Assignment Box */}
      {isAssigning && (
        <div className="bg-card border border-primary/30 p-5 rounded-2xl space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-primary flex items-center gap-2">
              <Apple size={18} /> Select Diet Plan from Library
            </h4>
            <button 
              onClick={() => setIsAssigning(false)}
              className="text-xs text-secondary hover:text-foreground font-medium"
            >
              Cancel
            </button>
          </div>

          {dietsQuery.isPending ? (
            <p className="text-sm text-secondary py-3">Loading available diet plans...</p>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <TrainerSearchableDropdown
                options={availableDiets.map((diet) => ({ value: diet.id, label: `${diet.name} · ${displayValue(diet.goal)}` }))}
                value={selectedDietId}
                onChange={(value: string | number) => setSelectedDietId(String(value))}
                placeholder="Choose a Diet Plan"
                className="w-full"
              />
              <div className="flex gap-2">
                <button 
                  onClick={handleAssign}
                  disabled={!selectedDietId || saving}
                  className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:shadow-md motion-safe:transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  <Check size={16} /> {saving ? 'Assigning...' : 'Confirm Assignment'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Active Diet Display */}
      {hasDietPlan ? (
        <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success-bg text-success">
                  Active Diet
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-info-bg text-info">
                  {displayValue(diet.goal)}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-foreground">{diet.name}</h3>
              <p className="text-sm text-secondary mt-1">{displayValue(diet.description)}</p>
            </div>
            <div className="bg-input/60 border border-border rounded-xl px-4 py-3 text-right">
              <p className="text-xs text-secondary">Target Daily Calories</p>
              <p className="text-2xl font-black text-primary flex items-center gap-1 justify-end">
                <Flame size={20} className="text-danger" /> {displayValue(diet.calories)} <span className="text-xs text-secondary font-normal">kcal</span>
              </p>
            </div>
          </div>

          {/* Macro Breakdown */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-input/50 border border-border rounded-xl p-4 text-center">
              <p className="text-xs text-secondary font-medium">Protein</p>
              <p className="text-xl font-bold text-info mt-0.5">{displayValue(diet.protein)}g</p>
            </div>
            <div className="bg-input/50 border border-border rounded-xl p-4 text-center">
              <p className="text-xs text-secondary font-medium">Carbohydrates</p>
              <p className="text-xl font-bold text-warning mt-0.5">{displayValue(diet.carbs)}g</p>
            </div>
            <div className="bg-input/50 border border-border rounded-xl p-4 text-center">
              <p className="text-xs text-secondary font-medium">Healthy Fats</p>
              <p className="text-xl font-bold text-purple mt-0.5">{displayValue(diet.fats)}g</p>
            </div>
          </div>

          {/* Meals Schedule */}
          <div>
            <h4 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-3 flex items-center gap-2">
              <Utensils size={15} /> Daily Meal Schedule
            </h4>
            {diet.meals && diet.meals.length > 0 ? (
              <div className="space-y-2.5">
                {diet.meals.map((meal: string | { name?: string; time?: string; items?: string; description?: string }, idx: number) => (
                  <div key={typeof meal === 'string' ? `${meal}-${idx}` : `${meal.name}-${idx}`} className="bg-input/40 border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-primary-subtle text-primary text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-foreground">
                          {typeof meal === 'string' ? `Meal ${idx + 1}` : meal.name || `Meal ${idx + 1}`}
                        </p>
                        <p className="text-xs text-secondary mt-0.5">
                          {typeof meal === 'string' ? meal : meal.items || meal.description || 'Nutritional items as planned'}
                        </p>
                      </div>
                    </div>
                    {typeof meal !== 'string' && meal.time && (
                      <span className="text-xs font-medium text-secondary bg-background px-2.5 py-1 rounded-md border border-border w-fit">
                        {meal.time}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-input/40 border border-dashed border-border rounded-xl p-6 text-center text-secondary text-sm">
                No individual meal entries listed. Follow standard portion guidelines.
              </div>
            )}
          </div>
        </div>
      ) : !isAssigning ? (
        <div className="bg-card border border-dashed border-border rounded-2xl p-12 text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-success-bg text-success flex items-center justify-center mx-auto">
            <Apple size={26} />
          </div>
          <h4 className="text-lg font-bold text-foreground">No Diet Plan Assigned</h4>
          <p className="text-sm text-secondary max-w-md mx-auto">
            {selectedMember.name} does not have an active nutrition plan. Assign a diet plan from the library to help them meet calorie and macro goals.
          </p>
          <button
            onClick={() => setIsAssigning(true)}
            className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:shadow-md motion-safe:transition-all"
          >
            <Plus size={16} /> Assign Diet Plan
          </button>
        </div>
      ) : null}
    </div>
  );
}
