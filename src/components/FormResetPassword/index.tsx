import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

// -- Icons
import { Lock, ErrorOutline } from '@styled-icons/material-outlined';
// -- Components
import { FormContainer, FormLoading, FormError } from 'components/Form';
import Button from 'components/Button';
import TextField from 'components/TextField';
// -- Utils
import { FieldErrors } from 'utils/validations';
import { resetValidate } from './../../utils/validations/index';

const FormResetPassword = () => {
  const [formError, setFormError] = useState('');
  const [fieldError, setFieldError] = useState<FieldErrors>({});
  const [values, setValues] = useState({ password: '', confirm_password: '' });
  const [loading, setLoading] = useState(false);
  const routes = useRouter();
  const { query } = routes;

  const handleInput = (field: string, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const errors = resetValidate(values);

    if (Object.keys(errors).length) {
      setFieldError(errors);
      setLoading(false);
      return;
    }

    setFieldError({});

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/reset-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: values.password,
          passwordConfirmation: values.confirm_password,
          code: query.code
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      const returnedError = data.message[0].messages[0].message;
      setFormError(returnedError);
      setLoading(false);
    } else {
      signIn('credentials', {
        email: data.user.email,
        password: values.password,
        callbackUrl: '/'
      });
    }
  };

  return (
    <FormContainer>
      {!!formError && (
        <FormError>
          <ErrorOutline /> {formError}
        </FormError>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          name="password"
          placeholder="Password"
          type="password"
          error={fieldError?.password}
          onInputChange={(v) => handleInput('password', v)}
          icon={<Lock />}
        />
        <TextField
          name="confirm_password"
          placeholder="Confirm password"
          type="password"
          error={fieldError?.confirm_password}
          onInputChange={(v) => handleInput('confirm_password', v)}
          icon={<Lock />}
        />

        <Button type="submit" size="large" fullWidth disabled={loading}>
          {loading ? <FormLoading /> : <span>Reset Password</span>}
        </Button>
      </form>
    </FormContainer>
  );
};

export default FormResetPassword;
