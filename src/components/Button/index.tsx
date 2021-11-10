import * as S from './styles';

export type ButtonProps = {
  children?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
};
const Button = ({ children, size = 'medium' }: ButtonProps) => (
  <S.Container size={size}>{!!children && <span>{children}</span>}</S.Container>
);

export default Button;
