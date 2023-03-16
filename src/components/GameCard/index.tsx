import * as S from './styles';
import Image from 'next/image';
import Ribbon, { RibbonColors, RibbonSizes } from 'components/Ribbon';
import Link from 'next/link';
import formatPrice from 'utils/format-price';
import React from 'react';
import CartButton from 'components/CartButton';
import WishlistButton from 'components/WishlistButton';

export type GameCardProps = {
  id: string;
  slug: string;
  title: string;
  developer: string;
  img: string;
  price: number;
  promotionalPrice?: number;
  ribbon?: React.ReactNode;
  ribbonColor?: RibbonColors;
  ribbonSize?: RibbonSizes;
};

const GameCard = ({
  id,
  slug,
  title,
  developer,
  img,
  price,
  promotionalPrice,
  ribbon,
  ribbonColor = 'primary',
  ribbonSize = 'small'
}: GameCardProps) => {
  return (
    <S.Container data-cy="game-card">
      {!!ribbon && (
        <Ribbon color={ribbonColor} size={ribbonSize}>
          {ribbon}
        </Ribbon>
      )}
      <Link href={`game/${slug}`} passHref>
        <S.ImageBox>
          <Image src={img} alt={title} layout="fill" objectFit="cover" />
        </S.ImageBox>
      </Link>
      <S.Content>
        <Link href={`game/${slug}`} passHref>
          <S.GameInfo>
            <S.GameName>{title}</S.GameName>
            <S.GameDeveloper>{developer}</S.GameDeveloper>
          </S.GameInfo>
        </Link>
        {/* <S.FavButton onClick={onFav} role="button">
          {favorite ? (
            <Favorite aria-label="Remove from Wishlist" />
          ) : (
            <FavoriteBorder aria-label="Add to Wishlist" />
          )}
        </S.FavButton> */}
        <S.FavButton>
          <WishlistButton id={id} />
        </S.FavButton>
        <S.BuyBox>
          {!!promotionalPrice && (
            <S.Price isPromotional>{formatPrice(price)}</S.Price>
          )}
          <S.Price>{formatPrice(promotionalPrice || price)}</S.Price>
          <CartButton id={id} />
        </S.BuyBox>
      </S.Content>
    </S.Container>
  );
};

export default GameCard;
