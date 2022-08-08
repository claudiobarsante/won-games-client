import { useState } from 'react';
import { useRouter } from 'next/router';
// -- Components
import {
  FormContainer,
  FormLoading,
  FormError,
  FormSuccess
} from 'components/Form';
import Button from 'components/Button';
import TextField from 'components/TextField';
// -- Icons
import {
  CheckCircleOutline,
  Email,
  ErrorOutline
} from '@styled-icons/material-outlined';
// -- Utils
import { FieldErrors, forgotValidate } from 'utils/validations';

const FormForgotPassword = () => {
  const { query } = useRouter();
  const [fieldError, setFieldError] = useState<FieldErrors>({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [values, setValues] = useState({
    email: (query.email as string) || ''
  });

  const handleInput = (field: string, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const errors = forgotValidate(values);

    if (Object.keys(errors).length) {
      setFieldError(errors);
      setLoading(false);
      return;
    }

    setFieldError({});
    // enviar um post para /forgot-password pedindo um email
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/forgot-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }
    );

    const data = await response.json();
    setLoading(false);

    if (data.error) {
      const returnedError = data.message[0].messages[0].message;
      setFormError(returnedError);
    } else {
      setSuccess(true);
    }
  };

  return (
    <FormContainer>
      {success ? (
        <FormSuccess>
          <CheckCircleOutline />
          You just received an email!
        </FormSuccess>
      ) : (
        <>
          {!!formError && (
            <FormError>
              <ErrorOutline /> {formError}
            </FormError>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              name="email"
              placeholder="Email"
              type="text"
              error={fieldError?.email}
              initialValue={query.email as string}
              onInputChange={(value) => handleInput('email', value)}
              icon={<Email />}
            />

            <Button type="submit" size="large" fullWidth disabled={loading}>
              {loading ? <FormLoading /> : <span>Send email</span>}
            </Button>
          </form>
        </>
      )}
    </FormContainer>
  );
};

export default FormForgotPassword;
