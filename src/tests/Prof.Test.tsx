import { screen } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Profile Component Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders profile page correctly', () => {
    renderWithRouter(<App />, { route: '/profile' });
    const profileChecker = screen.getByRole('heading', {
      name: /profile/i,
    });

    expect(profileChecker).toBeInTheDocument();
  });
  it('shows user e-mail when present in LocalStorage', () => {
    const user = { email: 'email@mail.com' };
    localStorage.setItem('user', JSON.stringify(user));
    renderWithRouter(<App />, { route: '/profile' });

    const emailElement = screen.getByTestId('profile-email');
    expect(emailElement).toBeInTheDocument();
    expect(emailElement).toHaveTextContent(user.email);
  });
});
