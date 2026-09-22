// RESPONSIBILITY: Maps master-database authentication security events such as login failures and lockouts.
// FLOW: Auth service → core auth audit repository → core_auth_audit_logs.

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'; @Entity('core_auth_audit_logs') export class CoreAuthAuditLogEntity { @PrimaryGeneratedColumn('uuid') id!:string; @Column({name:'user_id',type:'uuid',nullable:true}) userId!:string|null; @Column({type:'varchar',length:64}) action!:string; @Column({type:'varchar',length:64,nullable:true}) identifierHash!:string|null; @Column({name:'created_at',type:'timestamptz',default:()=> 'now()'}) createdAt!:Date; }
