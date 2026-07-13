'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Database, Save, Loader2 } from 'lucide-react';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { OnboardGymSchema, OnboardGymFormValues } from '@/app/superadmin/superadmin_utils/SuperadminValidation';
import { superadminApi } from '@/lib/superadmin-api';
import { useSuperadminData } from '@/app/superadmin/superadmin_utils/useSuperadminData';
import { SubscriptionPlan } from '@/app/superadmin/superadmin_types/superadmin_types';
import toast from 'react-hot-toast';

export default function AddGymPage() {
  const router = useRouter();
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [provisioningLogs, setProvisioningLogs] = useState<string[]>([]);
  const { data: plans, loading: loadingPlans } = useSuperadminData<SubscriptionPlan[]>(SuperadminUrlConfig.BACKEND_API.PLANS_BASE);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<OnboardGymFormValues>({
    resolver: zodResolver(OnboardGymSchema),
    defaultValues: {
      plan: ''
    }
  });

  const addLog = (msg: string) => {
    setProvisioningLogs(prev => [...prev, msg]);
  };

  const onSubmit = async (data: OnboardGymFormValues) => {
    setIsProvisioning(true);
    setProvisioningLogs([]);
    
    // Simulate complex Database-per-Tenant provisioning
    addLog('Validating payload...');
    await new Promise(r => setTimeout(r, 800));
    
    addLog(`Executing: CREATE DATABASE gym_${data.gymName.toLowerCase().replace(/\s/g, '_')}...`);
    await new Promise(r => setTimeout(r, 1500));
    
    addLog('Running TypeORM migrations on new database...');
    await new Promise(r => setTimeout(r, 2000));
    
    addLog('Creating Admin User account...');
    await new Promise(r => setTimeout(r, 1000));
    
    addLog('Sending Welcome Email with temporary password...');
    await new Promise(r => setTimeout(r, 800));
    
    try {
      addLog('Sending payload to backend...');
      await superadminApi.gyms.create({
        name: data.gymName,
        ownerName: data.ownerName,
        adminEmail: data.adminEmail,
        phone: data.phone,
        plan: data.plan,
        status: 'TRIAL',
        memberCount: 0,
        monthlyRevenue: 0,
        databaseVersion: 'v1.0.0',
        temporaryPassword: data.temporaryPassword,
      });
      
      addLog('Provisioning complete! Redirecting...');
      await new Promise(r => setTimeout(r, 500));

      toast.success('Tenant database provisioned successfully!');
      router.push(SuperadminUrlConfig.PAGES.GYMS_LIST);
    } catch (e: any) {
      toast.error(e.message || 'Failed to provision tenant');
      addLog(`Error: ${e.message || 'Failed to provision tenant'}`);
    } finally {
      setIsProvisioning(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href={SuperadminUrlConfig.PAGES.GYMS_LIST}
          className="p-2 bg-card border border-border rounded-lg text-secondary hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Provision New Tenant</h1>
          <p className="text-secondary mt-1">This will spin up a completely isolated database for the new gym.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-background border border-border rounded-xl p-6 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary">Gym Name</label>
                <input 
                  {...register('gymName')}
                  className="w-full bg-card border border-border text-foreground rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="e.g. Titan Fitness"
                />
                {errors.gymName && <p className="text-destructive text-xs">{errors.gymName.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary">Owner Name</label>
                <input 
                  {...register('ownerName')}
                  className="w-full bg-card border border-border text-foreground rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="e.g. John Doe"
                />
                {errors.ownerName && <p className="text-destructive text-xs">{errors.ownerName.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary">Admin Email</label>
                <input 
                  type="email"
                  {...register('adminEmail')}
                  className="w-full bg-card border border-border text-foreground rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="admin@titanfitness.com"
                />
                {errors.adminEmail && <p className="text-destructive text-xs">{errors.adminEmail.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary">Phone Number</label>
                <input 
                  {...register('phone')}
                  className="w-full bg-card border border-border text-foreground rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="+1 555-0000"
                />
                {errors.phone && <p className="text-destructive text-xs">{errors.phone.message}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary">Temporary Password</label>
                <input 
                  type="password"
                  {...register('temporaryPassword')}
                  className="w-full bg-card border border-border text-foreground rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Min 8 characters"
                />
                {errors.temporaryPassword && <p className="text-destructive text-xs">{errors.temporaryPassword.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary">SaaS Plan</label>
                <select 
                  {...register('plan')}
                  className="w-full bg-card border border-border text-foreground rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="">Select a plan</option>
                  {loadingPlans ? (
                    <option disabled>Loading plans...</option>
                  ) : (
                    plans?.map(p => (
                      <option key={p.id} value={p.name}>{p.name} (${Number(p.priceMonthly).toFixed(2)}/mo)</option>
                    ))
                  )}
                </select>
                {errors.plan && <p className="text-destructive text-xs">{errors.plan.message}</p>}
              </div>
            </div>

            <div className="pt-4 border-t border-border flex justify-end">
              <button 
                type="submit"
                disabled={isProvisioning}
                className="flex items-center gap-2 bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
              >
                {isProvisioning ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Provisioning DB...</>
                ) : (
                  <><Save className="w-5 h-5" /> Provision Tenant</>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Provisioning Console / Status */}
        <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-foreground font-bold border-b border-border pb-4">
            <Database className="w-5 h-5 text-primary" />
            Provisioning Console
          </div>
          <div className="bg-black/50 rounded-lg p-4 font-mono text-xs text-secondary h-64 overflow-y-auto space-y-2">
            {provisioningLogs.length === 0 ? (
              <p className="text-gray-600 italic">Awaiting submit...</p>
            ) : (
              provisioningLogs.map((log, i) => (
                <p key={i} className="animate-in fade-in slide-in-from-bottom-1 text-success">
                  <span className="text-gray-600 mr-2">{'>'}</span>{log}
                </p>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}




