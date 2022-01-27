import { useState, InputHTMLAttributes } from 'react';
import * as S from './styles';

export type TextFieldProps = {
  disabled?: boolean;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  initialValue?: string;
  label?: string;
  labelFor?: string;
  onInput?: (value: string) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const TextField = ({
  disabled = false,
  error,
  icon,
  iconPosition = 'left',
  initialValue = '',
  label,
  labelFor = '',
  onInput,
  ...props
}: TextFieldProps) => {
  const [value, setValue] = useState(initialValue);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setValue(newValue);

    !!onInput && onInput(newValue);
  };

  return (
    <S.Container disabled={disabled} error={!!error}>
      {!!label && <S.Label htmlFor={labelFor}>{label}</S.Label>}
      <S.InputContainer>
        {!!icon && <S.Icon iconPosition={iconPosition}>{icon}</S.Icon>}
        <S.Input
          type="text"
          onChange={handleOnChange}
          value={value}
          iconPosition={iconPosition}
          disabled={disabled}
          {...props}
        />
      </S.InputContainer>
      {!!error && <S.Error>{error}</S.Error>}
    </S.Container>
  );
};

export default TextField;
