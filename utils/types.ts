export interface LoginPayload {
  email: string;
  password: string;
}
export interface LoginResponse {
  detail: string;
  token: string;
}
