import { CartItem } from 'hooks/use-cart';
import { PaymentIntent } from '@stripe/stripe-js';

type PaymentIntentParams = {
  items: CartItem[];
  token: string;
};

type FetcherParams = {
  url: string;
  body: string;
  token: string;
};

const fetcher = async ({ url, body, token }: FetcherParams) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${url}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body
    }
  );

  return await response.json();
};

export const createPaymentIntent = async ({
  items,
  token
}: PaymentIntentParams) => {
  return fetcher({
    url: '/orders/create-payment-intent',
    body: JSON.stringify({ cart: items }),
    token
  });
};

type CreatePaymentParams = {
  items: CartItem[];
  paymentIntent?: PaymentIntent;
  token: string;
};

export const createPayment = ({
  items,
  paymentIntent,
  token
}: CreatePaymentParams) => {
  return fetcher({
    url: '/orders',
    body: JSON.stringify({
      cart: items,
      paymentIntentId: paymentIntent?.id,
      paymentMethod: paymentIntent?.payment_method
    }),
    token
  });
};
