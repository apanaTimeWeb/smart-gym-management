// RESPONSIBILITY: Renders the toggleable weekly schedule allowing trainers to define their working hours.
'use client';

import { useState, useEffect } from 'react';
import { useScheduleContext } from '@/app/trainer/schedule/schedule_context/TrainerScheduleContext';
import { useTrainerScheduleStore } from '@/app/trainer/schedule/schedule_store/useTrainerScheduleStore';
import type { WeeklyAvailability } from '@/app/trainer/schedule/schedule_types/TrainerScheduleTypes';
import { Loader2, Save } from 'lucide-react';

export default function TrainerWeeklyAvailability() {
  const { saveAvailability } = useScheduleContext();
  const availability = useTrainerScheduleStore(s => s.availability);
  const fetchState = useTrainerScheduleStore(s => s.fetchState);
  const saving = useTrainerScheduleStore(s => s.saving);

  const [localSchedule, setLocalSchedule] = useState<WeeklyAvailability[]>([]);

  // Hydrate local state once loaded
  useEffect(() => {
    if (fetchState === 'success') {
      // Deep copy to avoid mutating store directly
      setLocalSchedule(JSON.parse(JSON.stringify(availability)));
    }
  }, [fetchState, availability]);

  const handleToggle = (index: number) => {
    const updated = [...localSchedule];
    updated[index].isAvailable = !updated[index].isAvailable;
    // Reset hours if toggled off
    if (!updated[index].isAvailable) {
      updated[index].startTime = '00:00';
      updated[index].endTime = '00:00';
    } else if (updated[index].startTime === '00:00') {
      updated[index].startTime = '06:00';
      updated[index].endTime = '18:00';
    }
    setLocalSchedule(updated);
  };

  const handleChangeTime = (index: number, field: 'startTime' | 'endTime', value: string) => {
    const updated = [...localSchedule];
    updated[index][field] = value;
    setLocalSchedule(updated);
  };

  const handleSave = () => {
    saveAvailability(localSchedule);
  };

  if (fetchState === 'loading') {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">Standard Availability</h2>
        <p className="text-sm text-secondary">Set your recurring weekly working hours. Your manager will use this for client assignment.</p>
      </div>

      <div className="space-y-4 max-w-3xl">
        {localSchedule.map((day, idx) => (
          <div key={day.day} className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border ${day.isAvailable ? 'border-primary/30 bg-primary/5' : 'border-border bg-input'}`}>
            <div className="flex items-center gap-4 mb-3 sm:mb-0">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={day.isAvailable}
                  onChange={() => handleToggle(idx)}
                />
                <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
              <span className={`font-semibold w-24 ${day.isAvailable ? 'text-foreground' : 'text-secondary line-through'}`}>{day.day}</span>
            </div>

            <div className="flex items-center gap-3">
              <input 
                type="time" 
                disabled={!day.isAvailable}
                value={day.startTime}
                onChange={(e) => handleChangeTime(idx, 'startTime', e.target.value)}
                className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary disabled:opacity-50"
              />
              <span className="text-secondary font-medium">to</span>
              <input 
                type="time" 
                disabled={!day.isAvailable}
                value={day.endTime}
                onChange={(e) => handleChangeTime(idx, 'endTime', e.target.value)}
                className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary disabled:opacity-50"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-border pt-6 flex justify-end">
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-70"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={18} />}
          Save Availability
        </button>
      </div>
    </div>
  );
}
