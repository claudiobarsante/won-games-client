import NextAuth, { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import type { NextApiRequest, NextApiResponse } from 'next';

type AuthorizeProps = {
  email: string;
  password: string;
};

const options: NextAuthOptions = {
  pages: {
    signIn: '/sign-in'
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  providers: [
    CredentialsProvider({
      name: 'Sign-in',

      credentials: {},
      async authorize({ email, password }: AuthorizeProps) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
          {
            method: 'POST',
            body: new URLSearchParams({ identifier: email, password })
            // headers: { 'Content-Type': 'application/json' }
          }
        );
        const data = await res.json();

        // If no error and we have user data, return it
        if (data.user) {
          return { ...data.user, jwt: data.jwt };
        }
        // Return null if user data could not be retrieved
        return null;
      }
    })
  ],
  callbacks: {
    session: async (session: Session, user: User) => {
      session.jwt = user.jwt;
      session.id = user.id;

      return Promise.resolve(session);
    },
    jwt: async (token: JWT, user: User) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.username as string;
        token.jwt = user.jwt;
      }

      return Promise.resolve(token);
    }
  }
};

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default Auth;
