// RESPONSIBILITY: Defines the standard TypeORM base entity abstraction for tenant tables.
// FLOW: Feature entity â†’ AdminCoreBaseEntity â†’ PostgreSQL table with UUID/timestamps/soft-delete state.
import { Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * @description Defines the AdminCoreBaseEntity boundary for the admin_core_database backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export abstract class AdminCoreBaseEntity {
  /** UUID primary key is declared by each concrete entity so its constraint name is table-specific. */
  id!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt!: Date | null;

  /** Projection/read-model freshness marker. Updated whenever the feature-owned row is refreshed. */
  @Column({ name: 'read_model_updated_at', type: 'timestamptz', nullable: true })
  readModelUpdatedAt!: Date | null;
}
