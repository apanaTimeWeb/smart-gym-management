import { Module } from '@nestjs/common';

@Module({
  imports: [
    // TODO: Consolidate Database (TypeORM), Config, and Cache modules globally here
    // before importing the individual domain root modules.
  ],
})
export class AppModule {}
