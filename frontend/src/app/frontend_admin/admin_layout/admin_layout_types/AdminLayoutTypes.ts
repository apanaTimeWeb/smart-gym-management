// RESPONSIBILITY: Canonical zero-business Admin shell prop/type contracts.

export interface AdminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
}

export type AdminDensity = 'comfortable' | 'compact';

export interface AdminDensityContextValue {
  density: AdminDensity;
  setDensity: (density: AdminDensity) => void;
  toggleDensity: () => void;
}

export interface AdminLayoutHeaderProfileProps {
  profileHref: string;
  settingsHref: string;
}

export interface AdminRouteHeaderConfigValue {
  titleKey: string;
  subtitleKey: string;
}

export type AdminUrlQueryValue = string | number | null | undefined;

export interface AdminUrlQueryBinding {
  key: string;
  value: AdminUrlQueryValue;
  defaultValue: AdminUrlQueryValue;
  setValue: (value: AdminUrlQueryValue) => void;
}

export interface AdminLayoutDialogAccessibilityOptions {
  isOpen: boolean;
  onClose: () => void;
  initialFocusRef?: { current: HTMLElement | null };
}

export type AdminIdempotencyIntentRegistry = Map<string, string>;

export type AdminSocketListener = (payload: unknown) => void;

export interface AdminLayoutWebSocketContextValue {
  connected: boolean;
  subscribe: (eventName: string, listener: AdminSocketListener) => () => void;
}

export interface AdminLayoutDensityProviderProps {
  children: import('react').ReactNode;
}

export interface AdminLayoutI18nProviderProps {
  children: import('react').ReactNode;
}

export interface AdminLayoutWebSocketProviderProps {
  children: import('react').ReactNode;
  url?: string;
}

export interface AdminLayoutNotFoundProps {
  title?: string;
  description?: string;
  returnLink?: string;
  returnText?: string;
}

export interface AdminLayoutToastOptions {
  id?: string;
}

export interface AdminRootLayoutProps {
  children: import('react').ReactNode;
}
