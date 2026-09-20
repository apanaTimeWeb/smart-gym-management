'use client';
// RESPONSIBILITY: Reusable empty state component for tables and lists across the manager module.
import type { ManagerEmptyStateProps } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerEmptyStateTypes';



export default function ManagerEmptyState({ icon, title, subtitle }: ManagerEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500">
      <div className="w-20 h-20 bg-primary-subtle rounded-full flex items-center justify-center mb-5 text-primary/40 shadow-card border border-primary/10">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-primary tracking-tight mb-2">{title}</h3>
      <p className="text-sm text-secondary max-w-sm leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}
