// RESPONSIBILITY: Owns Manager communications delivery job states and selected delivery medium contract.
// FLOW: Send request -> delivery medium -> queued job -> adapter attempt -> retry/DLQ status.

export enum CommunicationsDeliveryMedium {
  WHATSAPP = 'WHATSAPP',
  EMAIL = 'EMAIL',
}

export enum CommunicationsDeliveryJobStatus {
  QUEUED = 'QUEUED',
  PROCESSING = 'PROCESSING',
  SENT = 'SENT',
  FAILED = 'FAILED',
  DEAD_LETTER = 'DEAD_LETTER',
}
