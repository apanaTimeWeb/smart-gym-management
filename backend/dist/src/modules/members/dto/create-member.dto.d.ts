import { Gender, BillingCycle } from "../utils/database.enums";
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
