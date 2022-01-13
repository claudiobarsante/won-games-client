import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.menu`
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    padding: ${theme.spacings.small} 0;
    position: relative;
  `}
`;

export const IconContainer = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    cursor: pointer;
    width: 2.4rem;
    height: 2.4rem;
  `}
`;

export const LogoContainer = styled.div`
  ${media.lessThan('medium')`
   position: absolute;

 left:50%;
 transform: translateX(-50%);
`}
`;

export const MenuGroup = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-grow: 1;

    > div {
      margin-left: ${theme.spacings.xsmall};
    }
  `}
`;

type MenuFullProps = {
  isOpen: boolean;
};
export const MenuFull = styled.nav<MenuFullProps>`
  ${({ theme, isOpen }) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: ${theme.colors.white};
    position: fixed;
    z-index: ${theme.layers.menu};
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100vh;
    overflow: hidden;
    transition: opacity 0.3s ease-in-out;
    opacity: ${isOpen ? 1 : 0};
    pointer-events: ${isOpen
      ? 'all'
      : 'none'}; //Set whether or not an element should react to pointer events

    > svg {
      position: absolute;
      top: 0;
      right: 0;
      margin: ${theme.spacings.xsmall};
      cursor: pointer;
      width: 2.4rem;
      height: 2.4rem;
    }

    ${MenuNav} {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      flex: 1; //to use all the viewport available, so you can center links or you can use--> height: 100vh;
    }

    ${MenuLink} {
      color: ${theme.colors.black};
      font-weight: ${theme.font.bold};
      font-size: ${theme.font.sizes.xlarge};
      margin-bottom: ${theme.spacings.small};
      transform: ${isOpen ? 'translateY(0)' : 'translateY(3rem)'};
      transition: transform 0.3s ease-in-out;
    }

    ${RegisterBox} {
      transform: ${isOpen ? 'translateY(0)' : 'translateY(3rem)'};
      transition: transform 0.3s ease-in-out;
    }
  `}
`;
export const MenuNav = styled.div`
  ${({ theme }) => css`
    //display: flex;
    margin-top: 1rem;
    //border: 1px solid red;
    ${media.greaterThan('medium')`margin-left: ${theme.spacings.xlarge};`}
  `}
`;
export const MenuLink = styled.a`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.medium};
    margin: 0.3rem ${theme.spacings.small} 0;
    position: relative;
    color: ${theme.colors.white};
    text-align: center;
    text-decoration: none;

    &:hover {
      &::after {
        content: '';
        animation: hoverAnimation 0.2s forwards;
        background-color: ${theme.colors.primary};
        display: block;
        height: 0.3rem;
        position: absolute;
      }

      @keyframes hoverAnimation {
        from {
          width: 0;
          left: 50%;
        }
        to {
          width: 100%;
          left: 0;
        }
      }
    }
  `}
`;

export const RegisterBox = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 ${theme.spacings.xlarge} ${theme.spacings.xlarge};
    > span {
      display: block;
      margin: ${theme.spacings.xxsmall} 0;
      font-size: ${theme.font.sizes.xsmall};
    }
  `}
`;

export const CreateAccount = styled.a`
  ${({ theme }) => css`
    text-decoration: none;
    color: ${theme.colors.primary};
    border-bottom: 0.2rem solid ${theme.colors.primary};
  `}
`;
