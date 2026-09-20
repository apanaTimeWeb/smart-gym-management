'use client';
import { useState } from 'react';
import type { AdminCampaignsQueueItem, AdminCampaignsRecipient } from '@/app/admin/campaigns/campaigns_types/AdminCampaignsTypes';
import { buildAdminWhatsAppLink, replaceAdminCampaignVariables } from '@/app/admin/campaigns/campaigns_utils/AdminCampaignsWhatsAppUtils';
import AdminCampaignsAudiencePicker from '@/app/admin/campaigns/campaigns_components/AdminCampaignsAudiencePicker/AdminCampaignsAudiencePicker';
import AdminCampaignsTemplatePicker from '@/app/admin/campaigns/campaigns_components/AdminCampaignsTemplatePicker/AdminCampaignsTemplatePicker';
import AdminCampaignsComposer from '@/app/admin/campaigns/campaigns_components/AdminCampaignsComposer/AdminCampaignsComposer';
import AdminCampaignsBulkModal from '@/app/admin/campaigns/campaigns_components/AdminCampaignsBulkModal/AdminCampaignsBulkModal';
import { ADMIN_CAMPAIGNS_AUDIENCES, ADMIN_CAMPAIGNS_RECIPIENTS_EXPIRING, ADMIN_CAMPAIGNS_RECIPIENTS_PENDING, ADMIN_CAMPAIGNS_TEMPLATES } from '@/app/admin/campaigns/campaigns_mocks/fixtures/AdminCampaignsMockFixtures';
import { Rocket, Send } from 'lucide-react';

export default function AdminCampaignsMain() {
  const [audienceId, setAudienceId] = useState<string>('');
  const [templateId, setTemplateId] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [queue, setQueue] = useState<AdminCampaignsQueueItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // In a real app, this would be fetched from the backend via TanStack query
  const getRecipientsForAudience = (audId: string): AdminCampaignsRecipient[] => {
    if (audId === 'aud_pending') return ADMIN_CAMPAIGNS_RECIPIENTS_PENDING;
    if (audId === 'aud_expiring') return ADMIN_CAMPAIGNS_RECIPIENTS_EXPIRING;
    if (audId === 'aud_all') return [...ADMIN_CAMPAIGNS_RECIPIENTS_PENDING, ...ADMIN_CAMPAIGNS_RECIPIENTS_EXPIRING];
    return [];
  };

  const handleTemplateSelect = (id: string) => {
    setTemplateId(id);
    const tpl = ADMIN_CAMPAIGNS_TEMPLATES.find(t => t.id === id);
    if (tpl) setBody(tpl.body);
  };

  const handlePreviewAndSend = () => {
    if (!audienceId || !body) return;
    const recipients = getRecipientsForAudience(audienceId);
    
    const newQueue: AdminCampaignsQueueItem[] = recipients.map(recipient => ({
      recipient,
      status: 'QUEUED',
      message: replaceAdminCampaignVariables(body, recipient)
    }));
    
    setQueue(newQueue);
    setIsModalOpen(true);
  };

  const handleOpen = (index: number) => {
    const item = queue[index];
    if (!item) return;
    
    window.open(buildAdminWhatsAppLink(item.recipient.phone, item.message), '_blank', 'noopener,noreferrer');
    
    setQueue(current => current.map((q, i) => 
      i === index && q.status === 'QUEUED' ? { ...q, status: 'OPENED' } : q
    ));
  };

  const handleMarkStatus = (index: number, status: AdminCampaignsQueueItem['status']) => {
    setQueue(current => current.map((q, i) => 
      i === index ? { ...q, status } : q
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
          <Rocket className="text-primary" size={24} />
          Global Marketing & CRM
        </h1>
        <p className="text-sm text-secondary">
          Run bulk WhatsApp campaigns across all your branches efficiently.
        </p>
      </div>

      <AdminCampaignsAudiencePicker 
        audiences={ADMIN_CAMPAIGNS_AUDIENCES}
        selectedAudienceId={audienceId}
        onSelect={(id) => { setAudienceId(id); setQueue([]); }}
      />

      <AdminCampaignsTemplatePicker 
        templates={ADMIN_CAMPAIGNS_TEMPLATES}
        selectedTemplateId={templateId}
        onSelect={handleTemplateSelect}
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <AdminCampaignsComposer 
          body={body}
          onChange={setBody}
        />
        
        <div className="flex flex-col justify-end">
          <button
            onClick={handlePreviewAndSend}
            disabled={!audienceId || !body.trim()}
            className="w-full py-4 flex items-center justify-center gap-2 rounded-xl bg-primary text-lg text-on-primary font-bold shadow-lg hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02]"
          >
            <Send size={20} />
            Preview & Send
          </button>
        </div>
      </div>

      <AdminCampaignsBulkModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        queue={queue}
        onOpenItem={handleOpen}
        onMarkSent={(i) => handleMarkStatus(i, 'SENT')}
        onSkip={(i) => handleMarkStatus(i, 'SKIPPED')}
      />
    </div>
  );
}
