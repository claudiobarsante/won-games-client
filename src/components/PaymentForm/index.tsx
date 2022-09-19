import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { PaymentIntent, StripeCardElementChangeEvent } from '@stripe/stripe-js';
import Button from 'components/Button';
import Heading from 'components/Heading';

import React, { useState, useEffect } from 'react';
import { ErrorOutline, ShoppingCart } from '@styled-icons/material-outlined';
import { useCart } from 'hooks/use-cart';

import * as S from './styles';
import { Session } from 'next-auth';
import { createPayment, createPaymentIntent } from 'utils/stripe/methods';
import { FormLoading } from 'components/Form';
import { useRouter } from 'next/router';
import Link from 'next/link';

type PaymentFormProps = {
  session: Session;
};

const PaymentForm = ({ session }: PaymentFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [freeGames, setFreeGames] = useState(false);

  const { push } = useRouter();
  const { items } = useCart();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    async function setPaymentMode() {
      if (items.length) {
        // bater na API /orders/create-payment-intent
        const data = await createPaymentIntent({
          items,
          token: session.jwt as string
        });

        // se eu receber freeGames: true => setFreeGames
        // faço o fluxo de jogo gratuito
        if (data.freeGames) {
          setFreeGames(true);
          console.log(data.freeGames);
          return;
        }

        // se eu receber um erro
        // setError
        if (data.error) {
          setError(data.error);
        } else {
          // senão o paymentIntent foi válido
          // setClientSecret
          setFreeGames(false);
          setClientSecret(data.client_secret);
          console.log(data.client_secret);
        }
      }
    }
    setPaymentMode();
  }, [items, session]);

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  const saveOrder = async (paymentIntent?: PaymentIntent) => {
    const data = await createPayment({
      items,
      paymentIntent,
      token: session.jwt as string
    });

    return data;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    // se for freeGames
    if (freeGames) {
      // salva no banco
      saveOrder();
      // redireciona para success
      push('/success');
      return;
    }

    const payload = await stripe!.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements!.getElement(CardElement)!
      }
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setLoading(false);
    } else {
      setError(null);
      setLoading(false);
      console.log('Compra efetuada com sucesso!');

      // salvar a compra no banco do Strapi
      saveOrder(payload.paymentIntent);
      // redirectionar para a página de Sucesso
      push('/success');
    }
  };
  const withoutErrosOrDisabledIsFalse = !!error || disabled;

  return (
    <S.Wrapper>
      <form onSubmit={handleSubmit}>
        <S.Body>
          <Heading color="black" size="small" lineBottom>
            Payment
          </Heading>
          {freeGames ? (
            <S.FreeGames>Only free games, click buy and enjoy!</S.FreeGames>
          ) : (
            <CardElement
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    fontSize: '16px'
                  }
                }
              }}
              onChange={handleChange}
            />
          )}

          {error && (
            <S.Error>
              <ErrorOutline size={20} />
              {error}
            </S.Error>
          )}
        </S.Body>
        <S.Footer>
          <Link href="/" passHref>
            <Button as="a" fullWidth minimal>
              Continue shopping
            </Button>
          </Link>
          <Button
            type="submit"
            fullWidth
            icon={loading ? <FormLoading /> : <ShoppingCart />}
            disabled={!freeGames && withoutErrosOrDisabledIsFalse}
          >
            {!loading && <span>Buy now</span>}
          </Button>
        </S.Footer>
      </form>
    </S.Wrapper>
  );
};

export default PaymentForm;
