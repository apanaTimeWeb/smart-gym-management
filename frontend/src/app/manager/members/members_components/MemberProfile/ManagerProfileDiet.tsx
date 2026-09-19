'use client';
// RESPONSIBILITY: Renders the member's assigned diet plan and handles the assignment flow.
// DATA FLOW: useManagerMembersLogic -> ManagerProfileDiet -> libraryApi
import { ManagerMembersUrlConfig } from '@/app/manager/members/members_url_config';
import{ useState } from 'react';
import { Utensils, Plus, Check, MessageCircle, Edit2 } from 'lucide-react';
import { formatNumber } from '@/lib/formatters';
import { useManagerMembersLogic } from '@/app/manager/members/members_hooks/ManagerUseManagerMembersLogic';
import { useManagerMembersDietPlansQuery } from '@/app/manager/members/members_api/ManagerUseManagerMembersDietPlansQuery';

export default function ManagerProfileDiet() {
  const { selectedMember, assignDiet } = useManagerMembersLogic();
  const [isAssigning, setIsAssigning] = useState(false);
  const [selectedDietId, setSelectedDietId] = useState<string>('');

  const { data: dietResponse, isPending: dietsLoading } = useManagerMembersDietPlansQuery(isAssigning);
  const availableDiets = dietResponse?.data || [];


  if (!selectedMember) return null;

  const hasDietPlan = !!selectedMember.assignedDiet;
  const diet = selectedMember.assignedDiet;

  const handleAssign = async () => {
    if (!selectedDietId) return;
  const selected = availableDiets.find(d => String(d.id) === selectedDietId) || null;
    await assignDiet(selectedMember.id, selected);
    setIsAssigning(false);
  };

  return (
    <div className="space-y-6 motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-primary">Diet Plan</h3>
          <p className="text-sm text-secondary">Manage and track {selectedMember.name}&apos;s nutritional goals.</p>
        </div>
        {hasDietPlan ? (
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                const text = `*DIET PLAN: ${diet?.name || 'Assigned'}*\n\n*Macros:*\nCalories: ${diet?.calories || 0} kcal\nProtein: ${diet?.protein || 0}g\nCarbs: ${diet?.carbs || 0}g\nFats: ${diet?.fats || 0}g\n\n*Meals:*\n${diet?.meals?.map(m => `*${m.time} - ${m.name}* (${m.calories || 0} kcal)\n${(m.foods || []).map((f: string) => `- ${f}`).join('\n')}`).join('\n\n')}`;
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
            <Plus size={18} /> Assign Diet
          </button>
        )}
      </div>

      {isAssigning && (
        <div className="bg-card border border-border p-6 rounded-xl space-y-4 shadow-card">
          <h4 className="font-semibold text-primary">Assign Diet Plan from Library</h4>
          {dietsLoading ? (
            <p className="text-sm text-secondary">Loading diet plans...</p>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={selectedDietId}
                onChange={(e) => setSelectedDietId(e.target.value)}
                className="flex-1 bg-input border border-border rounded-xl px-4 py-2.5 text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary motion-safe:transition-all"
              >
                <option value="">Select a Diet Plan...</option>
                {availableDiets.map((diet) => (
                  <option key={diet.id} value={diet.id}>{diet.name} ({diet.type})</option>
                ))}
              </select>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsAssigning(false)}
                  className="px-4 py-2 bg-input text-secondary hover:text-primary rounded-xl text-sm font-semibold motion-safe:transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAssign}
                  disabled={!selectedDietId}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed motion-safe:transition-colors"
                >
                  <Check size={18} /> Confirm Assign
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {!hasDietPlan && !isAssigning ? (
        <div className="bg-input border border-border rounded-xl p-10 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
            <Utensils size={18} />
          </div>
          <h4 className="text-lg font-semibold text-primary mb-2">No Diet Plan Assigned</h4>
          <p className="text-secondary text-sm max-w-sm mb-6">
            {selectedMember.name} currently does not have an active diet plan. Assign a template from the Diet Library.
          </p>
          <button 
            onClick={() => setIsAssigning(true)}
            className="px-6 py-2.5 bg-primary/10 text-primary border border-primary/20 rounded-xl font-semibold hover:bg-primary/20 motion-safe:transition-colors"
          >
            Browse Diet Library
          </button>
        </div>
      ) : diet ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="bg-card border border-border rounded-xl p-4 text-center shadow-card">
                <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-1">Calories</p>
                <p className="text-xl font-bold text-primary">{formatNumber(diet.calories || 0)} <span className="text-sm font-medium text-secondary">kcal</span></p>
             </div>
             <div className="bg-card border border-border rounded-xl p-4 text-center shadow-card">
                <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-1">Protein</p>
                <p className="text-xl font-bold text-primary">{diet.protein || 0} <span className="text-sm font-medium text-secondary">g</span></p>
             </div>
             <div className="bg-card border border-border rounded-xl p-4 text-center shadow-card">
                <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-1">Carbs</p>
                <p className="text-xl font-bold text-primary">{diet.carbs || 0} <span className="text-sm font-medium text-secondary">g</span></p>
             </div>
             <div className="bg-card border border-border rounded-xl p-4 text-center shadow-card">
                <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-1">Fats</p>
                <p className="text-xl font-bold text-primary">{diet.fats || 0} <span className="text-sm font-medium text-secondary">g</span></p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {diet.meals && diet.meals.length > 0 ? diet.meals.map((meal, idx) => {
              return (
                <div key={`meal-${meal.name}-${idx}`} className="bg-card border border-border p-4 rounded-xl shadow-card hover:shadow-card motion-safe:transition-shadow">
                  <h5 className="font-semibold text-primary mb-3 pb-2 border-b border-border text-sm flex items-center justify-between">
                    {meal.time} - {meal.name}
                    <span className="text-xs font-normal text-secondary bg-input px-2 py-1 rounded">~{meal.calories} kcal</span>
                  </h5>
                  <ul className="space-y-2 text-sm text-secondary">
                    {(meal.foods || []).map((f: string, i: number) => (
                      <li key={`food-${String(f).replaceAll(" ", "-")}`} className="flex items-center gap-2">
                        <span className="text-primary">•</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }) : (
              <div className="col-span-full text-center py-4 text-secondary text-sm">No specific meals mapped for this diet plan.</div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
