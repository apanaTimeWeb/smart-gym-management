// RESPONSIBILITY: Represents an unauthorized realtime handshake without exposing authentication details.
// FLOW: WebSocket handshake → authorization check → CoreRealtimeAuthorizationException → connection rejection.

  /**
 * Intent: Defines the CoreRealtimeAuthorizationException boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class CoreRealtimeAuthorizationException extends Error {
  constructor() {
    super('SOCKET_NOT_AUTHORIZED');
    this.name = 'CoreRealtimeAuthorizationException';
  }
}
