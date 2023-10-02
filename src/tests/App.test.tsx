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
  test('Testa se a requisição da API é feita', async () => {
    vi.spyOn(APIModules, 'fetchRecipesApi');
    renderWithRouter(<App />, { route: '/meals' });
    waitFor(() => {
      expect(APIModules.fetchRecipesApi).toHaveBeenCalled();
    });
  });
});
