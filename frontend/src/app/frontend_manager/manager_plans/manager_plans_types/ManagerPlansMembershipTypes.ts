// RESPONSIBILITY: API types and form shapes for Manager plan membership lifecycle actions.

export interface ManagerPlansMemberOption {
  id: string;
  name: string;
  phone: string;
  status: string;
  planName: string;
  planId: string;
  expiryDate: string;
}

export interface ManagerPlansRenewalCandidate extends ManagerPlansMemberOption {}

export interface ManagerPlansMembershipOverview {
  memberOptions: ManagerPlansMemberOption[];
  renewalCandidates: ManagerPlansRenewalCandidate[];
}

export interface ManagerPlansActivatePayload {
  memberId: string;
  planId: string;
  startDate: string;
}

export interface ManagerPlansRenewPayload {
  memberId: string;
  planId: string;
  newExpiryDate: string;
}

export interface ManagerPlansFreezePayload {
  memberId: string;
  freezeFrom: string;
  freezeUntil: string;
}
