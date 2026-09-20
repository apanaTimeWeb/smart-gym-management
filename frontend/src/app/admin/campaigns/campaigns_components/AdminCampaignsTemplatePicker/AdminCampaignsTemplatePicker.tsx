'use client';
import type { AdminCampaignsTemplate } from '@/app/admin/campaigns/campaigns_types/AdminCampaignsTypes';
import { Calendar, AlertCircle, RefreshCw, MessageSquare } from 'lucide-react';

interface Props {
  templates: AdminCampaignsTemplate[];
  selectedTemplateId: string;
  onSelect: (id: string) => void;
}

const TEMPLATE_ICONS: Record<string, React.ReactNode> = {
  FEE_REMINDER: <Calendar size={18} />,
  OVERDUE: <AlertCircle size={18} />,
  RENEWAL: <RefreshCw size={18} />,
  CUSTOM: <MessageSquare size={18} />
};

export default function AdminCampaignsTemplatePicker({ templates, selectedTemplateId, onSelect }: Props) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="text-sm font-semibold text-primary mb-4">2. Choose Message Template</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {templates.map((tpl) => {
          const isSelected = selectedTemplateId === tpl.id;
          return (
            <button
              key={tpl.id}
              type="button"
              onClick={() => onSelect(tpl.id)}
              className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-colors ${
                isSelected 
                  ? 'border-primary bg-primary text-on-primary' 
                  : 'border-border bg-input text-primary hover:border-primary'
              }`}
            >
              <div className="shrink-0">
                {TEMPLATE_ICONS[tpl.type]}
              </div>
              <span className="text-sm font-medium">
                {tpl.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
