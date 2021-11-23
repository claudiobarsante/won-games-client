import * as S from './styles';

export type HeadingProps = {
  children: React.ReactNode;
  color?: 'white' | 'black';
  lineLeft?: boolean;
  lineBottom?: boolean;
  size?: 'small' | 'medium';
};

const Heading = ({
  children,
  color = 'white',
  lineLeft = false,
  lineBottom = false,
  size = 'medium'
}: HeadingProps) => (
  <S.Container
    color={color}
    lineLeft={lineLeft}
    lineBottom={lineBottom}
    size={size}
  >
    {children}
  </S.Container>
);

export default Heading;
