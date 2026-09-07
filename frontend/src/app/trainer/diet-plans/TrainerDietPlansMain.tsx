'use client';

import { useState } from 'react';
import { Apple, Plus, Search, Edit, Trash2 } from 'lucide-react';
import TrainerHeader from '@/app/trainer/trainer_components/TrainerLayout/TrainerHeader';
import { DietPlan } from '@/app/trainer/trainer_types/trainer_types';

const MOCK_DIETS: DietPlan[] = [
  { id: '1', name: 'Weight Loss Basics', goal: 'Weight Loss', calories: 1800, protein: 120, carbs: 150, fats: 60, meals: ['Breakfast', 'Lunch', 'Dinner'], isActive: true },
  { id: '2', name: 'Bulking Phase 1', goal: 'Muscle Gain', calories: 3200, protein: 180, carbs: 400, fats: 80, meals: ['Breakfast', 'Snack 1', 'Lunch', 'Snack 2', 'Dinner'], isActive: true },
  { id: '3', name: 'Maintenance Protocol', goal: 'Maintenance', calories: 2400, protein: 150, carbs: 250, fats: 70, meals: ['Breakfast', 'Lunch', 'Snack', 'Dinner'], isActive: true },
];

export default function TrainerDietPlansMain() {
  const [diets, setDiets] = useState<DietPlan[]>(MOCK_DIETS);
  const [search, setSearch] = useState('');

  const filtered = diets.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.goal.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-full pb-10">
      <TrainerHeader title="Diet Plans" subtitle="Create and manage nutrition plans for your members" />
      
      <div className="p-6 space-y-5">
        <div className="bg-card rounded-xl shadow-sm border border-border p-4 flex justify-between items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search diet plans..." 
              className="w-full pl-9 pr-3 py-2 border border-border bg-input text-foreground rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:opacity-90 transition-opacity">
            <Plus size={16} /> <span className="hidden sm:inline">Create Plan</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(diet => (
            <div key={diet.id} className="bg-card rounded-xl shadow-sm border border-border overflow-hidden hover:border-primary/30 transition-colors">
              <div className="p-5 border-b border-border flex items-start gap-4">
                <div className="p-3 bg-success-bg text-success rounded-xl">
                  <Apple size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground line-clamp-1">{diet.name}</h3>
                  <span className="inline-flex mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-info-bg text-info">
                    {diet.goal}
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-input rounded-md p-2 text-center">
                    <p className="text-xs text-secondary mb-0.5">Calories</p>
                    <p className="font-bold text-foreground">{diet.calories}</p>
                  </div>
                  <div className="bg-input rounded-md p-2 text-center">
                    <p className="text-xs text-secondary mb-0.5">Protein (g)</p>
                    <p className="font-bold text-foreground">{diet.protein}</p>
                  </div>
                  <div className="bg-input rounded-md p-2 text-center">
                    <p className="text-xs text-secondary mb-0.5">Carbs (g)</p>
                    <p className="font-bold text-foreground">{diet.carbs}</p>
                  </div>
                  <div className="bg-input rounded-md p-2 text-center">
                    <p className="text-xs text-secondary mb-0.5">Fats (g)</p>
                    <p className="font-bold text-foreground">{diet.fats}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs font-semibold text-secondary mb-1">Meals:</p>
                  <p className="text-sm text-foreground">{diet.meals.join(', ')}</p>
                </div>
              </div>
              <div className="bg-input/50 px-5 py-3 border-t border-border flex justify-end gap-2">
                <button className="p-2 text-secondary hover:text-primary transition-colors bg-card border border-border rounded-lg shadow-sm">
                  <Edit size={16} />
                </button>
                <button className="p-2 text-secondary hover:text-danger transition-colors bg-card border border-border rounded-lg shadow-sm">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full bg-card rounded-xl border border-border border-dashed p-10 flex flex-col items-center justify-center text-center">
              <Apple size={48} className="text-secondary opacity-50 mb-4" />
              <h3 className="text-lg font-bold text-foreground">No diet plans found</h3>
              <p className="text-secondary mt-1">Try adjusting your search or create a new plan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
