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

      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, req) {
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
        //console.log('data', data);

        // If no error and we have user data, return it
        // if (data.user) {
        //   console.log('passei aqui');
        //   return { ...data.user, jwt: data.jwt };
        // }
        if (data.user) return data;
        // Return null if user data could not be retrieved
        return null;
      }
    })
  ],
  callbacks: {
    // session: async (session: Session, user: User) => {
    //   console.log('userjwtinsession', user);
    //   session.jwt = user.jwt;
    //   session.id = user.id;

    //   return Promise.resolve(session);
    // },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      //session.jwt = user.jwt;
      //session.id = user.id;

      //console.log('session', session, 'token', token, 'user', user);
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log('--token', token);

      // if (user) {
      //   //console.log('--user dentro do if', user.id, user?.email);
      //   const userData = { ...user };
      //   console.log('userData', userData);

      //   // token.id = userData.
      //   token.email = userData.email;
      //   // token.name = userData.username as string;
      //   // token.jwt = userData.jwt;

      //   console.log('new token', token);
      // }

      return token;
    }
    // jwt: async (token: JWT, user: User) => {
    //   console.log('userjwt', user);
    //   if (user) {
    //     token.id = user.id;
    //     token.email = user.email;
    //     token.name = user.username as string;
    //     token.jwt = user.jwt;
    //   }

    //   return Promise.resolve(token);
    // }
  }
};

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default Auth;
