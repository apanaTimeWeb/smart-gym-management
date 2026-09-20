'use client';
import { BadgeCheck, Clock, XCircle } from 'lucide-react';
import type { WhiteLabelDomain } from '../white-labeling_types/SuperadminWhiteLabelingTypes';
import { useSuperadminWhiteLabelingStore } from '../white-labeling_store/useSuperadminWhiteLabelingStore';

interface SuperadminWhiteLabelingTableProps {
  domains: WhiteLabelDomain[];
}

export default function SuperadminWhiteLabelingTable({ domains }: SuperadminWhiteLabelingTableProps) {
  const { setSelectedDomainId } = useSuperadminWhiteLabelingStore();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
      case 'issued':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-success-bg text-on-success"><BadgeCheck className="w-3.5 h-3.5" /> {status.charAt(0).toUpperCase() + status.slice(1)}</span>;
      case 'pending':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-warning-bg text-on-primary"><Clock className="w-3.5 h-3.5" /> Pending</span>;
      case 'failed':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-danger-bg text-on-danger"><XCircle className="w-3.5 h-3.5" /> Failed</span>;
    }
  };

  if (domains.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border flex flex-col items-center justify-center p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-input flex items-center justify-center mb-4">
          <Clock className="w-8 h-8 text-secondary" />
        </div>
        <h3 className="text-lg font-bold text-primary mb-1">No Custom Domains Found</h3>
        <p className="text-sm text-secondary max-w-sm">No domains match your current search or filter criteria. Adjust your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-page/50">
              <th className="p-4 text-xs font-semibold text-secondary uppercase tracking-wider">Gym Name</th>
              <th className="p-4 text-xs font-semibold text-secondary uppercase tracking-wider">Domain</th>
              <th className="p-4 text-xs font-semibold text-secondary uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-semibold text-secondary uppercase tracking-wider">SSL</th>
              <th className="p-4 text-xs font-semibold text-secondary uppercase tracking-wider">Added On</th>
              <th className="p-4 text-xs font-semibold text-secondary uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {domains.map((domain) => (
              <tr key={domain.id} className="hover:bg-input/50 motion-safe:transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {domain.logoUrl ? (
                      <div 
                        className="w-8 h-8 rounded-md bg-page border border-border shrink-0 bg-cover bg-center" 
                        style={{ backgroundImage: `url(${domain.logoUrl})` }}
                        aria-label={`${domain.gymName} logo`}
                      />
                    ) : (
                      <div 
                        className="w-8 h-8 rounded-md bg-input border border-border shrink-0 flex items-center justify-center text-xs font-bold text-secondary"
                        style={{ backgroundColor: domain.primaryColor ? `${domain.primaryColor}20` : undefined, color: domain.primaryColor || undefined }}
                      >
                        {domain.gymName.charAt(0)}
                      </div>
                    )}
                    <span className="text-sm font-medium text-primary block truncate max-w-[160px]" title={domain.gymName}>
                      {domain.gymName}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-primary font-mono">{domain.domain}</span>
                </td>
                <td className="p-4">{getStatusBadge(domain.status)}</td>
                <td className="p-4">{getStatusBadge(domain.sslStatus)}</td>
                <td className="p-4 text-sm text-secondary">
                  {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(domain.createdAt))}
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => setSelectedDomainId(domain.id)}
                    className="text-sm font-medium text-brand hover:text-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-md px-2 py-1 motion-safe:transition-colors"
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
