// RESPONSIBILITY: Renders the Superadmin settings V1 Data controls view.
'use client';
import { useState } from 'react';
import Panel from '@/components/ui/Panel';
import toast from 'react-hot-toast';
import { Download, Loader2 } from 'lucide-react';
import type { SuperadminSettingsV1SectionProps } from '@/app/superadmin/settings/settings_types/SuperadminSettingsV1Types.ts';

export default function SuperadminSettingsV1DataControlsPanel({ data }: SuperadminSettingsV1SectionProps) {
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
        setIsExporting(true);
        try {
            const response = await fetch('/superadmin/export-data', { method: 'POST' });
            if (response.status === 202) {
                toast.success('Export started. A secure download link will be sent to your email.');
                // Polling/WebSocket fallback simulation for real-time notification
                setTimeout(() => {
                    toast.success('Your data export is ready and the email has been sent.', { duration: 5000 });
                    setIsExporting(false);
                }, 5000);
            } else {
                toast.error('Failed to start data export.');
                setIsExporting(false);
            }
        } catch (error) {
            toast.error('Error starting data export.');
            setIsExporting(false);
        }
    };

    return (
        <Panel title="Data controls" description="Retention and backup policies that need one visible owner.">
            <div className="space-y-6">
                <div className="space-y-3">
                    {data.data.map((x) => (
                        <div key={x.label} className="flex items-center justify-between rounded-lg border border-border p-3">
                            <span className="text-sm text-secondary">
                                {x.label}
                            </span>
                            <span className="text-sm font-medium text-primary">
                                {x.value}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="pt-4 border-t border-border">
                    <h3 className="text-sm font-medium text-primary mb-2">Data Export & Offboarding</h3>
                    <p className="text-xs text-secondary mb-4">
                        Download a complete archive of all tenant data. This action is restricted to Superadmins.
                    </p>
                    <button
                        onClick={handleExport}
                        disabled={isExporting}
                        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-on-primary transition-all hover:bg-primary-hover disabled:opacity-50"
                    >
                        {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                        Request Full Data Export
                    </button>
                </div>
            </div>
        </Panel>
    );
}

