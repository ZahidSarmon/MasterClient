export interface ChangePasswordDTO {
  id: number;
  name: string;
  email: string;
  OldPassword: string;
  password: string;
  confirmPassword: string;
}
