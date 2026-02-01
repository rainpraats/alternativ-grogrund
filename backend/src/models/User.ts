import { UserRole } from './UserRole';
import { Address } from './Address';

export interface User {
  firstName: string;
  lastName: string;
  role: UserRole;
  password: string;
  email: string;
  phone: string;
  address: Address;
  personnummer: string;
}
