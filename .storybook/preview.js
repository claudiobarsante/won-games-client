import { ThemeProvider } from 'styled-components'
import GlobalStyles from 'styles/global'
import { theme } from 'styles/theme';
import { themeApp } from 'styles/theme';


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
  (Story) => (
    <ThemeProvider theme={themeApp}>
      <GlobalStyles />
      <Story />
    </ThemeProvider>
  )
]


