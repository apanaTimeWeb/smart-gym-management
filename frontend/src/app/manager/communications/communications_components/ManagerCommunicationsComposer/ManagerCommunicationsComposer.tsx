'use client';
// RESPONSIBILITY: Full campaign composer. RHF owns draft state; the communications logic hook owns server data and mutation orchestration.
import { MessageCircle, Mail, Send, Loader2, Users, Eye, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useManagerCommunicationsLogic } from '@/app/manager/communications/communications_context/ManagerUseManagerCommunicationsLogic';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_utils/ManagerUnsavedChangesGuard';
import ManagerCommunicationsSegmentPicker from '@/app/manager/communications/communications_components/ManagerCommunicationsSegmentPicker/ManagerCommunicationsSegmentPicker';
import ManagerBulkMessageModal from '@/app/manager/manager_components/ManagerFeedback/ManagerBulkMessageModal/ManagerBulkMessageModal';
import type { MessageType } from '@/app/manager/manager_components/ManagerFeedback/ManagerMessageModal';
import { CommFormSchema, type CommFormValues } from '@/app/manager/communications/communications_utils/ManagerCommunicationsSharedConstants';
import { COMM_MESSAGE_TEMPLATES } from '@/app/manager/communications/communications_fixtures/ManagerCommunicationsMockData';
import type { CommSegment } from '@/app/manager/communications/communications_types/ManagerCommunications_types';

const WA_GREEN = '#25D366';

export default function ManagerCommunicationsComposer() {
  const { selectedChannel, setSelectedChannel, selectedSegment, templateDefaults, handleSegmentChange, segmentRecipients, loadingRecipients, handleSend, sending } = useManagerCommunicationsLogic();
  const [showPreview, setShowPreview] = useState(false);
  const form = useForm<CommFormValues>({ resolver: zodResolver(CommFormSchema), defaultValues: { title: '', channel: selectedChannel, segment: selectedSegment, message: templateDefaults.message, subject: templateDefaults.subject } });
  const watchedChannel = form.watch('channel');
  const watchedMessage = form.watch('message');
  const isDirty = form.formState.isDirty && !sending;
  useManagerUnsavedChangesGuard(isDirty);

  useEffect(() => {
    form.setValue('channel', selectedChannel);
    form.setValue('segment', selectedSegment);
  }, [selectedChannel, selectedSegment, form]);

  const applyTemplate = (segment: CommSegment) => {
    const tpl = COMM_MESSAGE_TEMPLATES[segment];
    form.setValue('segment', segment, { shouldDirty: true });
    form.setValue('title', tpl.subject, { shouldDirty: true });
    form.setValue('subject', tpl.subject, { shouldDirty: true });
    form.setValue('message', tpl.message, { shouldDirty: true });
    handleSegmentChange(segment);
  };

  const submit = form.handleSubmit((values) => handleSend(values));
  const bulkRecipients = segmentRecipients.map((r) => ({ name: r.name, phone: r.phone, email: r.email }));

  return <div className="bg-card border border-border rounded-xl p-6 space-y-6">
    <ManagerCommunicationsSegmentPicker />
    <div className="space-y-2"><label className="block text-sm font-semibold text-secondary uppercase tracking-wider">2. Choose Channel</label><div className="flex gap-3"><button type="button" onClick={() => { setSelectedChannel('whatsapp'); form.setValue('channel', 'whatsapp', { shouldDirty: true }); }} className="flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold" style={watchedChannel === 'whatsapp' ? { background: WA_GREEN } : undefined}><MessageCircle size={16} />WhatsApp</button><button type="button" onClick={() => { setSelectedChannel('email'); form.setValue('channel', 'email', { shouldDirty: true }); }} className="flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold bg-input border-border text-secondary"><Mail size={16} />Email</button></div></div>
    <div className="space-y-4"><label className="block text-sm font-semibold text-secondary uppercase tracking-wider">3. Compose Message</label>
      <div className="bg-input border border-border rounded-lg p-3"><label className="block text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5"><Zap size={14} className="text-warning" />Quick Templates</label><div className="flex flex-wrap gap-2">{(Object.keys(COMM_MESSAGE_TEMPLATES) as CommSegment[]).map((segment) => <button key={segment} type="button" onClick={() => applyTemplate(segment)} className="px-3 py-1.5 text-xs font-medium bg-card border border-border rounded-md">{COMM_MESSAGE_TEMPLATES[segment].subject}</button>)}</div></div>
      <div><label htmlFor="manager-communications-title" className="block text-xs font-medium text-secondary mb-1">Campaign Title *</label><input id="manager-communications-title" {...form.register('title')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground" />{form.formState.errors.title && <p className="text-xs text-danger mt-1">{form.formState.errors.title.message}</p>}</div>
      {watchedChannel === 'email' && <div><label htmlFor="manager-communications-subject" className="block text-xs font-medium text-secondary mb-1">Email Subject *</label><input id="manager-communications-subject" {...form.register('subject')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground" /></div>}
      <div><label htmlFor="manager-communications-message" className="block text-xs font-medium text-secondary mb-1">Message Body *</label><textarea id="manager-communications-message" rows={6} {...form.register('message')} className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground resize-none" /><p className="text-xs text-secondary mt-1">{watchedMessage.length} characters</p></div>
    </div>
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border"><div className="flex items-center gap-2 text-sm text-secondary">{loadingRecipients ? <Loader2 size={15} className="animate-spin" /> : <Users size={15} />}{loadingRecipients ? 'Loading recipients...' : `${segmentRecipients.length} recipient${segmentRecipients.length === 1 ? '' : 's'}`}</div><div className="flex gap-3">{segmentRecipients.length > 0 && <button type="button" onClick={() => setShowPreview(true)} className="flex items-center gap-2 px-4 py-2 bg-input border border-border rounded-lg text-sm font-medium"><Eye size={15} />Preview & Send</button>}<button type="button" onClick={submit} disabled={sending || loadingRecipients || segmentRecipients.length === 0} className="flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold disabled:opacity-50">{sending ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}{sending ? 'Sending...' : 'Send Campaign'}</button></div></div>
    {showPreview && <ManagerBulkMessageModal open={showPreview} onClose={() => setShowPreview(false)} recipients={bulkRecipients} type={watchedChannel as MessageType} defaultMessage={watchedMessage} onSuccess={() => setShowPreview(false)} />}
  </div>;
}
