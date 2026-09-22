// RESPONSIBILITY: Read use-case for GET /api/v1/manager/library/exercises.
// FLOW: Controller -> LibraryFetchExercisesService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { LibraryRepository } from '@/modules/manager/library/repositories/library-repository';

@Injectable()
export class LibraryFetchExercisesService {
  constructor(private readonly repository: LibraryRepository) {}

  /** @description Loads the library collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchExercises(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findLibraryList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { exercises: rows, total: result.meta.total }, meta: result.meta };
  }
}
