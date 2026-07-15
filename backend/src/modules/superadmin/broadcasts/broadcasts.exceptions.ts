export class BroadcastNotFoundException extends Error {
  constructor(message = 'Broadcast not found') {
    super(message);
    this.name = 'BroadcastNotFoundException';
  }
}
