import FormProfile, { FormProfileProps } from 'components/FormProfile';
import { QueryProfileMe } from 'graphql/generated/QueryProfileMe';
import { QUERY_PROFILE_ME } from 'graphql/queries/profile';
import { GetServerSidePropsContext } from 'next';
import Profile from 'templates/Profile';
import { initializeApollo } from 'utils/apollo';
import protectedRoutes from 'utils/protected-routes';
import unstable_getServerSession from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { getSession } from 'next-auth/react';

export default function Me(props: FormProfileProps) {
  return (
    <Profile>
      <FormProfile {...props} />
    </Profile>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context);
  // const session = await unstable_getServerSession(
  //   context.req,
  //   context.res,
  //   authOptions
  // );
  //const session = await getSession(context);
  console.log('session', session);
  const apolloClient = initializeApollo(null, session);

  const { data } = await apolloClient.query<QueryProfileMe>({
    query: QUERY_PROFILE_ME
  });
  return {
    props: {
      session,
      username: data.me?.username,
      email: data.me?.email
    }
  };
}
