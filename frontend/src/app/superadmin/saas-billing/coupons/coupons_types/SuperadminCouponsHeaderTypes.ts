// RESPONSIBILITY: Props for the Superadmin coupons page header view.
export interface SuperadminCouponsHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onCreateClick: () => void;
  statusFilter?: string;
  onStatusFilterChange?: (value: string) => void;
}
