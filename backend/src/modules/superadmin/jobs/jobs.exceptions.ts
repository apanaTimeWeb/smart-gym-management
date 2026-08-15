export class BackgroundJobNotFoundException extends Error {
  constructor(message = 'BackgroundJob not found') {
    super(message);
    this.name = 'BackgroundJobNotFoundException';
  }
}
