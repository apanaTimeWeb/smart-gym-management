// RESPONSIBILITY: Builds Manager mock API URLs from the centralized application API base configuration.

import { ManagerEnvConfig } from "@/app/manager/manager_infrastructure/ManagerEnvConfig";

/** Builds a normalized URL for a Manager feature mock endpoint. */
export function managerMockApiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${ManagerEnvConfig.apiBaseUrl.replace(/\/$/, "")}${normalizedPath}`;
}
