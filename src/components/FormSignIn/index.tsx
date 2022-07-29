import * as S from './styles';
import { Email, Lock, ErrorOutline } from '@styled-icons/material-outlined';
import TextField from 'components/TextField';
import Button from 'components/Button';
import Link from 'next/link';
import {
  FormContainer,
  FormLink,
  FormLoading,
  FormError
} from 'components/Form';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FieldErrors, signInValidate } from 'utils/validations';

const FormSignIn = () => {
  const [formError, setFormError] = useState('');
  const [fieldError, setFieldError] = useState<FieldErrors>({});
  const [values, setValues] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { push, query } = router; //to prevent de query to return undefined

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const errors = signInValidate(values);
    if (Object.keys(errors).length) {
      setFieldError(errors);
      setLoading(false);
      return;
    }

    setFieldError({});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await signIn('credentials', {
      ...values,
      redirect: false,
      callbackUrl: `${window.location.origin}${query?.callbackUrl || ''}` //takes the site base url, ex: wwww.mystite.com and concatenates to the callbackUrl define in the protected route to redirect to the page the you were before signed in
    });

    if (result?.url) {
      return push(result?.url);
    }
    setLoading(false);
    //if tthere's an error
    setFormError('username or password is invalid');
  };

  const handleInput = (field: string, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
  };
  return (
    <FormContainer>
      {!!formError && (
        <FormError>
          <ErrorOutline />
          {formError}
        </FormError>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          placeholder="Email"
          type="email"
          error={fieldError?.email}
          onInputChange={(newValue) => handleInput('email', newValue)}
          icon={<Email />}
        />
        <TextField
          name="password"
          placeholder="Password"
          type="password"
          error={fieldError?.password}
          onInputChange={(newValue) => handleInput('password', newValue)}
          icon={<Lock />}
        />
        <Link href="/forgot-password" passHref>
          <S.ForgotPassword>Forgot your password?</S.ForgotPassword>
        </Link>
        <Button type="submit" size="large" fullWidth disabled={loading}>
          {loading ? <FormLoading /> : <span>Sign in now</span>}
        </Button>
        <FormLink>
          Don’t have an account?{''}
          <Link href="/sign-up">
            <a>Sign up</a>
          </Link>
        </FormLink>
      </form>
    </FormContainer>
  );
};

export default FormSignIn;
