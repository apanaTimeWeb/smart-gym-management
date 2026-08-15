import { InfrastructureStatus, InfrastructureType } from './entities/infrastructure.entity';

export interface IInfrastructureNode {
  id: string;
  name: string;
  type: InfrastructureType;
  status: InfrastructureStatus;
  provider: string | null;
  region: string | null;
  hostAddress: string | null;
  cpuPercent: number | null;
  memoryPercent: number | null;
  diskPercent: number | null;
  uptimeSeconds: number | null;
  lastCheckedAt: Date | null;
  metadata: Record<string, unknown> | null;
  createdAt: Date;
}

export interface InfrastructureResponse {
  success: boolean;
  message: string;
  data: IInfrastructureNode | IInfrastructureNode[] | any | null;
}
