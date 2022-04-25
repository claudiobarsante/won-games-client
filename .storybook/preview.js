import { ThemeProvider } from 'styled-components'
import GlobalStyles from 'styles/global'
import { themeApp } from 'styles/theme';
import {CartContext,CartContextDefaultValues} from 'hooks/use-cart'



export const parameters = {
  backgrounds: {
    default: 'won-light',
    values: [
      {
        name: 'won-light',
        value: themeApp.colors.white
      },
      {
        name: 'won-dark',
        value: themeApp.colors.mainBg
      }
    ]
  }
}
// export const parameters = {
//   actions: { argTypesRegex: "^on[A-Z].*" },
//   controls: {
//     matchers: {
//       color: /(background|color)$/i,
//       date: /Date$/,
//     },
//   },
// }


export const decorators = [
  (Story,context) => (
    <ThemeProvider theme={themeApp}>
    <CartContext.Provider value={{...CartContextDefaultValues,...(context?.args?.cartContextValue || {}),...context.args}}>
    <GlobalStyles removeBg />
    <Story />
    </CartContext.Provider>
    </ThemeProvider>
  )
]


