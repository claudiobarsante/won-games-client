import * as S from './styles';
import {
  AddShoppingCart,
  FavoriteBorder,
  Favorite
} from '@styled-icons/material-outlined';
import Button from 'components/Button';
import Ribbon, { RibbonColors, RibbonSizes } from 'components/Ribbon';
import Link from 'next/link';
import formatPrice from 'utils/format-price';

export type GameCardProps = {
  slug: string;
  title: string;
  developer: string;
  img: string;
  price: number;
  promotionalPrice?: number;
  favorite?: boolean;
  ribbon?: React.ReactNode;
  ribbonColor?: RibbonColors;
  ribbonSize?: RibbonSizes;
  onFav?: () => void;
};

const GameCard = ({
  slug,
  title,
  developer,
  img,
  price,
  promotionalPrice,
  favorite = false,
  ribbon,
  ribbonColor = 'primary',
  ribbonSize = 'small',
  onFav
}: GameCardProps) => {
  return (
    <S.Container>
      {!!ribbon && (
        <Ribbon color={ribbonColor} size={ribbonSize}>
          {ribbon}
        </Ribbon>
      )}
      <Link href={`game/${slug}`} passHref>
        <S.ImageBox>
          <img src={img} alt={title} />
        </S.ImageBox>
      </Link>
      <S.Content>
        <Link href={`game/${slug}`} passHref>
          <S.GameInfo>
            <S.GameName>{title}</S.GameName>
            <S.GameDeveloper>{developer}</S.GameDeveloper>
          </S.GameInfo>
        </Link>
        <S.FavButton onClick={onFav} role="button">
          {favorite ? (
            <Favorite aria-label="Remove from Wishlist" />
          ) : (
            <FavoriteBorder aria-label="Add to Wishlist" />
          )}
        </S.FavButton>
        <S.BuyBox>
          {!!promotionalPrice && (
            <S.Price isPromotional>{formatPrice(price)}</S.Price>
          )}
          <S.Price>{formatPrice(promotionalPrice || price)}</S.Price>
          <Button icon={<AddShoppingCart />} size="small" />
        </S.BuyBox>
      </S.Content>
    </S.Container>
  );
};

export default GameCard;
