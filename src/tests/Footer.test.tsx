import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import Footer from '../Components/Footer';

const emailTestId = 'email-input';
const passwordTestId = 'password-input';
const loginTestId = 'login-submit-btn';

describe('Testa o rodapé', () => {
  test('Testa se o footer tem botão de bebidas', () => {
    renderWithRouter(<Footer />);

    const botaoBebidas = screen.getByTestId('drinks-bottom-btn');
    expect(botaoBebidas).toBeInTheDocument();
  });

  test('Testa se o footer tem botão de comidas', async () => {
    renderWithRouter(<Footer />);

    const botaoComidas = screen.getByTestId('meals-bottom-btn');
    expect(botaoComidas).toBeInTheDocument();
  });

  test('Testa a rota para bebidas', async () => {
    const { user } = renderWithRouter(<App />);
    const enterButton = screen.getByTestId(loginTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const emailInput = screen.getByTestId(emailTestId);
    await user.type(emailInput, 'testa@testa.com');
    await user.type(passwordInput, '12345673');
    await user.click(enterButton);

    const botaoBebidas = screen.getByTestId('drinks-bottom-btn');
    await userEvent.click(botaoBebidas);

    const title = screen.getByRole('heading', { name: 'Drinks' });
    expect(title).toBeInTheDocument();
  });

  test('Testa a rota para comidas', async () => {
    const { user } = renderWithRouter(<App />);
    const enterButton = screen.getByTestId(loginTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const emailInput = screen.getByTestId(emailTestId);
    await user.type(emailInput, 'test@test.com');
    await user.type(passwordInput, '12345678');
    await user.click(enterButton);

    const botaoComidas = screen.getByTestId('meals-bottom-btn');
    await userEvent.click(botaoComidas);

    const title = screen.getByRole('heading', { name: 'Meals' });
    expect(title).toBeInTheDocument();
  });
  test('Testa se a rota Drinks possui o texto Drinks na tela', () => {
    renderWithRouter(<App />, { route: '/drinks' });
    const drinksText = screen.getByTestId('page-title');
    expect(drinksText).toBeInTheDocument();
  });
});
