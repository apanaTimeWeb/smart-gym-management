export class ReleaseNoteNotFoundException extends Error {
  constructor(message = 'ReleaseNote not found') {
    super(message);
    this.name = 'ReleaseNoteNotFoundException';
  }
}
