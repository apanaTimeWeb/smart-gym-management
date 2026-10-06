// RESPONSIBILITY: Prop contract for the searchable Superadmin tenant message table.
import { SUPERADMIN_MESSAGING_ALL_FILTER } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_constants/SuperadminMessagingConstants';

import type { MessageChannel, TenantMessage } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingTypes';



export interface SuperadminMessagingMessagesTabProps {
  search: string;
  setSearch: (value: string) => void;
  channelFilter: MessageChannel | typeof SUPERADMIN_MESSAGING_ALL_FILTER;
  setChannelFilter: (value: MessageChannel | typeof SUPERADMIN_MESSAGING_ALL_FILTER) => void;
  setRange: (start: string, end: string) => void;
  messages: TenantMessage[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  isFetching: boolean;
}
