// RESPONSIBILITY: Maps Landing contact submissions to the tenant PostgreSQL table without exposing TypeORM to services.
// FLOW: LandingContactRepository â†’ TypeORM entity â†’ PostgreSQL landing_contacts.
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { LandingBaseEntity } from '@/backend_landing/landing_core/landing_database/landing-base.entity';


/**
 * Intent: Defines the LandingContactEntity class boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs and infrastructure failures are handled by the owning boundary.
 * Side Effects: None beyond the behavior implemented by this class.
 * AI Notes: Preserve the class responsibility and dependency direction documented by the module.
 */
@Entity('landing_contacts')
@Index('IDX_landing_contacts_created_at', ['createdAt'])
/**
 * Intent: Defines the landing contact entity boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingContactEntity extends LandingBaseEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_landing_contacts', comment: 'Immutable UUID identity for one Landing contact message.' })
  declare id: string;

  @Column({ length: 100, comment: 'Visitor name submitted through the public contact form.' })
  name!: string;

  @Column({ length: 320, comment: 'Normalized lowercase contact email for follow-up.' })
  email!: string;

  @Column({ type: 'text', comment: 'Sanitized visitor message; HTML/script tags are removed before persistence.' })
  message!: string;
}
