// RESPONSIBILITY: Provides the shared Superadmin gym lookup used by frontend tenant selectors.
// FLOW: Query controller -> SuperadminGymsLookupService -> SuperadminGymsRepository -> PostgreSQL tenants.
import { Injectable } from '@nestjs/common';
import { SuperadminGymsRepository } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.repository';
export interface SuperadminGymsLookupItem { id: string; name: string; }
@Injectable()
export class SuperadminGymsLookupService {
  constructor(private readonly repository: SuperadminGymsRepository) {}
  /** Returns active gym identifiers and names for shared lookup controls. */
  async findGymsLookup(): Promise<SuperadminGymsLookupItem[]> {
    const result = await this.repository.findPage({ page: 1, limit: 100, search: undefined, status: undefined, sortBy: 'name' as never, sortOrder: 'ASC' });
    return result.items.map((item) => ({ id: item.id, name: item.name }));
  }
}