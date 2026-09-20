// RESPONSIBILITY: Renders AdminCampaignsTemplatePicker for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas.
'use client';
import { AlertCircle, Calendar, MessageSquare, RefreshCw } from 'lucide-react';
import type { AdminCampaignsTemplatePickerProps, AdminCampaignsTemplateType } from '@/app/admin/campaigns/campaigns_types/AdminCampaignsTypes';

function renderAdminCampaignsTemplateIcon(type: AdminCampaignsTemplateType) {
  const Icon = type === 'FEE_REMINDER' ? Calendar : type === 'OVERDUE' ? AlertCircle : type === 'RENEWAL' ? RefreshCw : MessageSquare;
  return <Icon size={18} strokeWidth={2} aria-hidden="true" />;
}

export default function AdminCampaignsTemplatePicker({ templates, selectedTemplateId, onSelect }: AdminCampaignsTemplatePickerProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-5" aria-labelledby="campaign-template-heading">
      <h2 id="campaign-template-heading" className="mb-4 text-sm font-semibold text-primary">2. Choose Message Template</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {templates.map((template) => {
          const isSelected = selectedTemplateId === template.id;
          return (
            <button
              key={template.id}
              type="button"
              onClick={() => onSelect(template.id)}
              aria-pressed={isSelected}
              className={`flex items-center gap-3 rounded-xl border p-4 text-left motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isSelected ? 'border-primary bg-primary text-on-primary' : 'border-border bg-input text-primary hover:border-primary'}`}
            >
              <span className="shrink-0">{renderAdminCampaignsTemplateIcon(template.type)}</span>
              <span className="text-sm font-medium">{template.title}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
