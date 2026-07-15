export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

export interface AuthLoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
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
  success: boolean;
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

export interface AuthRefreshResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface AuthLogoutResponse {
  success: boolean;
  message: string;
}
