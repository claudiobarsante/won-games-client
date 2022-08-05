import { GetServerSidePropsContext } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';

async function protectedRoutes(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    context.res.setHeader(
      'Location',
      `/sign-in?callbackUrl=${context.resolvedUrl}`
    );
    context.res.statusCode = 302;
  }

  return session;
}

export default protectedRoutes;
