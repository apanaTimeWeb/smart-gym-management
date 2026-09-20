'use client';
import { X, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { useSuperadminWhiteLabelingStore } from '../white-labeling_store/useSuperadminWhiteLabelingStore';
import { useUpdateSuperadminDomainStatus } from '../white-labeling_hooks/useSuperadminWhiteLabeling';
import type { WhiteLabelDomain } from '../white-labeling_types/SuperadminWhiteLabelingTypes';
import { useEffect } from 'react';

interface SuperadminWhiteLabelingDrawerProps {
  domains: WhiteLabelDomain[];
}

export default function SuperadminWhiteLabelingDrawer({ domains }: SuperadminWhiteLabelingDrawerProps) {
  const { selectedDomainId, setSelectedDomainId } = useSuperadminWhiteLabelingStore();
  const { mutate: updateStatus, isPending } = useUpdateSuperadminDomainStatus();

  const domain = domains.find(d => d.id === selectedDomainId);

  // Close drawer on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedDomainId(null); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setSelectedDomainId]);

  if (!domain) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-overlay/90 backdrop-blur-sm z-50 motion-safe:transition-opacity"
        onClick={() => setSelectedDomainId(null)}
        aria-hidden="true"
      />
      
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-card border-l border-border shadow-2xl z-50 flex flex-col motion-safe:transition-transform motion-safe:duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border shrink-0">
          <div>
            <h2 className="text-xl font-bold text-primary">Manage Domain</h2>
            <p className="text-sm text-secondary mt-1">{domain.gymName}</p>
          </div>
          <button 
            onClick={() => setSelectedDomainId(null)}
            className="p-2 -mr-2 rounded-lg text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            aria-label="Close panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Domain Configuration</h3>
            <div className="bg-input rounded-xl p-4 border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-secondary">Target Domain</span>
                <span className="text-sm font-medium text-primary bg-page px-2 py-1 rounded-md">{domain.domain}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-secondary">DNS Status</span>
                <span className={`text-sm font-medium ${domain.status === 'active' ? 'text-on-success' : domain.status === 'failed' ? 'text-on-danger' : 'text-warning'}`}>
                  {domain.status.charAt(0).toUpperCase() + domain.status.slice(1)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-secondary">SSL Certificate</span>
                <span className={`text-sm font-medium ${domain.sslStatus === 'issued' ? 'text-on-success' : domain.sslStatus === 'failed' ? 'text-on-danger' : 'text-warning'}`}>
                  {domain.sslStatus.charAt(0).toUpperCase() + domain.sslStatus.slice(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Branding Profile</h3>
            <div className="bg-input rounded-xl p-4 border border-border space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-secondary w-24">App Logo</span>
                {domain.logoUrl ? (
                  <div className="w-12 h-12 rounded-lg bg-page border border-border bg-cover bg-center shadow-sm" style={{ backgroundImage: `url(${domain.logoUrl})` }} />
                ) : (
                  <span className="text-sm font-medium text-primary bg-page px-3 py-1.5 rounded-md border border-border">Not Provided</span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-secondary w-24">Theme Color</span>
                {domain.primaryColor ? (
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full border border-border shadow-sm" style={{ backgroundColor: domain.primaryColor }} />
                    <span className="text-sm font-mono text-primary">{domain.primaryColor}</span>
                  </div>
                ) : (
                  <span className="text-sm font-medium text-primary bg-page px-3 py-1.5 rounded-md border border-border">Default</span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">DNS Instructions for Gym</h3>
            <div className="bg-page rounded-xl p-4 border border-border text-sm text-secondary space-y-2">
              <p>The gym owner needs to add the following DNS records to their domain registrar:</p>
              <div className="bg-input p-3 rounded-md font-mono text-xs border border-border text-primary overflow-x-auto">
                <p>Type: CNAME</p>
                <p>Name: @</p>
                <p>Value: proxy.gymsmart360.com</p>
              </div>
              <p className="text-xs text-tertiary mt-2">DNS propagation may take up to 48 hours.</p>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-border bg-page/50 shrink-0 space-y-3">
          {domain.status !== 'active' && (
            <button
              onClick={() => updateStatus({ id: domain.id, dto: { status: 'active' } })}
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 bg-success-bg text-on-success border border-success/20 py-2.5 rounded-lg font-medium hover:bg-success hover:text-white motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success disabled:opacity-50"
            >
              <CheckCircle className="w-4 h-4" />
              Mark as Verified
            </button>
          )}

          {domain.status === 'pending' && (
            <button
              onClick={() => updateStatus({ id: domain.id, dto: { status: 'failed' } })}
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 bg-danger-bg text-on-danger border border-danger/20 py-2.5 rounded-lg font-medium hover:bg-danger hover:text-white motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger disabled:opacity-50"
            >
              <AlertTriangle className="w-4 h-4" />
              Mark as Failed
            </button>
          )}

          <button
            onClick={() => setSelectedDomainId(null)}
            className="w-full py-2.5 rounded-lg font-medium bg-input text-primary hover:bg-border motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            Close
          </button>
        </div>
        
      </div>
    </>
  );
}
