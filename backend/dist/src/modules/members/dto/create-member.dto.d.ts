import { Gender, BillingCycle } from "../../../common/enums/database.enums";
export declare class CreateMemberDto {
    name: string;
    email: string;
    phone: string;
    gender: Gender;
    address?: string;
    branch: string;
    planId: number;
    billingCycle: BillingCycle;
    joinDate?: string;
}
