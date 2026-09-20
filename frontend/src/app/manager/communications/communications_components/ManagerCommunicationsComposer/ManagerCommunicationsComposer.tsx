// RESPONSIBILITY: Full campaign composer. RHF owns draft state; the communications logic hook owns server data and mutation orchestration.
'use client';
import { useState } from 'react';
import { MessageCircle, Mail, Send, Loader2, Users, Eye, Zap } from 'lucide-react';
import ManagerCommunicationsBulkMessageModal from '@/app/manager/communications/communications_components/ManagerCommunicationsBulkMessageModal/ManagerCommunicationsBulkMessageModal';
import ManagerCommunicationsSegmentPicker from '@/app/manager/communications/communications_components/ManagerCommunicationsSegmentPicker/ManagerCommunicationsSegmentPicker';
import { useManagerCommunicationsForm } from '@/app/manager/communications/communications_hooks/ManagerUseManagerCommunicationsForm';
import { ManagerCommunicationsUrlConfig } from '@/app/manager/communications/communications_url_config';
import { COMM_MESSAGE_TEMPLATES } from '@/app/manager/communications/communications_utils/ManagerCommunicationsSharedConstants';
import type { CommChannel } from '@/app/manager/communications/communications_types/ManagerCommunications_types';
import type { CommSegment } from '@/app/manager/communications/communications_types/ManagerCommunications_types';



export default function ManagerCommunicationsComposer() {
  const { selectedChannel, setSelectedChannel, selectedSegment, segmentRecipients, loadingRecipients, sending, form, applyTemplate, submit, handleCancel } = useManagerCommunicationsForm();
  const [showPreview, setShowPreview] = useState(false);
  const watchedChannel = form.watch('channel');
  const watchedMessage = form.watch('message');
  const bulkRecipients = segmentRecipients.map((r) => ({ name: r.name, phone: r.phone, email: r.email }));

  return <div className="bg-card border border-border rounded-xl p-6 space-y-6">
    <ManagerCommunicationsSegmentPicker />
    <div className="space-y-2"><div id="manager-communications-channel-label" className="block text-sm font-semibold text-secondary uppercase tracking-wider">2. Choose Channel</div><div role="radiogroup" aria-labelledby="manager-communications-channel-label" className="flex flex-wrap gap-3">
      <label className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold cursor-pointer motion-safe:transition-colors ${watchedChannel === 'whatsapp' ? 'bg-social-whatsapp text-on-primary border-social-whatsapp' : 'bg-input border-border text-secondary'}`}>
        <input type="radio" value="whatsapp" {...form.register('channel')} className="sr-only" checked={watchedChannel === 'whatsapp'} onChange={() => { setSelectedChannel('whatsapp'); form.setValue('channel', 'whatsapp', { shouldDirty: true, shouldValidate: true }); }} />
        <MessageCircle size={18} />WhatsApp
      </label>
      <label className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold cursor-pointer motion-safe:transition-colors ${watchedChannel === 'email' ? 'bg-primary text-on-primary border-primary' : 'bg-input border-border text-secondary'}`}>
        <input type="radio" value="email" {...form.register('channel')} className="sr-only" checked={watchedChannel === 'email'} onChange={() => { setSelectedChannel('email'); form.setValue('channel', 'email', { shouldDirty: true, shouldValidate: true }); }} />
        <Mail size={18} />Email
      </label>
    </div></div>
    <div className="space-y-4"><label className="block text-sm font-semibold text-secondary uppercase tracking-wider">3. Compose Message</label>
      <div className="bg-input border border-border rounded-lg p-3"><label className="block text-xs font-semibold text-primary mb-2 flex items-center gap-1.5"><Zap size={18} className="text-warning" />Quick Templates</label><div className="flex flex-wrap gap-2">{(Object.keys(COMM_MESSAGE_TEMPLATES) as CommSegment[]).map((segment) => <button key={segment} type="button" onClick={() => applyTemplate(segment)} className="px-3 py-1.5 text-xs font-medium bg-card border border-border rounded-md">{COMM_MESSAGE_TEMPLATES[segment].subject}</button>)}</div></div>
      <div><label htmlFor="manager-communications-title" className="block text-xs font-medium text-secondary mb-1">Campaign Title *</label><input id="manager-communications-title" {...form.register('title')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-primary" />{form.formState.errors.title && <p className="text-xs text-danger mt-1">{form.formState.errors.title.message}</p>}</div>
      {watchedChannel === 'email' && <div><label htmlFor="manager-communications-subject" className="block text-xs font-medium text-secondary mb-1">Email Subject *</label><input id="manager-communications-subject" {...form.register('subject')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-primary" /></div>}
      <div><label htmlFor="manager-communications-message" className="block text-xs font-medium text-secondary mb-1">Message Body *</label><textarea id="manager-communications-message" rows={6} {...form.register('message')} className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-primary resize-none" /><p className="text-xs text-secondary mt-1">{watchedMessage.length} characters</p></div>
    </div>
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border"><div className="flex items-center gap-2 text-sm text-secondary">{loadingRecipients ? <Loader2 size={18} className="motion-safe:animate-spin" /> : <Users size={18} />}{loadingRecipients ? 'Loading recipients...' : `${segmentRecipients.length} recipient${segmentRecipients.length === 1 ? '' : 's'}`}</div><div className="flex gap-3">{segmentRecipients.length > 0 && <button type="button" onClick={() => setShowPreview(true)} className="flex items-center gap-2 px-4 py-2 bg-input border border-border rounded-lg text-sm font-medium"><Eye size={18} />Preview & Send</button>}<button type="button" onClick={submit} disabled={sending || loadingRecipients || segmentRecipients.length === 0} className="min-w-32 flex items-center gap-2 px-5 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold disabled:opacity-50 motion-safe:transition-colors">{sending ? <Loader2 size={18} className="motion-safe:animate-spin" /> : <Send size={18} />}{sending ? 'Sending...' : 'Send Campaign'}</button></div></div>
    {showPreview && <ManagerCommunicationsBulkMessageModal whatsappUrlBuilder={(phone, message) => `${ManagerCommunicationsUrlConfig.INTEGRATIONS.WHATSAPP_WEB_BASE}/${phone}?text=${encodeURIComponent(message)}`} open={showPreview} onClose={() => setShowPreview(false)} recipients={bulkRecipients} type={watchedChannel as CommChannel} defaultMessage={watchedMessage} />}
  </div>;
}
