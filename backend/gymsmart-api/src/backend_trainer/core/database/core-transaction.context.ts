// RESPONSIBILITY: Encapsulates a tenant TypeORM transaction manager behind the UnitOfWork abstraction.
// FLOW: Orchestrator → CoreTransactionContext → repository-only manager access.

import { EntityManager } from 'typeorm'; export class CoreTransactionContext { constructor(private readonly manager:EntityManager) {} /** Executes a callback against the transaction manager for repository internals. */ run<T>(callback:(manager:EntityManager)=>Promise<T>):Promise<T>{ return callback(this.manager); } }
