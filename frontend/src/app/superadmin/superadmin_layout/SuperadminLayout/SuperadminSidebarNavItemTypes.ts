// RESPONSIBILITY: Type contract extracted from SuperadminSidebarNavItem.tsx; no business behavior.
import type { LucideIcon } from 'lucide-react';

export interface SuperadminSidebarNavItemProps {
    name: string;
    href: string;
    icon: LucideIcon;
    isActive: boolean;
    isCollapsed: boolean;
}
