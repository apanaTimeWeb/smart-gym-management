'use client';
import React, { useState } from 'react';
import { X, KeyRound, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateApiKeySchema } from '@/app/superadmin/integrations/integrations_types/SuperadminIntegrationsUiTypes';
import type { GenerateApiKeyFormValues, SuperadminGenerateApiKeyModalProps } from '@/app/superadmin/integrations/integrations_types/SuperadminIntegrationsUiTypes';
import toast from 'react-hot-toast';

export default function SuperadminGenerateApiKeyModal({ isOpen, onClose }: SuperadminGenerateApiKeyModalProps) {
  const [isSaving, setIsSaving] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<GenerateApiKeyFormValues>({
    resolver: zodResolver(generateApiKeySchema),
    defaultValues: { label: '', tenantId: '', scopes: ['Read'] }
  });

  if (!isOpen) return null;

  const onSubmit = async (data: GenerateApiKeyFormValues) => {
    setIsSaving(true);
    try {
      // Simulate API Call
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success('API Key generated successfully', { id: 'api-key-success' });
      reset();
      onClose();
    } catch (e: unknown) {
      toast.error('Failed to generate key', { id: 'api-key-error' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-overlay/80 z-40 flex items-center justify-center p-4 backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in" role="dialog" aria-modal="true">
      <div className="bg-overlay border border-border rounded-2xl w-full max-w-md shadow-dialog overflow-hidden flex flex-col motion-safe:animate-in motion-safe:zoom-in-95">
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-on-primary">
              <KeyRound size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary">Generate API Key</h2>
              <p className="text-sm text-secondary">Issue developer access for a tenant.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-secondary hover:text-primary hover:bg-input rounded-full motion-safe:transition-colors">
            <X size={18} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="p-6 flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-secondary mb-1 block">Key Label</label>
              <input 
                type="text" 
                placeholder="e.g. Zapier Integration" 
                {...register('label')} 
                className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-primary motion-safe:transition-colors"
              />
              {errors.label && <p className="text-xs text-danger mt-1">{errors.label.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-secondary mb-1 block">Tenant (Gym)</label>
              <select 
                {...register('tenantId')}
                className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-primary motion-safe:transition-colors"
              >
                <option value="">Select a tenant...</option>
                <option value="gym-001">Titan Fitness (gym-001)</option>
                <option value="gym-002">Iron Athletics (gym-002)</option>
                <option value="gym-003">Zenith Yoga (gym-003)</option>
              </select>
              {errors.tenantId && <p className="text-xs text-danger mt-1">{errors.tenantId.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-secondary mb-2 block">API Scopes</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-primary cursor-pointer">
                  <input type="checkbox" value="Read" {...register('scopes')} className="rounded border-border text-primary focus:ring-primary" />
                  Read (Data Export)
                </label>
                <label className="flex items-center gap-2 text-sm text-primary cursor-pointer">
                  <input type="checkbox" value="Write" {...register('scopes')} className="rounded border-border text-primary focus:ring-primary" />
                  Write (Mutations)
                </label>
              </div>
              {errors.scopes && <p className="text-xs text-danger mt-1">{errors.scopes.message}</p>}
            </div>
            
            <div className="bg-warning-bg/50 border border-warning/20 rounded-lg p-3 mt-2">
              <p className="text-xs text-warning">
                <strong>Important:</strong> The secret key will only be shown once after generation. Make sure the tenant is ready to store it securely.
              </p>
            </div>
          </div>

          <div className="px-6 py-5 border-t border-border flex justify-end gap-3 bg-sidebar/50">
            <button type="button" onClick={onClose} className="px-5 py-2.5 bg-transparent border border-border hover:bg-input text-primary font-medium rounded-lg motion-safe:transition-colors text-sm">
              Cancel
            </button>
            <button type="submit" disabled={isSaving} className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-on-primary font-medium rounded-lg motion-safe:transition-colors text-sm disabled:cursor-not-allowed">
              {isSaving && <Loader2 className="w-4 h-4 motion-safe:animate-spin" />}
              Generate Key
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
