// RESPONSIBILITY: Defines stable integrations enums and contract-state constants.
// FLOW: Integrations DTO/service -> enum/constants -> repository persistence/query behavior.
export enum IntegrationKeyScope {
  READ = 'Read',
  WRITE = 'Write',
}

export const INTEGRATIONS_SNAPSHOT_KINDS = Object.freeze({ MAIN: 'main' } as const);
