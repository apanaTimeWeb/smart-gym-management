// RESPONSIBILITY: Single churned member row in the churn recovery table. Receives member data and callbacks via props. No API calls.
'use client';

import { Send, CheckCircle } from 'lucide-react';
import type { ChurnedMember } from '@/app/manager/communications/communications_types/communications_types';
import { CHURN_REASON_LABEL } from '@/app/manager/communications/communications_utils/ManagerCommunicationsSharedConstants';

interface ManagerChurnRecoveryTableRowProps {
  member: ChurnedMember;
  onOpenComposer: (memberId: string) => void;
  maskPhone: (phone: string) => string;
}

function getDaysBadge(days: number): { label: string; bg: string; text: string } {
  if (days <= 7)  return { label: `${days}d ago`, bg: 'bg-danger-bg',  text: 'text-danger' };
  if (days <= 30) return { label: `${days}d ago`, bg: 'bg-warning-bg', text: 'text-warning' };
  return              { label: `${days}d ago`, bg: 'bg-info-bg',    text: 'text-info' };
}

export default function ManagerChurnRecoveryTableRow({
  member,
  onOpenComposer,
  maskPhone,
}: ManagerChurnRecoveryTableRowProps) {
  const badge = getDaysBadge(member.daysSinceExit);

  return (
    <tr
      className="border-b border-border motion-safe:transition-colors hover:bg-primary-subtle cursor-pointer"
      onClick={() => onOpenComposer(member.memberId)}
    >
      {/* Name + Plan */}
      <td className="px-4 py-3">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground truncate max-w-[160px]">{member.name}</span>
          <span className="text-xs text-secondary truncate max-w-[160px]">{member.plan}</span>
        </div>
      </td>

      {/* Phone */}
      <td className="px-4 py-3 text-sm text-foreground font-mono">
        {maskPhone(member.phone)}
      </td>

      {/* Exit Date */}
      <td className="px-4 py-3 text-sm text-secondary whitespace-nowrap">
        {new Date(member.exitDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
      </td>

      {/* Days Since Exit */}
      <td className="px-4 py-3">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${badge.bg} ${badge.text}`}>
          {badge.label}
        </span>
      </td>

      {/* Reason */}
      <td className="px-4 py-3 text-sm text-secondary">
        {CHURN_REASON_LABEL[member.reason]}
      </td>

      {/* Recovery status */}
      <td className="px-4 py-3">
        {member.recovered ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-success-bg text-success">
            <CheckCircle size={11} /> Recovered
          </span>
        ) : member.lastContactedAt ? (
          <span className="text-[11px] text-secondary">
            Contacted {new Date(member.lastContactedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
          </span>
        ) : (
          <span className="text-[11px] text-disabled">Not contacted</span>
        )}
      </td>

      {/* Action */}
      <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
        {!member.recovered && (
          <button
            type="button"
            aria-label={`Send win-back message to ${member.name}`}
            onClick={(e) => { e.stopPropagation(); onOpenComposer(member.memberId); }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary text-black motion-safe:transition-all motion-safe:hover:bg-primary-hover motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Send size={12} />
            Win-Back
          </button>
        )}
      </td>
    </tr>
  );
}
