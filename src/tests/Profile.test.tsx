import { screen } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Profile Component Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Testa se a pagina está renderizando corretamente', () => {
    renderWithRouter(<App />, { route: '/profile' });
    const profileChecker = screen.getByTestId('page-title');

    expect(profileChecker).toBeInTheDocument();
  });
  test('Testa se mostra no o e-mail na pagina caso tenha um login salvo no Local Storage', () => {
    const user = { email: 'email@mail.com' };
    localStorage.setItem('user', JSON.stringify(user));
    renderWithRouter(<App />, { route: '/profile' });

    const emailElement = screen.getByTestId('profile-email');
    expect(emailElement).toBeInTheDocument();
    expect(emailElement).toHaveTextContent(user.email);
  });
  test('Testa se o botão Logout funciona corretamente', async () => {
    const userOnLocalStorage = { email: 'email@mail.com' };
    localStorage.setItem('user', JSON.stringify(userOnLocalStorage));
    const { user } = renderWithRouter(<App />, { route: '/profile' });
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    await user.click(logoutBtn);
    const getLoginInput = await screen.findByTestId('email-input');
    expect(getLoginInput).toBeInTheDocument();
    expect(window.localStorage.getItem('user')).toBeNull();
  });
  test('Testa se os botões de Done Recipes e Favorite Recipes Funciona corretamente', async () => {
    const { user } = renderWithRouter(<App />, { route: '/profile' });
    const getFavoriteBtn = screen.getByTestId('profile-favorite-btn');
    expect(getFavoriteBtn).toBeInTheDocument();
    await user.click(getFavoriteBtn);
    expect(window.location.pathname).toBe('/favorite-recipes');
    const getProfileBtn = screen.getByTestId('profile-top-btn');
    await user.click(getProfileBtn);
    const getProfileHeader = await screen.findByTestId('page-title');
    expect(getProfileHeader).toBeInTheDocument();
    const getDoneBtn = await screen.findByTestId('profile-done-btn');
    expect(getDoneBtn).toBeInTheDocument();
    await user.click(getDoneBtn);
    expect(window.location.pathname).toBe('/done-recipes');
  });
});
