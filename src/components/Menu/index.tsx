import { Menu2 as MenuIcon } from '@styled-icons/remix-fill/Menu2';
import { ShoppingCart as ShoppingCartIcon } from '@styled-icons/material-outlined/ShoppingCart';
import { Search as SearchIcon } from '@styled-icons/material-outlined/Search';
import React, { useState } from 'react';
import { Close as CloseIcon } from '@styled-icons/material-outlined/Close';
import * as S from './styles';
import Logo from 'components/Logo';
import Button from 'components/Button';
import MediaMatch from 'components/MediaMatch';

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
        <Logo hideOnMobile />
      </S.LogoContainer>

      <MediaMatch greaterThan="medium">
        <S.MenuNav>
          <S.MenuLink href="#">Home</S.MenuLink>
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
            <Button>Sign in</Button>
          </MediaMatch>
        )}
      </S.MenuGroup>
      <S.MenuFull aria-hidden={!isOpen} isOpen={isOpen}>
        <CloseIcon aria-label="Close Menu" onClick={() => setIsOpen(false)} />

        <S.MenuNav>
          <S.MenuLink href="#">Home</S.MenuLink>
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
            <Button fullWidth size="large">
              Log in now
            </Button>
            <span>or</span>
            <S.CreateAccount href="#" title="Sign Up">
              Sign Up
            </S.CreateAccount>
          </S.RegisterBox>
        )}
      </S.MenuFull>
    </S.Container>
  );
};
// -- for accessibility MenuFull starts hidden, so aria-hidden="true" for the
// -- screen reader not to read it
export default Menu;
