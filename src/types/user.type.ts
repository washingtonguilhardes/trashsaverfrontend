export enum UserRole {
  COLLECTOR = 'COLLECTOR',
  SHARER = 'SHARER',
}

export interface User {
  username: string;
  useremail: string;
  id: string;
  roles: UserRole[];
}
