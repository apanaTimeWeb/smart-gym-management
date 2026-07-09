import { Gender, BillingCycle } from "../utils/members.enums";
export declare class CreateMemberDto {
    name: string;
    email: string;
    phone: string;
    gender: Gender;
    address?: string;
    branch: string;
    planId: string;
    billingCycle: BillingCycle;
    joinDate?: string;
}
