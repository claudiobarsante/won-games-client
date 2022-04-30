import Profile from 'templates/Profile';
import { GetServerSidePropsContext } from 'next';
import protectedRoutes from 'utils/protected-routes';

import ordersMock from 'components/OrdersList/mock';
import React from 'react';
import OrdersList, { OrdersListProps } from 'components/OrdersList';

export default function Orders({ items }: OrdersListProps) {
  return (
    <Profile>
      <OrdersList items={items} />
    </Profile>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context);
  return {
    props: {
      items: ordersMock,
      session
    }
  };
}
