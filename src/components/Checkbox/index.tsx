import { InputHTMLAttributes, useState } from 'react';
import * as S from './styles';

export type CheckboxProps = {
  isChecked?: boolean;
  onCheck?: (status: boolean) => void;
  label?: string;
  labelFor?: string;
  labelColor?: 'white' | 'black';
  value?: string | ReadonlyArray<string> | number;
} & InputHTMLAttributes<HTMLInputElement>;

const Checkbox = ({
  onCheck,
  isChecked = false,
  label,
  labelFor = '',
  labelColor = 'white',
  value,
  ...props
}: CheckboxProps) => {
  const [checked, setChecked] = useState(isChecked);

  const handleOnChange = () => {
    const status = !checked;
    setChecked(status);

    if (onCheck) onCheck(status);
  };
  return (
    <S.Container>
      <S.Input
        id={labelFor}
        type="checkbox"
        onChange={handleOnChange}
        checked={checked}
        value={value}
        {...props}
      />
      {!!label && (
        <S.Label htmlFor={labelFor} labelColor={labelColor}>
          {label}
        </S.Label>
      )}
    </S.Container>
  );
};

export default Checkbox;
