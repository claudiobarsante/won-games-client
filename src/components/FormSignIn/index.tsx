import * as S from './styles';
import { Email, Lock } from '@styled-icons/material-outlined';
import TextField from 'components/TextField';
import Button from 'components/Button';
import Link from 'next/link';
import { FormContainer, FormLink, FormLoading } from 'components/Form';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const FormSignIn = () => {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const result = await signIn('credentials', {
      ...values,
      redirect: false,
      callbackUrl: '/'
    });

    if (result?.url) {
      return push(result?.url);
    }
    setLoading(false);
    console.error('email verification failed');
  };

  const handleInput = (field: string, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
  };
  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          placeholder="Email"
          type="email"
          onInputChange={(newValue) => handleInput('email', newValue)}
          icon={<Email />}
        />
        <TextField
          name="password"
          placeholder="Password"
          type="password"
          onInputChange={(newValue) => handleInput('password', newValue)}
          icon={<Lock />}
        />
        <S.ForgotPassword href="#">Forgot your password?</S.ForgotPassword>
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
