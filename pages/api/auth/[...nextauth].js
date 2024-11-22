import NextAuth from 'next-auth';
import { Providers } from "next-auth";


export default NextAuth({
  providers: [
    Providers.Quire({
      clientId: process.env.QUIRE_CLIENT_ID,
      clientSecret: process.env.QUIRE_CLIENT_SECRET,
      authorizationUrl: 'https://quire.io/oauth',
      tokenUrl: 'https://quire.io/oauth/token',
      userinfoUrl: 'https://quire.io/api/user/id/me',
    }),
  ],
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session(session, token) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin', // Custom sign-in page if needed
    // Add other custom pages as necessary
  },
});