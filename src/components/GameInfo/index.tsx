import { FavoriteBorder } from '@styled-icons/material-outlined';

import Button from 'components/Button';
import CartButton from 'components/CartButton';
import Heading from 'components/Heading';
import Ribbon from 'components/Ribbon';
import WishlistButton from 'components/WishlistButton';
import React from 'react';
import formatPrice from 'utils/format-price';

import * as S from './styles';

export type GameInfoProps = {
  id: string;
  title: string;
  description: string;
  price: number;
};

const GameInfo = ({ id, title, description, price }: GameInfoProps) => {
  const formattedPrice = formatPrice(price);

  return (
    <S.Wrapper>
      <Heading color="black" lineBottom>
        {title}
      </Heading>

      <Ribbon color="secondary">{formattedPrice}</Ribbon>

      <S.Description>{description}</S.Description>

      <S.ButtonsWrapper>
        {/* <Button icon={<AddShoppingCart />} size="large">
          Add to cart
        </Button> */}
        <CartButton id={id} size="large" hasText />
        <WishlistButton id={id} hasText size="large" />
      </S.ButtonsWrapper>
    </S.Wrapper>
  );
};

export default GameInfo;
