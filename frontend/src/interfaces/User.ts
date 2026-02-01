import { type UserRole } from './UserRole';
import { type Address } from './Address';

export interface User {
  firstName: string;
  lastName: string;
  role: UserRole;
  password: string;
  email: string;
  phone: string;
  address: Address;
  personnummer: string;
  memberSince: string;
}
