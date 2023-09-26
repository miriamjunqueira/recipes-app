import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, useLocation } from 'react-router-dom';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import Footer from '../Components/Footer';

const emailTestId = 'email-input';
const emailTest = 'teste@teste.com';
const passwordTestId = 'password-input';
const loginTestId = 'login-submit-btn';

describe('Teste do AppReceitas', () => {
  test('Testa se os inputs e o botão estão na tela', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const enterButton = screen.getByTestId(loginTestId);
    expect(emailInput && passwordInput && enterButton).toBeInTheDocument();
  });

  // ESSE TESTE FICOU INÚTIL, ESTÁVAMOS USANDO PARA TESTAR SE SALVA O STATE, NO TESTE ABAIXO ISSO É FEITO JUNTO COM O LOCALSTORAGE
  // test('Testa se ao escrever no input ela salva no State do User', async () => {
  //   const { user } = renderWithRouter(<App />);
  //   const emailInput = screen.getByTestId(emailTestId);
  //   await user.type(emailInput, emailTest);
  //   const email = screen.getByText(emailTest);
  //   expect(email).toBeInTheDocument();
  // });

  test('Testa se os dados foram salvos LocalStorage', async () => {
    const { user } = renderWithRouter(<App />);
    const enterButton = screen.getByTestId(loginTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const emailInput = screen.getByTestId(emailTestId);
    await user.type(emailInput, emailTest);
    await user.type(passwordInput, '1234567');
    await user.click(enterButton);
    const savedEmail = localStorage.getItem('user');
    expect(savedEmail).toBe('{"email":"teste@teste.com"}');
  });
  test('Testa se ao mudar para /profile nao aparece o botão de pesquisa', async () => {
    const { user } = renderWithRouter(<App />);
    const enterButton = screen.getByTestId(loginTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const emailInput = screen.getByTestId(emailTestId);
    await user.type(emailInput, 'teste@teste.com');
    await user.type(passwordInput, '1234567');
    await user.click(enterButton);
    const profileButton = screen.getByTestId('profile-top-btn');
    const searchButton = screen.getByTestId('search-top-btn');
    await user.click(profileButton);
    expect(searchButton).not.toBeInTheDocument();
  });
  /// //////////////////////////
  test('Testa se o footer tem botão de bebidas', () => {
    renderWithRouter(<Footer />);

    const botaoBebidas = screen.getByTestId('drinks-bottom-btn');
    expect(botaoBebidas).toBeInTheDocument();
  });

  test('Testa se o footer tem botão de comidas', async () => {
    const { user } = renderWithRouter(<Footer />);

    const botaoComidas = screen.getByTestId('meals-bottom-btn');
    expect(botaoComidas).toBeInTheDocument();
  });

  test('Testa a rota para bebidas', async () => {
    const { user } = renderWithRouter(<App />);
    const enterButton = screen.getByTestId(loginTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const emailInput = screen.getByTestId(emailTestId);
    await user.type(emailInput, 'teste@teste.com');
    await user.type(passwordInput, '1234567');
    await user.click(enterButton);

    const botaoBebidas = screen.getByTestId('drinks-bottom-btn');
    await userEvent.click(botaoBebidas);

    const title = screen.getByRole('heading', { name: 'Bebidas!' });
    expect(title).toBeInTheDocument();
  });

  test('Testa a rota para comidas', async () => {
    const { user } = renderWithRouter(<App />);
    const enterButton = screen.getByTestId(loginTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const emailInput = screen.getByTestId(emailTestId);
    await user.type(emailInput, 'teste@teste.com');
    await user.type(passwordInput, '1234567');
    await user.click(enterButton);

    const botaoComidas = screen.getByTestId('meals-bottom-btn');
    await userEvent.click(botaoComidas);

    const title = screen.getByRole('heading', { name: 'Meals!' });
    expect(title).toBeInTheDocument();
  });
});
