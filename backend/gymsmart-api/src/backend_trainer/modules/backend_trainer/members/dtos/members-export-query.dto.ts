// RESPONSIBILITY: Validates member export format at the HTTP query boundary.
// FLOW: HTTP query → MembersExportQueryDto → export service.

import { IsIn } from 'class-validator';

export class MembersExportQueryDto {
  @IsIn(['csv']) format: 'csv' = 'csv';
}
