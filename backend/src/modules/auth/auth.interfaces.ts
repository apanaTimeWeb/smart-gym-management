export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

export interface AuthLoginResponse {
  message: string;
  data: {
    accessToken: string;
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      // other fields without password
      [key: string]: any;
    };
  };
}

export interface AuthMeResponse {
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    branch: string;
    isActive: boolean;
    createdAt: Date;
  };
}
