'use client';
import * as WhatsAppFormatter from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_utils/SuperadminGymsWhatsappReceiptFormatter';
// DATA FLOW: Superadmin UI → useSuperadminGymsGymWhatsappModal → Superadmin module API/state → consuming component
import { useSuperadminGymsStore } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_store/useSuperadminGymsStore';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { gymWhatsappSchema } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_schemas/SuperadminGymsSchema';
import { useEffect, useRef } from 'react';
import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_api/SuperadminGymsApi';
import { toast } from 'sonner';

// RESPONSIBILITY: Handles form validation, modal state, and API submission for sending a WhatsApp message to a Gym owner.
// DATA FLOW: SuperadminGymsGymWhatsappModal -> useSuperadminGymsGymWhatsappModal -> API
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { SUPERADMIN_GYMS_EXTERNAL } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_url_config';
import { SUPERADMIN_GYMS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_constants/SuperadminGymsQueryKeys';
import { formatSuperadminGymWhatsappReceiptDate } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_utils/SuperadminGymsGymWhatsappReceiptUtils';
import { useSuperadminLayoutUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard';

import type { GymWhatsappFormValues } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_schemas/SuperadminGymsSchema';


/**
 * Purpose: Handles form validation, modal state, and API submission for sending a WhatsApp message to a Gym owner.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
/**
 * @description Manages gyms state, queries, and UI interactions for useSuperadminGymsGymWhatsappModal.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminGymsGymWhatsappModal → consuming feature component.
export function useSuperadminGymsGymWhatsappModal() {
    const t = useTranslations('superadmin_gyms');
    const idempotencyKeyRef = useRef<string | null>(null);
    const isWhatsappModalOpen = useSuperadminGymsStore(state => state.isWhatsappModalOpen);
    const closeWhatsappModal = useSuperadminGymsStore(state => state.closeWhatsappModal);
    const selectedGym = useSuperadminGymsStore(state => state.selectedGym);
    const locale = useLocale();
        const { register, handleSubmit, reset, formState: { errors, isSubmitting, isDirty }, } = useForm<GymWhatsappFormValues>({
        resolver: zodResolver(gymWhatsappSchema),
    });
    // RESPONSIBILITY: Handle side-effects for useSuperadminGymsGymWhatsappModal
    // EXPLANATION: Synchronize component state with external dependencies.
    // EFFECT DEPENDENCIES: Documented intentionally.
    // EFFECT INTENT: Synchronize local/UI state with the listed external dependencies.
    useEffect(() => {
        if (isWhatsappModalOpen) {
            reset({ subject: '', message: '' });
        }
    }, [isWhatsappModalOpen, reset]);
    useSuperadminLayoutUnsavedChangesGuard(isDirty && isWhatsappModalOpen && !isSubmitting, t('ui.unsent_whatsapp_discard_repair'));
    const queryClient = useQueryClient();
    const whatsappMutation = useMutation({
        mutationFn: ({ data, idempotencyKey }: { data: GymWhatsappFormValues & {
            phone: string;
            ownerName: string;
            gymName: string;
        }; idempotencyKey: string }) => gymsApi.emailGymOwner(selectedGym!.id, data as unknown as Parameters<typeof gymsApi.emailGymOwner>[1], idempotencyKey), // Still calling API for record keeping if necessary, or just skip
        onSuccess: (res, variables) => {
            if (variables.data.phone) {
                const cleanPhone = String(variables.data.phone).replace(/\D/g, '');
                const dateStr = formatSuperadminGymWhatsappReceiptDate(new Date(), locale);
                const waText = WhatsAppFormatter.formatReceipt({
                    title: 'Smart Gym 360',
                    subtitle: String(variables.data.subject),
                    date: dateStr,
                    customerInfo: {
                        Owner: String(variables.data.ownerName || 'Gym Owner'),
                        Gym: String(variables.data.gymName || 'Gym')
                    },
                    sections: [
                        {
                            title: 'Message',
                            items: {
                                'Content': String(variables.data.message)
                            }
                        }
                    ],
                    footer: 'Powered by Smart Gym 360'
                });
                window.open(SUPERADMIN_GYMS_EXTERNAL.WHATSAPP_CLICK_TO_CHAT(cleanPhone, waText), '_blank', 'noopener,noreferrer');
            }
            toast.success(res.message, { id: 'superadmin-toast-e6e0b4a6e8' });
            void queryClient.invalidateQueries({ queryKey: SUPERADMIN_GYMS_QUERY_KEYS.all });
            idempotencyKeyRef.current = null;
            closeWhatsappModal();
        },
        onError: (err: unknown) => {
            toast.error((err as Error).message, { id: 'failed-to-send-whatsapp' });
        }
    });
    const onSubmit = async (data: GymWhatsappFormValues) => {
        if (selectedGym) {
            idempotencyKeyRef.current ??= crypto.randomUUID();
            whatsappMutation.mutate({
                data: {
                  ...data,
                phone: selectedGym.phone,
                ownerName: selectedGym.ownerName,
                gymName: selectedGym.name
                },
                idempotencyKey: idempotencyKeyRef.current,
            });
        }
    };
    return {
        isWhatsappModalOpen,
        closeWhatsappModal,
        selectedGym,
        register,
        handleSubmit,
        onSubmit,
        errors,
        isSubmitting: isSubmitting || whatsappMutation.isPending,
        isDirty,
    };
}
