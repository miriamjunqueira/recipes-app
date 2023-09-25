import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import * as APIModules from '../Services/API';

const emailTestId = 'email-input';
const emailTest = 'teste@teste.com';
const passwordTestId = 'password-input';
const loginTestId = 'login-submit-btn';
const filterButton = 'search-top-btn';

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
    const searchButton = screen.getByTestId(filterButton);
    await user.click(profileButton);
    expect(searchButton).not.toBeInTheDocument();
  });
  test('Testa se ao clicar no botão de pesquisa o input de texto aparece para digitar', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const searchButton = screen.getByTestId(filterButton);
    await user.click(searchButton);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });
  test('Testa se a rota Drinks possui o texto Drinks na tela', () => {
    renderWithRouter(<App />, { route: '/drinks' });
    const drinksText = screen.getByTestId('page-title');
    expect(drinksText).toBeInTheDocument();
  });
  test('Testa se a requisição da API é feita', async () => {
    const { user } = renderWithRouter(<App />, { route: '/drinks' });
    const filterButtonToClick = screen.getByTestId(filterButton);
    await user.click(filterButtonToClick);
    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'chicken');
    const searchButton = screen.getByTestId('exec-search-btn');
    await user.click(searchButton);
    waitFor(() => {
      vi.spyOn(APIModules, 'default');
      expect(APIModules).toHaveBeenCalled();
    });
  });
});
