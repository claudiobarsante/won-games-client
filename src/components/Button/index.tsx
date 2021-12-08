import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import * as S from './styles';

// -- this button could be an anchor or a link
type ButtonTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = {
  //  children?: React.ReactNode;
  as?: React.ElementType; // polimorphism, could be an anchor or button
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  icon?: JSX.Element; // JSX.Element could use with preact or React.ReactNode
  //onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
} & ButtonTypes; // -- & = extends ButtonTypes

const Button = ({
  children,
  icon,
  size = 'medium',
  fullWidth = false,
  ...props
}: ButtonProps) => (
  <S.Container size={size} fullWidth={fullWidth} hasIcon={!!icon} {...props}>
    {icon}
    {!!children && <span>{children}</span>}
  </S.Container>
);

export default Button;
