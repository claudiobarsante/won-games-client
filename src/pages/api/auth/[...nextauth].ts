import NextAuth, { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import type { NextApiRequest, NextApiResponse } from 'next';

// type AuthorizeProps = {
//   email: string;
//   password: string;
// };

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

      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
          {
            method: 'POST',
            body: new URLSearchParams({
              identifier: credentials?.email as string,
              password: credentials?.password as string
            })
            // headers: { 'Content-Type': 'application/json' }
          }
        );
        const data = await res.json();

        // Return null if user data could not be retrieved
        if (!data.user) return null;

        // Any object returned will be saved in `user` property of the JWT
        const user = {
          id: data.user.id.toString(),
          username: data.user.username,
          email: data.user.email,
          jwt: data.jwt
        };

        return user;
      }
    })
  ],
  session: {
    // Note: `strategy` should be set to 'jwt' if no database is used.
    strategy: 'jwt'
  },
  jwt: {
    // The secret should be set to a reasonably long random string.
    // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
    // a separate secret is defined explicitly for encrypting the JWT.
    secret: process.env.SECRET
  },
  callbacks: {
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.id = token.id;
      session.email = token.email;
      session.name = token.name;
      session.jwt = token.jwt;

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        //add any info to the token, so you can retrieve in the session calbakc and pass to the session
        token.id = user.id;
        token.email = user.email;
        token.name = user.username as string;
        token.jwt = user.jwt;
      }

      return token;
    }
  }
};

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default Auth;
