import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import * as APIModules from '../Services/API';
import Footer from '../Components/Footer';

const emailTestId = 'email-input';
const emailTest = 'teste@teste.com';
const passwordTestId = 'password-input';
const loginTestId = 'login-submit-btn';
const filterButton = 'search-top-btn';
const searchInputText = 'search-input';
const searchButtonText = 'exec-search-btn';

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

    const title = screen.getByRole('heading', { name: 'Bebidas!' });
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

    const title = screen.getByRole('heading', { name: 'Meals!' });
    expect(title).toBeInTheDocument();
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
    const searchInput = screen.getByTestId(searchInputText);
    await user.type(searchInput, 'chicken');
    const searchButton = screen.getByTestId(searchButtonText);
    await user.click(searchButton);
    waitFor(() => {
      vi.spyOn(APIModules, 'default');
      expect(APIModules).toHaveBeenCalled();
    });
  });
  test('Testa se a pesquisa usa os parâmetros corretos', async () => {
    const { user } = renderWithRouter(<App />, { route: '/drinks' });
    const filterButtonToClick = screen.getByTestId(filterButton);
    await user.click(filterButtonToClick);
    const searchInput = screen.getByTestId(searchInputText);
    await user.type(searchInput, 'a');
    const firstLetterButton = screen.getByTestId('first-letter-search-radio');
    await user.click(firstLetterButton);
    const searchButton = screen.getByTestId(searchButtonText);
    await user.click(searchButton);
    waitFor(() => {
      vi.spyOn(APIModules, 'default');
      const drinksCard = screen.getByTestId('0-recipe-card');
      expect(drinksCard).toBeInTheDocument();
    });
  });
  test('Testa se a pesquisa por primeira letra ao digita mais de uma vez aparece erro', async () => {
    const { user } = renderWithRouter(<App />, { route: '/drinks' });
    const filterButtonToClick = screen.getByTestId(filterButton);
    await user.click(filterButtonToClick);
    const searchInput = screen.getByTestId(searchInputText);
    await user.type(searchInput, 'aa');
    const ingredientButton = screen.getByTestId('first-letter-search-radio');
    await user.click(ingredientButton);
    const searchButton = screen.getByTestId(searchButtonText);
    await user.click(searchButton);
    waitFor(() => {
      vi.spyOn(APIModules, 'default');
      const alert = vi.spyOn(window, 'alert');
      expect(alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    });
  });
  test('Testa se a pesquisa por nome retorna corretamente', async () => {
    const { user } = renderWithRouter(<App />, { route: '/drinks' });
    const filterButtonToClick = screen.getByTestId(filterButton);
    await user.click(filterButtonToClick);
    const searchInput = screen.getByTestId(searchInputText);
    await user.type(searchInput, 'coffee');
    const nameButton = screen.getByTestId('ingredient-search-radio');
    await user.click(nameButton);
    expect(nameButton).toBeChecked();
    const searchButton = screen.getByTestId(searchButtonText);
    await user.click(searchButton);
    waitFor(() => {
      vi.spyOn(APIModules, 'default');
      expect(APIModules).not.toHaveBeenCalledWith('thecocktaildb', 'search.php?s', 'coffee');
    });
  });
});
