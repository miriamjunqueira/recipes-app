import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  function handleDrink(event: any) {
    event.preventDefault();
    navigate('/drinks');
  }

  function handleFood(event: any) {
    event.preventDefault();
    navigate('/meals');
  }

  return (
    <footer data-testid="footer">
      <form>
        <button
          onClick={ handleDrink }
          data-testid="drinks-btn"
        >
          <img
            data-testid="drinks-bottom-btn"
            src="src/images/drinkIcon.svg"
            alt="botao-de-bebidas"
          />
        </button>
        <button
          onClick={ handleFood }
          data-testid="foods-btn"
        >
          <img
            data-testid="meals-bottom-btn"
            src="src/images/mealIcon.svg"
            alt="botao-de-comidas"
          />
        </button>
      </form>
    </footer>
  );
}

export default Footer;
