import { rest } from 'msw';

//corpo da requisição
type LoginReqBody = {
  email: string;
};

type ResetReqBody = {
  code: string;
  password: string;
  passwordConfirmation: string;
};
const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

// onde vamos interceptar as chamadas
export const handlers = [
  rest.post<LoginReqBody>(
    `${baseUrl}/auth/forgot-password`,
    (req, res, ctx) => {
      const { email } = req.body;

      // quando der erro
      if (email === 'false@email.com') {
        return res(
          ctx.status(400),
          ctx.json({
            //use the same format as a response from strapi api
            error: 'Bad Request',
            message: [
              {
                messages: [
                  {
                    message: 'This email does not exist'
                  }
                ]
              }
            ]
          })
        );
      }

      // quando for sucesso
      return res(
        ctx.status(200),
        ctx.json({
          ok: true
        })
      );
    }
  ),
  rest.post<ResetReqBody>(`${baseUrl}/auth/reset-password`, (req, res, ctx) => {
    const { code } = req.body;

    if (code === 'wrong_code') {
      return res(
        ctx.status(400),
        ctx.json({
          error: 'Bad Request',
          message: [
            {
              messages: [
                {
                  message: 'Incorrect code provided.'
                }
              ]
            }
          ]
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        user: {
          email: 'valid@email.com'
        }
      })
    );
  })
];
