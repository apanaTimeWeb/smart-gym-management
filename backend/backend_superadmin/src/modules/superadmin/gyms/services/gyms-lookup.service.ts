// RESPONSIBILITY: Provides the shared Superadmin gym lookup used by frontend tenant selectors.
// FLOW: Query controller -> GymsLookupService -> GymsRepository -> PostgreSQL tenants.
import { Injectable } from '@nestjs/common';
import { GymsRepository } from '@/modules/superadmin/gyms/gyms.repository';
export interface GymsLookupItem { id: string; name: string; }
@Injectable()
export class GymsLookupService {
  constructor(private readonly repository: GymsRepository) {}
  /** Returns active gym identifiers and names for shared lookup controls. */
  async findGymsLookup(): Promise<GymsLookupItem[]> {
    const result = await this.repository.findPage({ page: 1, limit: 100, search: undefined, status: undefined, sortBy: 'name' as never, sortOrder: 'ASC' });
    return result.items.map((item) => ({ id: item.id, name: item.name }));
  }
}
