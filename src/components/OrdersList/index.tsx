import Empty from '../Empty';
import GameItem, { GameItemProps, PaymentInfoProps } from 'components/GameItem';
import Heading from '../Heading';
import * as S from './styles';

type OrderProps = {
  id: string;
  paymentInfo: PaymentInfoProps;
  games: GameItemProps[];
};

export type OrdersListProps = {
  items?: OrderProps[];
};

const OrdersList = ({ items = [] }: OrdersListProps) => (
  <S.Wrapper>
    <Heading lineBottom lineColor="primary" color="black" size="small">
      My orders
    </Heading>

    {items.length > 0 ? (
      items.map((order) => {
        return order.games.map((game) => (
          <GameItem key={order.id} {...game} paymentInfo={order.paymentInfo} />
        ));
      })
    ) : (
      <Empty
        title="You have no orders yet"
        description="Go back to the store and explore great games and offers"
        hasLink
      />
    )}
  </S.Wrapper>
);

export default OrdersList;
