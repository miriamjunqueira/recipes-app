import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Testa se os inputs e o botão estão na tela', () => {
  renderWithRouter(<App />);
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const enterButton = screen.getByTestId('login-submit-btn');
  expect(emailInput && passwordInput && enterButton).toBeInTheDocument();
});

test('Testa se os inputs e o botão estão na tela', async () => {
  const { user } = renderWithRouter(<App />);
  const emailInput = screen.getByTestId('email-input');
  await user.type(emailInput, 'teste@teste.com');
  const email = screen.getByText(/teste@teste\.com/i);
  expect(email).toBeInTheDocument();
});
