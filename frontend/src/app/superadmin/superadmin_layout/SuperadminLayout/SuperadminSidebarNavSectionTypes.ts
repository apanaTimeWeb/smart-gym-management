// RESPONSIBILITY: Type contract extracted from SuperadminSidebarNavSection.tsx; no business behavior.
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
    name: string;
    href: string;
    icon: LucideIcon;
}

export interface NavGroup {
    group: string;
    items: NavItem[];
}

export interface SuperadminSidebarNavSectionProps {
    navGroups: NavGroup[];
    isCollapsed: boolean;
}
