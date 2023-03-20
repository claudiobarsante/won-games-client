import GameItem from 'components/GameItem';
import Link from 'next/link';
import Button from 'components/Button';
import Empty from 'components/Empty';
import * as S from './styles';
import { useCart } from 'hooks/use-cart';
import React from 'react';
import Loader from 'components/Loader';

export type CartListProps = {
  hasButton?: boolean;
};

const CartList = ({ hasButton = false }: CartListProps) => {
  const { items, total, loading } = useCart();

  if (loading) {
    return (
      <S.Loading>
        <Loader />
      </S.Loading>
    );
  }
  return (
    <S.Wrapper isEmpty={!items.length} data-cy="cart-list">
      {items.length ? (
        <>
          <S.GamesList>
            {items.map((item) => (
              <GameItem key={item.title} {...item} />
            ))}
          </S.GamesList>
          <S.Footer>
            {!hasButton && <span>Total:</span>}
            <S.Total>{total}</S.Total>

            {hasButton && (
              <Link href="/cart">
                <Button as="a">Buy it now</Button>
              </Link>
            )}
          </S.Footer>
        </>
      ) : (
        <Empty
          title="Your cart is empty"
          description="Go back to the store and explore great games and offers."
          hasLink
        />
      )}
    </S.Wrapper>
  );
};

export default CartList;
