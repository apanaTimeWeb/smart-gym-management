// RESPONSIBILITY: TypeORM persistence entity for white-labeling feature data stored in `white_label_domains`.
// FLOW: white-labeling repository -> WhiteLabelDomain entity -> PostgreSQL `white_label_domains`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/core/database/base.entity';

export enum WhiteLabelDomainStatus {
  Pending = 'pending',
  Active = 'active',
  Failed = 'failed',
}

export enum WhiteLabelDomainSslStatus {
  Pending = 'pending',
  Issued = 'issued',
  Failed = 'failed',
}

@Entity('superadmin_white_label_domains')
@Index('IDX_white_label_domains_updated_at', ['updatedAt'])
export class WhiteLabelingEntity extends BaseEntity {
  @Column({ name: 'gym_id', type: 'varchar', length: 500 })
  gymId!: string;
  @Column({ name: 'gym_name', type: 'varchar', length: 500 })
  gymName!: string;
  @Index('IDX_white_label_domains_domain')
  @Column({ name: 'domain', type: 'varchar', length: 500 })
  domain!: string;
  @Column({ name: 'status', type: 'enum', enum: WhiteLabelDomainStatus })
  status!: WhiteLabelDomainStatus;
  @Column({ name: 'ssl_status', type: 'enum', enum: WhiteLabelDomainSslStatus })
  sslStatus!: WhiteLabelDomainSslStatus;
  @Column({ name: 'logo_url', type: 'varchar', length: 500, nullable: true })
  logoUrl!: string | null;
  @Column({ name: 'primary_color', type: 'varchar', length: 500, nullable: true })
  primaryColor!: string | null;
}