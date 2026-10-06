export interface ManagerGrievanceResolutionInput {
  resolveTicket: (ticketId: string, resolutionNote: string) => Promise<boolean>;
  isResolving: boolean;
}
