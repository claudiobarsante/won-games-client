import { Container } from 'components/Container';
import { Divider } from 'components/Divider';
import { GameCardProps } from 'components/GameCard';
import { HighlightProps } from 'components/Highlight';
import PaymentForm from 'components/PaymentForm';
import CartList, { CartListProps } from 'components/CartList';
import Heading from 'components/Heading';
import Showcase from 'components/Showcase';
import Base from 'templates/Base';
// -- Striped
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'; //Acts as a provider

import * as S from './styles';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export type CartProps = {
  recommendedGames: GameCardProps[];
  recommendedHighlight: HighlightProps;
  recommendedTitle: string;
} & CartListProps;

// const stripePromise = loadStripe(
//   `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
// );

const Cart = ({
  recommendedGames,
  recommendedHighlight,
  recommendedTitle = 'You may like these games!'
}: CartProps) => {
  const [stripePromise] = useState(() =>
    loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`)
  );
  const { data: session } = useSession();
  console.log('session na cartpage', session);
  return (
    <Base>
      <Container>
        <Heading lineLeft lineColor="secondary">
          My cart
        </Heading>

        <S.Content>
          <CartList />
          <Elements stripe={stripePromise}>
            <PaymentForm session={session!} />
          </Elements>
        </S.Content>

        <Divider />
      </Container>

      <Showcase
        title={recommendedTitle}
        games={recommendedGames}
        highlight={recommendedHighlight}
      />
    </Base>
  );
};

export default Cart;
