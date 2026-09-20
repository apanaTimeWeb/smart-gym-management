// RESPONSIBILITY: Prop contract for the searchable Superadmin tenant message table.
import type { MessageChannel, TenantMessage } from '@/app/superadmin/messaging/messaging_types/SuperadminMessagingTypes';

export interface SuperadminMessagingMessagesTabProps {
  search: string;
  setSearch: (value: string) => void;
  channelFilter: MessageChannel | 'ALL';
  setChannelFilter: (value: MessageChannel | 'ALL') => void;
  setRange: (start: string, end: string) => void;
  messages: TenantMessage[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  isFetching: boolean;
}
