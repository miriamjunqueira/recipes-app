import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import UserProvider from './Context/UserProvider';

const renderWithRouter = (ui: JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, '', route);

  return {
    user: userEvent.setup(),
    ...render(<UserProvider>{ui}</UserProvider>, { wrapper: BrowserRouter }),
  };
};

export default renderWithRouter;
