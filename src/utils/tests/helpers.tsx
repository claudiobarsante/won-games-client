import { ThemeProvider } from 'styled-components';
import { render, RenderResult } from '@testing-library/react';

import { themeApp } from '../../styles/theme';

export const renderWithTheme = (children: React.ReactNode): RenderResult =>
  render(<ThemeProvider theme={themeApp}>{children}</ThemeProvider>);
