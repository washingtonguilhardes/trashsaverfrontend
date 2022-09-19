import { httpClient } from '@src/datasource/http';
import { User } from '@src/types/user.type';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        const user = await httpClient.setToken(account.id_token).request<User>(client => {
          return client.post('/user', {
            username: token.name,
            useremail: token.email,
          });
        });
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        token.appUser = user;
      }
      return token;
    },
    async session({ token, session }) {
      const user = await httpClient.setToken(token.accessToken).request<User>(client => {
        return client.get(`/user/${token.appUser.id}`);
      });
      return { ...session, userRoles: user.roles, userId: token.appUser.id };
    },
  },
  pages: {
    signIn: '/login',
  },
};

export default NextAuth(authOptions);
