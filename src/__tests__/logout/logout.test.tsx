import { Logout } from '@src/components/molecules/logout';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

describe('<Logout />', () => {
  test('should render', async () => {
    const onClickLogout = jest.fn();
    render(
      <Logout
        onClickLogout={onClickLogout}
        username="username"
        avatar=""
        data-testid="logout-button"
      />
    );
    const element = screen.getByTestId('logout-button');
    expect(element).toMatchSnapshot();
    fireEvent.click(element);
    await waitFor(() => expect(onClickLogout).toBeCalled());
  });
});
