// RESPONSIBILITY: Renders ManagerCommunicationsChurnRecoveryTableRow's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Send, CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { CANCELLATIONS_REASON_LABEL } from '@/app/frontend_manager/manager_communications/manager_communications_constants/ManagerCommunicationsSharedConstants';
import { ManagerCommunicationsFormatDate } from '@/app/frontend_manager/manager_communications/manager_communications_utils/ManagerCommunicationsFormatters';
import type { ManagerCommunicationsChurnRecoveryTableRowProps } from '@/app/frontend_manager/manager_communications/manager_communications_types/ManagerCommunicationsChurnRecoveryTableRowTypes';




/**
 * @description Provides the `getDaysBadge` transformation used by the owning Manager feature. Keeps display/domain shaping local so components remain focused on rendering and interaction orchestration.
 * @dependencies Uses only the values and module constants visible in this file; it does not call APIs or cross feature boundaries.
 * @edge-case Handles missing, empty, nullable, and boundary inputs according to the caller's documented UI contract without inventing business data.
 */
function getDaysBadge(days: number): { label: string; bg: string; text: string } {
  if (days <= 7)  return { label: `${days}d ago`, bg: 'bg-danger-bg',  text: 'text-danger' };
  if (days <= 30) return { label: `${days}d ago`, bg: 'bg-warning-bg', text: 'text-warning' };
  return              { label: `${days}d ago`, bg: 'bg-info-bg',    text: 'text-info' };
}

/** @description Renders the ManagerCommunicationsChurnRecoveryTableRow component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerCommunicationsChurnRecoveryTableRow({
  member,
  onOpenComposer,
  maskPhone }: ManagerCommunicationsChurnRecoveryTableRowProps) {
  const t = useTranslations('MANAGER_COMMUNICATIONS');

  const badge = getDaysBadge(member.daysSinceExit);

  return (
    <tr
      data-testid={`manager_communications-communications-managerchurnrecoverytablerow-row-${member.memberId}`}
      className="border-b border-border motion-safe:transition-all hover:bg-primary-subtle cursor-pointer motion-safe:duration-base ease-in-out"
      tabIndex={0}
      role="button"
      aria-label={t("TEXT_OPEN_WINBACK_COMPOSER", { value: member.name })}
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
        {ManagerCommunicationsFormatDate(member.exitDate)}
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
        {(() => { if (member.recovered) return (<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success text-on-success" data-testid="manager_communications-managercommunicationschurnrecoverytablerow-status-badge-1">
            <CheckCircle size={18} strokeWidth={2}/>{t("COPY_RECOVERED")}</span>); return (() => { if (member.lastContactedAt) return (<span className="text-xs text-secondary">{t("COPY_CONTACTED")}{ManagerCommunicationsFormatDate(member.lastContactedAt)}
          </span>); return (<span className="text-xs text-disabled">{t("COPY_NOT_CONTACTED")}</span>); })(); })()}
      </td>

      {/* Action */}
      <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()} data-testid="manager_communications-managercommunicationschurnrecoverytablerow-interactive">
        {!member.recovered && (
          <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary-subtle text-primary motion-safe:transition-all motion-safe:hover:bg-primary-hover motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base ease-in-out hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_communications-manager-churn-recovery-button-close"
            type="button"
            aria-label={t("TEXT_SEND_WINBACK_MESSAGE", { value: member.name })}
            onClick={(e) => { e.stopPropagation(); onOpenComposer(member.memberId); }}
            
          >
            <Send size={18} strokeWidth={2}/>{t("COPY_WIN_BACK_1")}</button>
        )}
      </td>
    </tr>
  );
}
