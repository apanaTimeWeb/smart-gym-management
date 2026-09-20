// RESPONSIBILITY: Type contracts for member-directed messaging owned by the Members feature.
export const MEMBER_MESSAGE_TYPES = ['whatsapp', 'email'] as const;
export type MemberMessageType = (typeof MEMBER_MESSAGE_TYPES)[number];

export interface TrainerMemberMessageRecipient {
  name: string;
  phone?: string;
  email?: string;
}
