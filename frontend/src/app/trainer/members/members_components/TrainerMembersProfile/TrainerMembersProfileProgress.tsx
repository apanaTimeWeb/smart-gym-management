'use client';

import { LineChart, TrendingDown } from 'lucide-react';

export default function TrainerMembersProfileProgress() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-foreground">Progress & Measurements</h3>
        <button className="text-sm text-primary font-medium hover:underline">+ Log Measurement</button>
      </div>

      <div className="bg-input rounded-xl p-5 flex flex-col items-center justify-center min-h-[200px] border border-border border-dashed">
        <LineChart size={48} className="text-secondary mb-3 opacity-50" />
        <p className="text-secondary text-sm">Progress chart will appear here</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Weight', current: '70 kg', prev: '72 kg', change: '-2 kg' },
          { label: 'Body Fat', current: '18%', prev: '20%', change: '-2%' },
          { label: 'Chest', current: '38 in', prev: '38 in', change: '0' },
          { label: 'Arms', current: '14 in', prev: '13.5 in', change: '+0.5 in' },
        ].map((m, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-4">
            <p className="text-xs text-secondary mb-1">{m.label}</p>
            <p className="text-lg font-bold text-foreground">{m.current}</p>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingDown size={12} /> {m.change} (from {m.prev})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
