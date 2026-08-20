// RESPONSIBILITY: Defines all TypeScript prop interfaces for TRAINER layout shell components (Header, Sidebar). Single source of truth for layout prop contracts.

export interface TrainerSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
}

export interface TrainerHeaderProps {
  title: string;
  subtitle?: string;
}
