// RESPONSIBILITY: Defines named non-ORM response contracts used by Trainer Sessions services.
// FLOW: Repository rows → Sessions service → controller response DTO.

export interface TrainerSessionsMemberOption {
  id: string;
  name: string;
}
