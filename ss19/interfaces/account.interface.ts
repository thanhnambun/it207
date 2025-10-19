import { AccountGender, AccountStatus } from "@/enums/account.enum";

export interface RoleResponse {
  id: number;
  roleName: string;
  roleCode: string;
}

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateBirth: string | null;
  gender: AccountGender;
  address: string | null;
  status: AccountStatus;
  avatar: string | null;
  createdAt?: string;
  updatedAt?: string;
  role?: RoleResponse;
}

export interface UserRequest {
  fullName: string;
  email: string;
  phoneNumber: string;
  dateBirth: string;
  gender: AccountGender;
  address: string;
  avatar: string | null;
}