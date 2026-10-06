'use client';
// DATA FLOW: Selected churn member + tier → composer state hook → churn-recovery composer UI → message/channel action.

import { useEffect, useState } from 'react';
import { CANCELLATIONS_WIN_BACK_TEMPLATES, COMM_CHANNEL_VALUES } from '@/app/frontend_manager/manager_communications/manager_communications_constants/ManagerCommunicationsSharedConstants';
import type { CommChannel, WinBackTemplateTier } from '@/app/frontend_manager/manager_communications/manager_communications_types/ManagerCommunicationsTypes';

/**
 * @description Owns the churn-recovery composer draft and synchronizes it with the selected member/default tier.
 * @dependencies Module-owned win-back templates and channel constants.
 * @edge-case Reinitializes draft content when the member or default tier changes while keeping manual tier changes local to the current composer.
 */
export function useManagerCommunicationsChurnRecoveryComposerState(member: unknown, defaultTier: WinBackTemplateTier) {
  const [channel, setChannel] = useState<CommChannel>(COMM_CHANNEL_VALUES[0]);
  const [tier, setTier] = useState<WinBackTemplateTier>(defaultTier);
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');

  // EFFECT: Rehydrate the composer when the selected member or default tier changes so the UI reflects the current business context.
  useEffect(() => {
    setTier(defaultTier);
    const template = CANCELLATIONS_WIN_BACK_TEMPLATES[defaultTier];
    setMessage(template.message);
    setSubject(template.subject);
    setChannel(COMM_CHANNEL_VALUES[0]);
  }, [defaultTier, member]);

  const handleTierChange = (newTier: WinBackTemplateTier) => {
    setTier(newTier);
    const template = CANCELLATIONS_WIN_BACK_TEMPLATES[newTier];
    setMessage(template.message);
    setSubject(template.subject);
  };

  return { channel, setChannel, tier, setTier, message, setMessage, subject, setSubject, handleTierChange };
}
