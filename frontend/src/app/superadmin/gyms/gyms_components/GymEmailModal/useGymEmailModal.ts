// RESPONSIBILITY: Handles form validation, modal state, and API submission for sending an email to a Gym owner.
// DATA FLOW: GymEmailModal -> useGymEmailModal -> useGymsStore

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGymsStore } from '@/app/superadmin/gyms/gyms_store/useGymsStore';

const gymEmailSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});

type GymEmailFormValues = z.infer<typeof gymEmailSchema>;

export function useGymEmailModal() {
  const isEmailModalOpen = useGymsStore(state => state.isEmailModalOpen);
  const closeEmailModal = useGymsStore(state => state.closeEmailModal);
  const selectedGym = useGymsStore(state => state.selectedGym);
  const handleEmailOwner = useGymsStore(state => state.handleEmailOwner);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GymEmailFormValues>({
    resolver: zodResolver(gymEmailSchema),
  });

  useEffect(() => {
    if (isEmailModalOpen) {
      reset({ subject: '', message: '' });
    }
  }, [isEmailModalOpen, reset]);

  const onSubmit = async (data: GymEmailFormValues) => {
    if (selectedGym) {
      await handleEmailOwner(selectedGym.id, data);
    }
  };

  return {
    isEmailModalOpen,
    closeEmailModal,
    selectedGym,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  };
}
