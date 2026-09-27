// RESPONSIBILITY: Owns runtime registration and lookup of feature-scoped resource authorization providers.
// FLOW: Feature module registration -> route feature key -> provider lookup -> resource authorization.
import { Injectable } from '@nestjs/common';

import type { ManagerCoreResourceAuthorizationPort } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-resource-authorization.types';

@Injectable()
export class ManagerCoreResourceAuthorizationRegistry {
  private readonly providers = new Map<string, ManagerCoreResourceAuthorizationPort>();

  /** @description Registers the resource authorization provider owned by a feature. @param feature - Canonical feature folder name. @param provider - Feature resource authorization implementation. @returns Nothing. */
  register(feature: string, provider: ManagerCoreResourceAuthorizationPort): void { this.providers.set(feature, provider); }

  /** @description Resolves a feature resource authorizer when one is registered. @param feature - Canonical feature name. @returns Provider or undefined. */
  get(feature: string): ManagerCoreResourceAuthorizationPort | undefined { return this.providers.get(feature); }
}
