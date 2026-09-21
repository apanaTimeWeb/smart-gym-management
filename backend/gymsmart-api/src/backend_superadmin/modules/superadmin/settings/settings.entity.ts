// RESPONSIBILITY: TypeORM persistence entity for settings feature data stored in `platform_settings`.
// FLOW: settings repository -> PlatformSetting entity -> PostgreSQL `platform_settings`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/core/database/base.entity';

@Entity('platform_settings')
@Index('IDX_platform_settings_updated_at', ['updatedAt'])
export class PlatformSettingEntity extends BaseEntity {
  @Index('IDX_platform_settings_key')
  @Column({ name: 'key', type: 'varchar', length: 500 })
  key!: string;
  @Column({ name: 'value', type: 'varchar', length: 500 })
  value!: string;
  @Column({ name: 'description', type: 'varchar', length: 500 })
  description!: string;
  @Column({ name: 'category', type: 'varchar', length: 500 })
  category!: string;
  @Column({ name: 'data_type', type: 'varchar', length: 500 })
  dataType!: string;
}
