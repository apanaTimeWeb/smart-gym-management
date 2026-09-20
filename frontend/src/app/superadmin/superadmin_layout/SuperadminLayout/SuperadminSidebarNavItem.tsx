// RESPONSIBILITY: Renders a single navigation item link in the SuperadminSidebar.
'use client';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import type { SuperadminSidebarNavItemProps } from '@/app/superadmin/superadmin_layout/SuperadminLayout/SuperadminSidebarNavItemTypes';

export default function SuperadminSidebarNavItem({ name, href, icon: Icon, isActive, isCollapsed }: SuperadminSidebarNavItemProps) {
    return (<Link href={href} title={isCollapsed ? name : undefined} aria-current={isActive ? 'page' : undefined} className={`
        group relative flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page
        ${isActive
            ? 'bg-primary-subtle text-primary border-l-2 border-primary pl-2.5'
            : 'text-secondary hover:bg-card hover:text-primary border-l-2 border-transparent pl-2.5'}
        ${isCollapsed ? 'justify-center pl-0' : ''}
      `}>
      <Icon size={18} className={`shrink-0 ${isActive ? 'text-primary' : 'text-secondary group-hover:text-primary'}`} strokeWidth={2} aria-hidden="true"/>
      {!isCollapsed && (<span className="font-medium text-sm leading-none">{name}</span>)}
    </Link>);
}
