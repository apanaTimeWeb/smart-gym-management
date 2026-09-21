// RESPONSIBILITY: Maps Landing contact submissions to the tenant PostgreSQL table without exposing TypeORM to services.
// FLOW: LandingContactRepository â†’ TypeORM entity â†’ PostgreSQL landing_contacts.
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { CoreBaseEntity } from '@/backend_landing/core/database/base.entity';


@Entity('landing_contacts')
@Index('IDX_landing_contacts_created_at', ['createdAt'])
export class LandingContactEntity extends CoreBaseEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_landing_contacts' })
  declare id: string;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 320 })
  email!: string;

  @Column({ type: 'text' })
  message!: string;
}
