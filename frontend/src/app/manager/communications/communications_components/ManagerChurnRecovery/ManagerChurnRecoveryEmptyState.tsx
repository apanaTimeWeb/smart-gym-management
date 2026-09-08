// RESPONSIBILITY: Empty state shown when no churned members exist — positive framing with a motivational message.
'use client';

import { ShieldCheck } from 'lucide-react';

export default function ManagerChurnRecoveryEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-success-bg flex items-center justify-center mb-4">
        <ShieldCheck size={32} className="text-success" />
      </div>
      <h3 className="text-base font-semibold text-foreground">No churned members</h3>
      <p className="text-sm text-secondary mt-1 max-w-xs">
        Great retention! No exited members found for this branch. Keep up the excellent member engagement.
      </p>
    </div>
  );
}
