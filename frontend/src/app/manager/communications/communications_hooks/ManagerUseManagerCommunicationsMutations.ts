// DATA FLOW: Composer UI → useManagerCommunicationsMutations → ManagerCommunicationsApi → TanStack Query cache
'use client';
/** Manages UseCommunicationsMutations for the Manager module. */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ManagerCommunicationsApi } from '@/app/manager/communications/communications_api/ManagerCommunicationsApi';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/manager/manager_infrastructure/ManagerToastService';
import type { CommFormValues, CommAutomation } from '@/app/manager/communications/communications_types/ManagerCommunications_types';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerCommunicationsMutations() {
  const qc = useQueryClient();
  const sendMutation = useMutation({
    mutationFn: (payload: CommFormValues & { recipientCount: number; segmentLabel: string }) => ManagerCommunicationsApi.sendCampaign(payload),
    onSuccess: (res) => { showManagerSuccessToast(res.message, 'manager-communications-campaign-success'); qc.invalidateQueries({ queryKey: ['manager', 'communications'] }); },
    onError: (err: unknown) => showManagerErrorToast(err, 'manager-communications-campaign-error') });
  const automationMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<CommAutomation> }) => ManagerCommunicationsApi.updateAutomation(id, payload),
    onSuccess: (res) => { qc.invalidateQueries({ queryKey: ['manager', 'communications', 'automations'] }); showManagerSuccessToast(res.message, 'manager-communications-automation-success'); },
    onError: (err: unknown) => showManagerErrorToast(err, 'manager-communications-automation-error') });
  return { sendMutation, automationMutation };
}
