// RESPONSIBILITY: Handles form validation, modal state, and API submission for editing a Gym.
// DATA FLOW: GymEditModal -> useGymEditModal -> useGymsStore

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGymsStore } from '@/app/superadmin/gyms/gyms_store/useGymsStore';
import { useSuperadminData } from '@/app/superadmin/superadmin_utils/useSuperadminData';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { SubscriptionPlan } from '@/app/superadmin/superadmin_types/superadmin_types';

const gymEditSchema = z.object({
  name: z.string().min(1, 'Gym Name is required'),
  ownerName: z.string().min(1, 'Owner Name is required'),
  adminEmail: z.string().email('Invalid email address'),
  plan: z.string().min(1, 'Please select a plan'),
});

type GymEditFormValues = z.infer<typeof gymEditSchema>;

export function useGymEditModal() {
  const isEditModalOpen = useGymsStore(state => state.isEditModalOpen);
  const closeEditModal = useGymsStore(state => state.closeEditModal);
  const selectedGym = useGymsStore(state => state.selectedGym);
  const handleEditGym = useGymsStore(state => state.handleEditGym);
  
  const { data: plans, fetchState: fetchStatePlans } = useSuperadminData<SubscriptionPlan[]>(SuperadminUrlConfig.BACKEND_API.PLANS_BASE);
  const loadingPlans = fetchStatePlans === 'loading';

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<GymEditFormValues>({
    resolver: zodResolver(gymEditSchema),
  });

  useEffect(() => {
    if (selectedGym && isEditModalOpen) {
      reset({
        name: selectedGym.name,
        ownerName: selectedGym.ownerName,
        adminEmail: selectedGym.adminEmail,
        plan: selectedGym.plan,
      });
    }
  }, [selectedGym, isEditModalOpen, reset]);

  const onSubmit = async (data: GymEditFormValues) => {
    if (selectedGym) {
      await handleEditGym(selectedGym.id, data);
    }
  };

  return {
    isEditModalOpen,
    closeEditModal,
    selectedGym,
    plans,
    loadingPlans,
    register,
    handleSubmit,
    onSubmit,
    control,
    errors,
    isSubmitting,
  };
}
