import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['src/**/*.entity.ts', 'dist/**/*.entity.js'],
  migrations: ['src/database/migrations/*.ts', 'dist/database/migrations/*.js'],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
