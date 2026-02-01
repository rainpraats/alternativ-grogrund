import type { Address } from './Address';
import type { UserRole } from './UserRole';

export interface Credentials {
  firstName: string;
  lastName: string;
  role: UserRole;
  password: string;
  email: string;
  phone: string;
  address: Address;
  personnummer: string;
}
