import { User } from './user.type';

export interface Address {
  way: string;
  neighborhood: string;
  name: string;
  province: string;
  city: string;
  country: string;
  user: User;
  id: string;
}
