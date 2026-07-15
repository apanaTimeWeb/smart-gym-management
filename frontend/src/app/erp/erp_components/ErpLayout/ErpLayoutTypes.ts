// RESPONSIBILITY: Defines all TypeScript prop interfaces for ERP layout shell components (Header, Sidebar). Single source of truth for layout prop contracts.

export interface ErpSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
}

export interface ErpHeaderProps {
  title: string;
  subtitle?: string;
}
