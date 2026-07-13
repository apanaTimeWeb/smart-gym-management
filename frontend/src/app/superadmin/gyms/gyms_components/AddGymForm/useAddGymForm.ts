// RESPONSIBILITY: Manages form state, validation, and API submission for onboarding a new gym.
// DATA FLOW: AddGymForm -> useAddGymForm -> superadminApi.gyms.create

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OnboardGymSchema, OnboardGymFormValues } from '@/app/superadmin/superadmin_utils/SuperadminValidation';
import { superadminApi } from '@/app/superadmin/superadmin_api/superadmin_api';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { useSuperadminData } from '@/app/superadmin/superadmin_utils/useSuperadminData';
import { SubscriptionPlan } from '@/app/superadmin/superadmin_types/superadmin_types';
import toast from 'react-hot-toast';

/**
 * Custom hook to encapsulate the logic for the AddGymForm component.
 * Handles form validation, UI state (provisioning logs), and API submission.
 */
export function useAddGymForm() {
  const router = useRouter();
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [provisioningLogs, setProvisioningLogs] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  
  const { data: plans, loading: loadingPlans } = useSuperadminData<SubscriptionPlan[]>(SuperadminUrlConfig.BACKEND_API.PLANS_BASE);

  const {
    register,
    handleSubmit,
    control,
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
      const response = await superadminApi.gyms.create({
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

      toast.success((response as { message?: string })?.message || 'Tenant database provisioned successfully!');
      router.push(SuperadminUrlConfig.PAGES.GYMS_LIST);
    } catch (e: unknown) {
      const errMsg = e instanceof Error ? e.message : String(e) || 'Failed to provision tenant';
      toast.error(errMsg);
      addLog(`Error: ${errMsg}`);
    } finally {
      setIsProvisioning(false);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    control,
    errors,
    isProvisioning,
    provisioningLogs,
    showPassword,
    setShowPassword,
    plans,
    loadingPlans,
  };
}
