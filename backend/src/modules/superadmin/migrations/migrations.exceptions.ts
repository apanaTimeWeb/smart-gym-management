export class SchemaMigrationNotFoundException extends Error {
  constructor(message = 'SchemaMigration not found') {
    super(message);
    this.name = 'SchemaMigrationNotFoundException';
  }
}
