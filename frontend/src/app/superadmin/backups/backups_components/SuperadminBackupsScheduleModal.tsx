import React, { useState } from 'react';
import { Clock, Check } from 'lucide-react';
import toast from 'react-hot-toast';

interface SuperadminBackupsScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuperadminBackupsScheduleModal({ isOpen, onClose }: SuperadminBackupsScheduleModalProps) {
  const [cronExpression, setCronExpression] = useState('0 2 * * *');
  const [retentionDays, setRetentionDays] = useState(30);
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSave = async () => {
    setIsSaving(true);
    // Mock save logic
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Backup schedule updated successfully');
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-card w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-border motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95">
        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-info/10 text-info flex items-center justify-center mb-4">
            <Clock size={24} />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Automated Backup Schedule</h2>
          <p className="text-sm text-secondary mb-6">
            Configure the cron expression for automated global pg_dump snapshots.
          </p>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Cron Expression</label>
              <input 
                type="text" 
                value={cronExpression}
                onChange={(e) => setCronExpression(e.target.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary font-mono"
                placeholder="* * * * *"
              />
              <p className="text-xs text-secondary mt-1">
                Current: Runs every day at 02:00 AM
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Retention Period (Days)</label>
              <input 
                type="number" 
                value={retentionDays}
                onChange={(e) => setRetentionDays(Number(e.target.value))}
                min={1}
                max={365}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
          </div>
          
          <div className="flex gap-3 justify-end mt-6">
            <button 
              onClick={onClose}
              className="px-4 py-2 rounded-lg font-medium border border-border text-foreground hover:bg-card-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving || !cronExpression.trim()}
              className="px-4 py-2 rounded-lg font-medium bg-primary hover:bg-primary-hover text-white flex items-center gap-2 motion-safe:transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {isSaving ? (
                <>Saving...</>
              ) : (
                <><Check size={16} /> Save Schedule</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
