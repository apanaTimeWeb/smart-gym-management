// RESPONSIBILITY: Segment picker — shows all audience segments as selectable cards with description and live recipient count.
'use client';

import { Users, Loader2 } from 'lucide-react';
import { useManagerCommunicationsLogic } from '@/app/manager/communications/communications_context/useManagerCommunicationsLogic';
import { COMM_SEGMENT_OPTIONS } from '@/app/manager/communications/communications_utils/ManagerCommunicationsSharedConstants';

export default function ManagerCommunicationsSegmentPicker() {
  const { selectedSegment, handleSegmentChange, segmentRecipients, loadingRecipients } = useManagerCommunicationsLogic();

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-secondary uppercase tracking-wider">
        1. Choose Audience Segment
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {COMM_SEGMENT_OPTIONS.map((opt) => {
          const isActive = selectedSegment === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleSegmentChange(opt.value)}
              className={`text-left p-4 rounded-xl border motion-safe:transition-all ${
                isActive
                  ? 'bg-primary-subtle border-primary text-foreground'
                  : 'bg-card border-border text-secondary hover:border-primary/50 hover:text-foreground'
              }`}
            >
              <p className={`text-sm font-semibold ${isActive ? 'text-primary' : ''}`}>{opt.label}</p>
              <p className="text-xs mt-0.5 opacity-80">{opt.description}</p>
              {isActive && opt.value !== 'custom' && (
                <div className="flex items-center gap-1.5 mt-2">
                  {loadingRecipients ? (
                    <Loader2 size={12} className="motion-safe:animate-spin text-primary" />
                  ) : (
                    <Users size={12} className="text-primary" />
                  )}
                  <span className="text-xs font-semibold text-primary">
                    {loadingRecipients ? 'Loading...' : `${segmentRecipients.length} recipients`}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
