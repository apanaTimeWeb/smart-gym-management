// RESPONSIBILITY: Defines application-layer inputs for contact persistence without coupling repositories to HTTP DTO classes.
// FLOW: DTO → orchestrator/service input → repository.
export interface LandingCreateContactInput {
  name: string;
  email: string;
  message: string;
}
