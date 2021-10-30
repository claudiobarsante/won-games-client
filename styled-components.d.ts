//styled-components.d.ts  it's to TS recognize my theme
import theme from 'styles/theme';

// inferência de tipos
type Theme = typeof theme;

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
