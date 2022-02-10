import { Menu2 as MenuIcon } from '@styled-icons/remix-fill/Menu2';
import { ShoppingCart as ShoppingCartIcon } from '@styled-icons/material-outlined/ShoppingCart';
import { Search as SearchIcon } from '@styled-icons/material-outlined/Search';
import React, { useState } from 'react';
import { Close as CloseIcon } from '@styled-icons/material-outlined/Close';
import * as S from './styles';
import Logo from 'components/Logo';
import Button from 'components/Button';
import MediaMatch from 'components/MediaMatch';
import Link from 'next/link';

export type MenuProps = {
  username?: string;
};
const Menu = ({ username }: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <S.Container>
      <MediaMatch lessThan="medium">
        <S.IconContainer onClick={() => setIsOpen(true)}>
          <MenuIcon aria-label="Open Menu" />
        </S.IconContainer>
      </MediaMatch>

      <S.LogoContainer>
        <Link href="/" passHref>
          <a>
            <Logo hideOnMobile />
          </a>
        </Link>
      </S.LogoContainer>

      <MediaMatch greaterThan="medium">
        <S.MenuNav>
          <Link href="/" passHref>
            <S.MenuLink>Home</S.MenuLink>
          </Link>

          <S.MenuLink href="#">Explore</S.MenuLink>
        </S.MenuNav>
      </MediaMatch>

      <S.MenuGroup>
        <S.IconContainer>
          <SearchIcon aria-label="Search" />
        </S.IconContainer>
        <S.IconContainer>
          <ShoppingCartIcon aria-label="Open Shopping Cart" />
        </S.IconContainer>
        {!username && (
          <MediaMatch greaterThan="medium">
            <Link href="/sign-in" passHref>
              <Button as="a">Sign in</Button>
            </Link>
          </MediaMatch>
        )}
      </S.MenuGroup>
      <S.MenuFull aria-hidden={!isOpen} isOpen={isOpen}>
        <CloseIcon aria-label="Close Menu" onClick={() => setIsOpen(false)} />

        <S.MenuNav>
          <Link href="/" passHref>
            <S.MenuLink>Home</S.MenuLink>
          </Link>
          <S.MenuLink href="#">Explore</S.MenuLink>

          {!!username && (
            <>
              <S.MenuLink href="#">My account</S.MenuLink>
              <S.MenuLink href="#">Wishlist</S.MenuLink>
            </>
          )}
        </S.MenuNav>

        {!username && (
          <S.RegisterBox>
            <Link href="/sign-in" passHref>
              <Button as="a" fullWidth size="large">
                Sign in
              </Button>
            </Link>
            <span>or</span>
            <Link href="/sign-up" passHref>
              <S.CreateAccount title="Sign Up">Sign Up</S.CreateAccount>
            </Link>
          </S.RegisterBox>
        )}
      </S.MenuFull>
    </S.Container>
  );
};
// -- for accessibility MenuFull starts hidden, so aria-hidden="true" for the
// -- screen reader not to read it
export default Menu;
