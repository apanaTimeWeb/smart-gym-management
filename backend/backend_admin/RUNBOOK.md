# V1 Runbook

1. `cp .env.example .env` and set strong local secrets.
2. `docker compose up -d postgres redis`.
3. `npm install`.
4. `npm run db:master:migrate`.
5. `npm run tenant:provision`.
6. `npm run db:tenant:migrate`.
7. `npm run seed`.
8. `npm run start:dev`.
9. Open Swagger at `http://localhost:3000/api/v1/docs`.
10. Run `npm test` and `pytest -q e2e` after the database/API are live.

Default seeded local Admin credentials are only for development; change them immediately.
