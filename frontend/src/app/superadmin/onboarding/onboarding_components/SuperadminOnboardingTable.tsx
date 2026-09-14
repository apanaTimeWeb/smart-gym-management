import {
  CheckCircle2, XCircle, Clock, Mail, RefreshCw, ArrowUpCircle,
  ChevronDown, ChevronUp, UserCheck, AlertTriangle,
} from 'lucide-react';
import {
  ONBOARDING_STATUS_STYLES,
  TRIAL_STATUS_STYLES,
} from '@/app/superadmin/onboarding/onboarding_types/onboarding_constants';
import type { TenantOnboarding } from '@/app/superadmin/onboarding/onboarding_types/onboarding_types';

export function SuperadminOnboardingTable({
  filtered,
  expandedId,
  setExpandedId,
  handleMarkVerified,
  handleResendVerification,
  setExtendModalId,
  setConvertConfirmId,
}: {
  filtered: TenantOnboarding[];
  expandedId: string | null;
  setExpandedId: (id: string | null) => void;
  handleMarkVerified: (id: string) => void;
  handleResendVerification: (id: string) => void;
  setExtendModalId: (id: string) => void;
  setConvertConfirmId: (id: string) => void;
}) {
  const completedCount = (checklist: TenantOnboarding['checklist']) =>
    checklist.filter((c) => c.done).length;

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-input/40">
              <th className="text-left px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">Gym</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">Email</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">Onboarding</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">Trial</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">Checklist</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">Actions</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((tenant) => (
              <tr key={tenant.id} className="group">
                <td colSpan={7} className="p-0 border-none">
                  <table className="w-full">
                    <tbody>
                      <tr
                        className="hover:bg-input/30 motion-safe:transition-colors cursor-pointer"
                        onClick={() => setExpandedId(expandedId === tenant.id ? null : tenant.id)}
                      >
                        <td className="px-4 py-3 w-2/12">
                          <p className="font-medium text-foreground">{tenant.gymName}</p>
                          <p className="text-xs text-secondary">{tenant.ownerName}</p>
                        </td>
                        <td className="px-4 py-3 w-1/5">
                          <div className="flex items-center gap-1.5">
                            {tenant.emailVerified ? (
                              <CheckCircle2 size={18} strokeWidth={2} className="text-success shrink-0" />
                            ) : (
                              <XCircle size={18} strokeWidth={2} className="text-danger shrink-0" />
                            )}
                            <span className="text-secondary text-xs truncate max-w-xs">{tenant.adminEmail}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 w-2/12">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${ONBOARDING_STATUS_STYLES[tenant.onboardingStatus]}`}>
                            {tenant.onboardingStatus.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-4 py-3 w-2/12">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${TRIAL_STATUS_STYLES[tenant.trialStatus]}`}>
                            {tenant.trialStatus}
                          </span>
                          {tenant.trialStatus === 'TRIAL' && (
                            <p className="text-xs text-secondary mt-0.5">{tenant.trialDaysLeft}d left</p>
                          )}
                        </td>
                        <td className="px-4 py-3 w-2/12">
                          <div className="flex items-center gap-1.5">
                            <div className="w-20 h-1.5 bg-input rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${(completedCount(tenant.checklist) / tenant.checklist.length) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs text-secondary">
                              {completedCount(tenant.checklist)}/{tenant.checklist.length}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 w-2/12">
                          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            {!tenant.emailVerified && (
                              <button
                                onClick={() => handleMarkVerified(tenant.id)}
                                aria-label="Mark email verified"
                                title="Mark email verified"
                                className="p-1.5 rounded-lg bg-success/10 text-success hover:bg-success/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success"
                              >
                                <UserCheck size={18} strokeWidth={2} />
                              </button>
                            )}
                            <button
                              onClick={() => handleResendVerification(tenant.id)}
                              aria-label="Resend welcome email"
                              title="Resend welcome email"
                              className="p-1.5 rounded-lg bg-input text-secondary hover:text-foreground hover:bg-card motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            >
                              <Mail size={18} strokeWidth={2} />
                            </button>
                            {(tenant.trialStatus === 'TRIAL' || tenant.trialStatus === 'EXPIRED') && (
                              <button
                                onClick={() => setExtendModalId(tenant.id)}
                                aria-label="Extend trial"
                                title="Extend trial"
                                className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                              >
                                <RefreshCw size={18} strokeWidth={2} />
                              </button>
                            )}
                            {tenant.trialStatus !== 'CONVERTED' && tenant.trialStatus !== 'ACTIVE' && (
                              <button
                                onClick={() => setConvertConfirmId(tenant.id)}
                                aria-label="Convert to paid"
                                title="Convert to paid"
                                className="p-1.5 rounded-lg bg-success/10 text-success hover:bg-success/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success"
                              >
                                <ArrowUpCircle size={18} strokeWidth={2} />
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-secondary w-1/12">
                          {expandedId === tenant.id ? <ChevronUp size={18} strokeWidth={2} /> : <ChevronDown size={18} strokeWidth={2} />}
                        </td>
                      </tr>

                      {expandedId === tenant.id && (
                        <tr className="bg-input/20">
                          <td colSpan={7} className="px-6 py-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div>
                                <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-3">Onboarding Checklist</p>
                                <div className="space-y-2">
                                  {tenant.checklist.map((item) => (
                                    <div key={item.key} className="flex items-center gap-2">
                                      {item.done ? (
                                        <CheckCircle2 size={18} strokeWidth={2} className="text-success shrink-0" />
                                      ) : (
                                        <Clock size={18} strokeWidth={2} className="text-secondary shrink-0" />
                                      )}
                                      <span className={`text-sm ${item.done ? 'text-foreground' : 'text-secondary'}`}>
                                        {item.label}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-3">Trial Details</p>
                                <div className="space-y-1.5 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-secondary">Signup Date</span>
                                    <span className="text-foreground">{tenant.signupDate}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-secondary">Trial Ends</span>
                                    <span className="text-foreground">{tenant.trialEndsAt ?? '—'}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-secondary">Days in Trial</span>
                                    <span className="text-foreground">{tenant.daysInTrial}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-secondary">Days Remaining</span>
                                    <span className={tenant.trialDaysLeft <= 3 ? 'text-danger font-medium' : 'text-foreground'}>
                                      {tenant.trialDaysLeft}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-secondary">Plan</span>
                                    <span className="text-foreground font-medium">{tenant.plan}</span>
                                  </div>
                                </div>
                                {tenant.trialDaysLeft <= 3 && tenant.trialStatus === 'TRIAL' && (
                                  <div className="mt-3 flex items-center gap-2 text-xs text-warning bg-warning/10 border border-warning/20 rounded-lg px-3 py-2">
                                    <AlertTriangle size={18} strokeWidth={2} />
                                    Trial expiring soon — consider extending or converting.
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-secondary">No gyms match your search.</div>
      )}
    </div>
  );
}
