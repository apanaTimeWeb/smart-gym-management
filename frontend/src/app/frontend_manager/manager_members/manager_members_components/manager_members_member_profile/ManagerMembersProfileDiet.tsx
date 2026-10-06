// RESPONSIBILITY: Renders ManagerMembersProfileDiet's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useState } from 'react';
import { Utensils, Plus, Check, MessageCircle, Edit2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useManagerMembersDietPlansQuery } from '@/app/frontend_manager/manager_members/manager_members_hooks/useManagerMembersDietPlansQuery';
import { useManagerMembersLogic } from '@/app/frontend_manager/manager_members/manager_members_hooks/useManagerMembersLogic';
import { ManagerMembersUrlConfig } from '@/app/frontend_manager/manager_members/manager_members_url_config';
import { ManagerMembersFormatNumber } from '@/app/frontend_manager/manager_members/manager_members_utils/ManagerMembersFormatters';


/** @description Renders the ManagerMembersProfileDiet component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (4 documented module/import dependencies).. @edge-case Preserves loading state. */
export default function ManagerMembersProfileDiet() {
  const t = useTranslations('MANAGER_MEMBERS');

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
    <div className="space-y-6 motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-slow">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-primary">{t("COPY_DIET_PLAN")}</h3>
          <p className="text-sm text-secondary">{t("COPY_MANAGE_TRACK_1")}{selectedMember.name}{t("COPY_APOSS_NUTRITIONAL_GOALS")}</p>
        </div>
        {hasDietPlan ? (
          <div className="flex items-center gap-2">
            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center gap-2 px-4 py-2 bg-success text-on-success rounded-xl text-sm font-semibold hover:shadow-card hover:shadow-card motion-safe:transition-all motion-safe:active:scale-95 motion-safe:duration-base ease-in-out focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-diet-button-assign" 
              onClick={() => {
                const text = `*DIET PLAN: ${diet?.name || 'Assigned'}*\n\n*Macros:*\nCalories: ${diet?.calories || 0} kcal\nProtein: ${diet?.protein || 0}g\nCarbs: ${diet?.carbs || 0}g\nFats: ${diet?.fats || 0}g\n\n*Meals:*\n${diet?.meals?.map(m => `*${m.time} - ${m.name}* (${m.calories || 0} kcal)\n${(m.foods || []).map((f: string) => `- ${f}`).join('\n')}`).join('\n\n')}`;
                window.open(`${ManagerMembersUrlConfig.INTEGRATIONS.WHATSAPP_WEB_BASE}/?text=${encodeURIComponent(text)}`, '_blank');
              }}
              
            >
              <MessageCircle size={18} strokeWidth={2}/>{t("COPY_SEND_VIA_WHATSAPP_2")}</button>
            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center gap-2 px-4 py-2 bg-input text-primary border border-border rounded-xl text-sm font-semibold hover:bg-primary-subtle motion-safe:transition-all motion-safe:active:scale-95 motion-safe:duration-base ease-in-out focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-diet-button-remove" 
              onClick={() => setIsAssigning(true)}
              
            >
              <Edit2 size={18} strokeWidth={2}/>{t("COPY_CHANGE_2")}</button>
          </div>
        ) : !isAssigning && (
          <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:shadow-card hover:shadow-card motion-safe:transition-all motion-safe:active:scale-95 motion-safe:duration-base ease-in-out focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-diet-button-edit" 
            onClick={() => setIsAssigning(true)}
            
          >
            <Plus size={18} strokeWidth={2}/>{t("COPY_ASSIGN_DIET")}</button>
        )}
      </div>

      {isAssigning && (
        <div className="bg-card border border-border p-6 rounded-xl space-y-4 shadow-card motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
          <h4 className="font-semibold text-primary">{t("COPY_ASSIGN_DIET_PLAN_LIBRARY")}</h4>
          {dietsLoading ? (
            <p className="text-sm text-secondary">{t("COPY_LOADING_DIET_PLANS")}</p>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4">
              <select className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex-1 bg-input border border-border rounded-xl px-4 py-2.5 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary motion-safe:transition-all motion-safe:duration-base ease-in-out"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-select-option"
                value={selectedDietId}
                onChange={(e) => setSelectedDietId(e.target.value)}
                
              >
                <option value="" data-testid="manager_members-managermembersprofilediet-section-meals">{t("COPY_SELECT_DIET_PLAN")}</option>
                {availableDiets.map((diet) => (
                  <option key={diet.id} value={diet.id} data-testid="manager_members-managermembersprofilediet-section-notes">{diet.name} ({diet.type})</option>
                ))}
              </select>
              <div className="flex gap-2">
                <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "px-4 py-2 bg-input text-secondary hover:text-primary rounded-xl text-sm font-semibold motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-diet-button-cancel" 
                  onClick={() => setIsAssigning(false)}
                  
                >{t("COPY_CANCEL_4")}</button>
                <button data-testid="manager_members-member-profile-diet-status-assign" 
                  onClick={handleAssign}
                  disabled={!selectedDietId}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"
                >
                  <Check size={18} strokeWidth={2}/>{t("COPY_CONFIRM_ASSIGN_2")}</button>
              </div>
            </div>
          )}
        </div>
      )}

      {(() => { if (!hasDietPlan && !isAssigning) { return (
        <div className="bg-input border border-border rounded-xl p-10 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-primary-subtle flex items-center justify-center text-primary mb-4">
            <Utensils size={18} strokeWidth={2} />
          </div>
          <h4 className="text-lg font-semibold text-primary mb-2">{t("COPY_NO_DIET_PLAN_ASSIGNED")}</h4>
          <p className="text-secondary text-sm max-w-sm mb-6">
            {selectedMember.name}{t("COPY_CURRENTLY_DOES_NOT_HAVE_ACTIVE_DIET_PLAN_ASSIGN_TEMPLATE")}</p>
          <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "px-6 py-2.5 bg-primary-subtle text-primary border border-border rounded-xl font-semibold hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-diet-button-view" 
            onClick={() => setIsAssigning(true)}
            
          >{t("COPY_BROWSE_DIET_LIBRARY")}</button>
        </div>
      ); } return (() => { if (diet) { return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="bg-card border border-border rounded-xl p-4 text-center shadow-card motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
                <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-1">{t("COPY_CALORIES")}</p>
                <p className="text-xl font-bold text-primary">{ManagerMembersFormatNumber(diet.calories || 0)} <span className="text-sm font-medium text-secondary">{t("COPY_KCAL_1")}</span></p>
             </div>
             <div className="bg-card border border-border rounded-xl p-4 text-center shadow-card motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
                <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-1">{t("COPY_PROTEIN")}</p>
                <p className="text-xl font-bold text-primary">{diet.protein || 0} <span className="text-sm font-medium text-secondary">{t("COPY_G_2")}</span></p>
             </div>
             <div className="bg-card border border-border rounded-xl p-4 text-center shadow-card motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
                <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-1">{t("COPY_CARBS")}</p>
                <p className="text-xl font-bold text-primary">{diet.carbs || 0} <span className="text-sm font-medium text-secondary">{t("COPY_G_3")}</span></p>
             </div>
             <div className="bg-card border border-border rounded-xl p-4 text-center shadow-card motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
                <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-1">{t("COPY_FATS")}</p>
                <p className="text-xl font-bold text-primary">{diet.fats || 0} <span className="text-sm font-medium text-secondary">{t("COPY_G_1")}</span></p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {diet.meals && diet.meals.length > 0 ? diet.meals.map((meal, idx) => {
              return (
                <div key={`meal-${meal.name}-${idx}`} className="bg-card border border-border p-4 rounded-xl shadow-card hover:shadow-card motion-safe:transition-all motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
                  <h5 className="font-semibold text-primary mb-3 pb-2 border-b border-border text-sm flex items-center justify-between">
                    {meal.time} - {meal.name}
                    <span className="text-xs font-normal text-secondary bg-input px-2 py-1 rounded">~{meal.calories}{t("COPY_KCAL_2")}</span>
                  </h5>
                  <ul className="space-y-2 text-sm text-secondary">
                    {(meal.foods || []).map((f: string, i: number) => (
                      <li key={`food-${String(f).replaceAll(" ", "-")}`} className="flex items-center gap-2 motion-safe:transition-all motion-safe:duration-base ease-in-out">
                        <span className="text-primary">•</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }) : (
              <div className="col-span-full text-center py-4 text-secondary text-sm">{t("COPY_NO_SPECIFIC_MEALS_MAPPED_DIET_PLAN")}</div>
            )}
          </div>
        </div>
      ); } return null; })(); })()}
    </div>
  );
}
