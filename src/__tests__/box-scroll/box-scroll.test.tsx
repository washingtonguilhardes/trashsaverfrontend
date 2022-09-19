import { ThemeProvider } from '@emotion/react';
import { BoxScroll } from '@src/components/atoms/box-scroll';
import { theme } from '@src/theme';
import { render, screen } from '@testing-library/react';

describe('<BoxScroll />', () => {
  test('expect render', () => {
    render(
      <ThemeProvider theme={theme}>
        <BoxScroll data-testid="element">A child text</BoxScroll>
      </ThemeProvider>
    );
    expect(screen.getByTestId('element')).toMatchSnapshot();
  });
});
