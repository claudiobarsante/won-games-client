import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

async function protectedRoutes(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    //redirect 302
    context.res.writeHead(302, {
      Location: `/sign-in?callbackUrl=${context.resolvedUrl}` //to redirect to the page that you were before signin
    });
    context.res.end();
  }

  return session;
}

export default protectedRoutes;
