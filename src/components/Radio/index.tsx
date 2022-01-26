import { InputHTMLAttributes } from 'react';

import * as S from './styles';

type RadioValue = string | ReadonlyArray<string> | number;

export type RadioProps = {
  onCheck?: (value?: RadioValue) => void;
  label?: string;
  labelColor?: 'white' | 'black';
  labelFor?: string;
  value?: RadioValue;
} & InputHTMLAttributes<HTMLInputElement>;

const Radio = ({
  label,
  onCheck,
  labelColor = 'white',
  labelFor = '',
  value,
  ...props
}: RadioProps) => {
  const handleOnChange = () => {
    !!onCheck && onCheck(value);
  };

  return (
    <S.Container>
      <S.Input
        id={labelFor}
        type="radio"
        value={value}
        onChange={handleOnChange}
        {...props}
      />
      {!!label && (
        <S.Label labelColor={labelColor} htmlFor={labelFor}>
          {label}
        </S.Label>
      )}
    </S.Container>
  );
};

export default Radio;
