import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const emailTestId = 'email-input';
describe('Teste do AppReceitas', () => {
  test('Testa se os inputs e o botão estão na tela', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId('password-input');
    const enterButton = screen.getByTestId('login-submit-btn');
    expect(emailInput && passwordInput && enterButton).toBeInTheDocument();
  });

  test('Testa se ao escrever no input ela salva no State do User', async () => {
    const { user } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailTestId);
    await user.type(emailInput, 'teste@teste.com');
    const email = screen.getByText(/teste@teste\.com/i);
    expect(email).toBeInTheDocument();
  });

  test('Testa se os dados foram salvos LocalStorage', async () => {
    const { user } = renderWithRouter(<App />);
    const enterButton = screen.getByTestId('login-submit-btn');
    const passwordInput = screen.getByTestId('password-input');
    const emailInput = screen.getByTestId(emailTestId);
    await user.type(emailInput, 'teste@teste.com');
    await user.type(passwordInput, '1234567');
    await user.click(enterButton);
    const savedEmail = localStorage.getItem('user');
    expect(savedEmail).toBe('{"email":"teste@teste.com"}');
    const meals = screen.getByText(/Meals/i);
    expect(meals).toBeInTheDocument();
  });
});
