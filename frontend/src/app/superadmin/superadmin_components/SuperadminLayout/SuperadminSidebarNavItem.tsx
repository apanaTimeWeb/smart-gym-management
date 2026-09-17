// RESPONSIBILITY: Renders a single navigation item link in the SuperadminSidebar.
'use client';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
interface SuperadminSidebarNavItemProps {
    name: string;
    href: string;
    icon: LucideIcon;
    isActive: boolean;
    isCollapsed: boolean;
}
export default function SuperadminSidebarNavItem({ name, href, icon: Icon, isActive, isCollapsed }: SuperadminSidebarNavItemProps) {
    return (<Link href={href} title={isCollapsed ? name : undefined} aria-current={isActive ? 'page' : undefined} className={`
        relative flex items-center gap-3 rounded-lg px-3 py-2.5 motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1
        ${isActive
            ? 'bg-primary-subtle text-primary border-l-2 border-primary shadow-lg shadow-primary/20 pl-2.5'
            : 'text-secondary hover:bg-card hover:text-foreground border-l-2 border-transparent pl-2.5'}
        ${isCollapsed ? 'justify-center pl-0' : ''}
      `}>
      <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-primary' : 'text-secondary group-hover:text-white'}`} strokeWidth={2}/>
      {!isCollapsed && (<span className="font-medium text-sm leading-none">{name}</span>)}
    </Link>);
}
