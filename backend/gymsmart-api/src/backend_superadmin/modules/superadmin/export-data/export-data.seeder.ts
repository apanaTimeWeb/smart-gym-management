// RESPONSIBILITY: Provides the deterministic seed hook for the export-data infrastructure module; no fixture rows are required.
// FLOW: Master seed orchestration -> ExportDataSeeder -> no persistent fixture state.
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExportDataSeeder {
  /** Confirms that export-data has no environment-specific seed rows to create. */
  async seed(): Promise<void> { return Promise.resolve(); }
}