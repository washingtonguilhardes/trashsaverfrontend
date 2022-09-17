import { User } from '@src/types/user.type';
import { JWT } from 'next-auth/jwt';
import { Session, User as NextAuthUser } from 'next-auth';
import * as yup from 'yup';

declare module 'yup' {
  interface StringSchema<TType, TContext, TDefault, TFlags> {
    html(appendStr: string): this;
    linkUrl(appendStr: string): this;
  }
}

declare global {
  type OptionValue = { label: string; value: string };
}

declare module 'next-auth/jwt' {
  interface JWT {
    idToken?: string;
    accessToken?: string;
    appUser: User;
  }
}
declare module 'next-auth' {
  interface Session {
    userId: User['id'];
    userRoles: User['roles'];
  }
}
