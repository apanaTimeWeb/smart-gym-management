// RESPONSIBILITY: Validates library request shape at the edge and contains no business logic.
// FLOW: HTTP body/query → LibraryAssignDietDto → service.

import { IsUUID } from 'class-validator';
export class LibraryAssignDietDto {
    @IsUUID() dietPlanId!:string;
}
