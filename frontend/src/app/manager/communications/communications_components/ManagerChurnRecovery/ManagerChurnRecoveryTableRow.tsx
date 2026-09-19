'use client';
import type { ManagerChurnRecoveryTableRowProps } from '@/app/manager/communications/communications_types/ManagerChurnRecoveryTableRowTypes';
import { formatDate } from '@/lib/formatters';
// RESPONSIBILITY: Single churned member row in the churn recovery table. Receives member data and callbacks via props. No API calls.
import { Send, CheckCircle } from 'lucide-react';
import { CANCELLATIONS_REASON_LABEL } from '@/app/manager/communications/communications_utils/ManagerCommunicationsSharedConstants';



function getDaysBadge(days: number): { label: string; bg: string; text: string } {
  if (days <= 7)  return { label: `${days}d ago`, bg: 'bg-danger',  text: 'text-danger' };
  if (days <= 30) return { label: `${days}d ago`, bg: 'bg-warning', text: 'text-warning' };
  return              { label: `${days}d ago`, bg: 'bg-info',    text: 'text-info' };
}

export default function ManagerChurnRecoveryTableRow({
  member,
  onOpenComposer,
  maskPhone }: ManagerChurnRecoveryTableRowProps) {
  const badge = getDaysBadge(member.daysSinceExit);

  return (
    <tr
      className="border-b border-border motion-safe:transition-colors hover:bg-primary-subtle cursor-pointer"
      tabIndex={0}
      role="button"
      aria-label={`Open win-back composer for ${member.name}`}
      onClick={() => onOpenComposer(member.memberId)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpenComposer(member.memberId);
        }
      }}
    >
      {/* Name + Plan */}
      <td className="px-4 py-3">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-primary truncate max-w-40">{member.name}</span>
          <span className="text-xs text-secondary truncate max-w-40">{member.plan}</span>
        </div>
      </td>

      {/* Phone */}
      <td className="px-4 py-3 text-sm text-primary font-mono">
        {maskPhone(member.phone)}
      </td>

      {/* Exit Date */}
      <td className="px-4 py-3 text-sm text-secondary whitespace-nowrap">
        {formatDate(member.exitDate)}
      </td>

      {/* Days Since Exit */}
      <td className="px-4 py-3">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
          {badge.label}
        </span>
      </td>

      {/* Reason */}
      <td className="px-4 py-3 text-sm text-secondary">
        {CANCELLATIONS_REASON_LABEL[member.reason]}
      </td>

      {/* Recovery status */}
      <td className="px-4 py-3">
        {member.recovered ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success text-success">
            <CheckCircle size={18} /> Recovered
          </span>
        ) : member.lastContactedAt ? (
          <span className="text-xs text-secondary">
            Contacted {formatDate(member.lastContactedAt)}
          </span>
        ) : (
          <span className="text-xs text-disabled">Not contacted</span>
        )}
      </td>

      {/* Action */}
      <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
        {!member.recovered && (
          <button
            type="button"
            aria-label={`Send win-back message to ${member.name}`}
            onClick={(e) => { e.stopPropagation(); onOpenComposer(member.memberId); }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary text-on-primary motion-safe:transition-all motion-safe:hover:bg-primary-hover motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Send size={18} />
            Win-Back
          </button>
        )}
      </td>
    </tr>
  );
}
