'use client';
import { CalendarX } from 'lucide-react';

export default function TrainerScheduleEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-card border border-border rounded-xl">
      <div className="w-16 h-16 rounded-full bg-input flex items-center justify-center mb-4">
        <CalendarX className="text-secondary" size={32} />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-1">No items found</h3>
      <p className="text-sm text-secondary text-center max-w-sm mb-6">
        There are no items in this view. Check back later or add new availability or leave requests.
      </p>
    </div>
  );
}
