import { forwardRef, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import * as S from './styles';
import { ContainerProps } from './styles';

// -- this button could be an anchor or a link
type ButtonTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = {
  //  children?: React.ReactNode;
  as?: React.ElementType; // polimorphism, could be an anchor or button
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  minimal?: boolean;
  icon?: JSX.Element; // JSX.Element could use with preact or React.ReactNode
  //onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
} & ButtonTypes; // -- & = extends ButtonTypes

const Button: React.ForwardRefRenderFunction<ContainerProps, ButtonProps> = (
  {
    children,
    icon,
    size = 'medium',
    fullWidth = false,
    minimal = false,
    ...props
  },
  ref
) => (
  <S.Container
    size={size}
    fullWidth={fullWidth}
    hasIcon={!!icon}
    minimal={minimal}
    ref={ref}
    {...props}
  >
    {icon}
    {!!children && <span>{children}</span>}
  </S.Container>
);

export default forwardRef(Button);
