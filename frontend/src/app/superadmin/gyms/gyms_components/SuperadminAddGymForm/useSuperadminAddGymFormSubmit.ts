// DATA FLOW: feature API/schema → hook/context → useSuperadminAddGymFormSubmit consumers.
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { gymsApi } from '@/app/superadmin/gyms/superadmin_gyms_api/superadmin_gyms_api';
import { GymsUrlConfig } from '@/app/superadmin/gyms/superadmin_gyms_url_config';
import { WhatsAppFormatter } from '@/lib/whatsapp_formatter';
import type { OnboardGymFormValues } from '@/app/superadmin/gyms/gyms_utils/SuperadminGymsValidationSchemas';

const PROVISIONING_DELAYS = {
  VALIDATE: 800,
  CREATE_DB: 1500,
  RUN_MIGRATIONS: 2000,
  CREATE_USER: 1000,
  SEND_WHATSAPP: 800,
  REDIRECT: 500,
} as const;

export function useSuperadminAddGymFormSubmit() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [provisioningLogs, setProvisioningLogs] = useState<string[]>([]);

  const addLog = (msg: string) => setProvisioningLogs(prev => [...prev, msg]);
  const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

  const onSubmit = async (data: OnboardGymFormValues) => {
    const cleanPhone = data.phone.replace(/\D/g, '');
    let waWindow: Window | null = null;
    if (cleanPhone) {
      waWindow = window.open('about:blank', '_blank');
    }

    setIsProvisioning(true);
    setProvisioningLogs([]);

    addLog('Validating payload...');
    await delay(PROVISIONING_DELAYS.VALIDATE);

    addLog(`Executing: CREATE DATABASE gym_${data.gymName.toLowerCase().replace(/\s/g, '_')}...`);
    await delay(PROVISIONING_DELAYS.CREATE_DB);

    addLog('Running TypeORM migrations on new database...');
    await delay(PROVISIONING_DELAYS.RUN_MIGRATIONS);

    addLog('Creating Admin User account...');
    await delay(PROVISIONING_DELAYS.CREATE_USER);

    addLog('Sending WhatsApp message with temporary password...');
    await delay(PROVISIONING_DELAYS.SEND_WHATSAPP);

    try {
      const dateStr = new Intl.DateTimeFormat('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true
      }).format(new Date());

      const waText = WhatsAppFormatter.formatReceipt({
        title: 'Smart Gym 360',
        subtitle: 'Tenant Provisioning',
        date: dateStr,
        customerInfo: {
          Owner: data.ownerName,
          Gym: data.gymName
        },
        sections: [
          {
            title: 'Account Details',
            items: {
              Email: data.adminEmail,
              Pass: data.temporaryPassword
            }
          },
          {
            items: {
              Plan: String(data.plan).toUpperCase()
            }
          }
        ],
        footer: 'Please login to continue'
      });

      if (cleanPhone && waWindow) {
        waWindow.location.href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waText)}`;
      } else if (cleanPhone && !waWindow) {
        window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(waText)}`, '_blank');
      }

      addLog('Sending payload to backend...');
      const response = await gymsApi.provisionGym({
        ...data,
        planId: data.plan
      });

      queryClient.invalidateQueries({ queryKey: ['superadmin', 'gyms'] });

      addLog('Provisioning complete! Redirecting...');
      await delay(PROVISIONING_DELAYS.REDIRECT);

      toast.success(response.message);
      router.push(GymsUrlConfig.PAGES.MAIN);
    } catch (e: unknown) {
      if (waWindow) waWindow.close();
      const errMsg = e instanceof Error ? e.message : 'An error occurred';
      addLog(`Error: ${errMsg}`);
      toast.error(errMsg);
    } finally {
      setIsProvisioning(false);
    }
  };

  return { onSubmit, isProvisioning, provisioningLogs };
}

