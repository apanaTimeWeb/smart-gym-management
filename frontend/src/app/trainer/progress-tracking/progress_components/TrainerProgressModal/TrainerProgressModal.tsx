'use client';
// RESPONSIBILITY: Add / Edit modal for a single progress entry.
// DATA FLOW: useTrainerProgressLogic → TrainerProgressModal

import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import type { ProgressEntry, CreateProgressEntryDto } from '@/app/trainer/progress-tracking/progress_types/TrainerProgressTypes';

interface Props {
  editingEntry: ProgressEntry | null;
  onSave: (data: Omit<ProgressEntry, 'id' | 'memberId' | 'recordedBy'>) => void;
  onClose: () => void;
}

const EMPTY: CreateProgressEntryDto = {
  date: new Date().toISOString().split('T')[0] ?? '',
  weightKg: 0,
  heightCm: 0,
};

function calcBmi(weight: number, heightCm: number): number {
  if (!heightCm) return 0;
  const h = heightCm / 100;
  return Math.round((weight / (h * h)) * 10) / 10;
}

export default function TrainerProgressModal({ editingEntry, onSave, onClose }: Props) {
  const [form, setForm] = useState<CreateProgressEntryDto>(EMPTY);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingEntry) {
      setForm({
        date: editingEntry.date,
        weightKg: editingEntry.weightKg,
        heightCm: editingEntry.heightCm,
        bodyFatPercent: editingEntry.bodyFatPercent,
        muscleMassKg: editingEntry.muscleMassKg,
        chestCm: editingEntry.chestCm,
        waistCm: editingEntry.waistCm,
        hipCm: editingEntry.hipCm,
        notes: editingEntry.notes,
      });
    } else {
      setForm(EMPTY);
    }
  }, [editingEntry]);

  const set = (field: keyof CreateProgressEntryDto, value: string | number) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    const bmi = calcBmi(form.weightKg, form.heightCm);
    onSave({ ...form, bmi });
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-overlay w-full max-w-lg rounded-2xl shadow-2xl border border-border overflow-hidden motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-200">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="text-lg font-bold text-foreground">
            {editingEntry ? 'Edit Entry' : 'Add Progress Entry'}
          </h3>
          <button
            onClick={onClose}
            className="text-secondary hover:text-foreground hover:bg-input p-1 rounded-lg motion-safe:transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-secondary mb-1">Date</label>
              <input
                type="date"
                required
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-secondary mb-1">Weight (kg)</label>
              <input
                type="number"
                required
                min={1}
                step={0.1}
                value={form.weightKg || ''}
                onChange={(e) => set('weightKg', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-secondary mb-1">Height (cm)</label>
              <input
                type="number"
                required
                min={1}
                step={0.1}
                value={form.heightCm || ''}
                onChange={(e) => set('heightCm', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-secondary mb-1">Body Fat (%)</label>
              <input
                type="number"
                min={0}
                step={0.1}
                value={form.bodyFatPercent ?? ''}
                onChange={(e) => set('bodyFatPercent', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-secondary mb-1">Muscle Mass (kg)</label>
              <input
                type="number"
                min={0}
                step={0.1}
                value={form.muscleMassKg ?? ''}
                onChange={(e) => set('muscleMassKg', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-secondary mb-1">Waist (cm)</label>
              <input
                type="number"
                min={0}
                step={0.1}
                value={form.waistCm ?? ''}
                onChange={(e) => set('waistCm', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-secondary mb-1">Chest (cm)</label>
              <input
                type="number"
                min={0}
                step={0.1}
                value={form.chestCm ?? ''}
                onChange={(e) => set('chestCm', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-secondary mb-1">Hip (cm)</label>
              <input
                type="number"
                min={0}
                step={0.1}
                value={form.hipCm ?? ''}
                onChange={(e) => set('hipCm', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-secondary mb-1">Notes</label>
            <textarea
              rows={2}
              value={form.notes ?? ''}
              onChange={(e) => set('notes', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-secondary hover:text-foreground hover:bg-input rounded-lg motion-safe:transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 motion-safe:transition-colors disabled:opacity-70"
            >
              {saving && <Loader2 size={16} className="motion-safe:animate-spin" />}
              {editingEntry ? 'Save Changes' : 'Add Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
