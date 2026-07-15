import { Member } from '@/modules/erp/members/entities/member.entity';

export interface MemberResponse {
  success: boolean;
  message: string;
  data: Member | Member[] | any;
}

export interface MemberStats {
  total: number;
  active: number;
  pending: number;
  expired: number;
}
