import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import SearchBar from './SearchBar';

function Header() {
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);

  const routeTitle: Record<string, string> = {
    '/meals': 'Meals',
    '/drinks': 'Drinks',
    '/profile': 'Profile',
    '/done-recipes': 'Done Recipes',
    '/favorite-recipes': 'Favorite Recipes',
  };

  const currentRoute = location.pathname;
  const pageTitle: string = routeTitle[currentRoute];
  const searchVisible = location.pathname === '/meals' || location.pathname === '/drinks';

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  return (
    <header className="header-container" id="cabecalho">
      <div>
        <Link to="/profile" onClick={ () => setShowSearch(false) }>
          <img
            data-testid="profile-top-btn"
            src="src/images/profileIcon.svg"
            alt="botao-de-perfil"
          />
        </Link>
      </div>
      <div>
        {searchVisible && (
          <button onClick={ handleSearchClick }>
            <img
              data-testid="search-top-btn"
              src="src/images/searchIcon.svg"
              alt="botao-pesquisar"

            />
          </button>
        )}
      </div>
      {showSearch && (
        <SearchBar />
      )}
      <p data-testid="page-title">
        {pageTitle}
      </p>
    </header>
  );
}

export default Header;
