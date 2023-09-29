import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DrinksType, MealsType, MixedType } from '../../Context/UserContext';
import { fetchRecommendations } from '../../Services/API';
import './RecomendationCard.css';

export default function RecommendationCard() {
  const [recommendation, setRecommendation] = useState<MixedType[]>([]);
  const location = useLocation();
  const { pathname } = location;
  const urlForApi = pathname.includes('/meals') ? 'thecocktaildb' : 'themealdb';

  useEffect(() => {
    const getRecommendations = async () => {
      const recommendationsRecipes = await fetchRecommendations(urlForApi);
      setRecommendation(recommendationsRecipes);
    };
    getRecommendations();
  }, [urlForApi]);

  const isMealARecomedation = !!(recommendation.length > 0
    && recommendation !== null && Object.keys(recommendation[0]).includes('idMeal'));

  return (
    <div>
      <div className="carousel">
        {!isMealARecomedation && (
          (recommendation as DrinksType[]).map((rec, index) => (
            <div
              className="carousel-card"
              data-testid={ `${index}-recommendation-card` }
              key={ index }
            >
              <h3 data-testid={ `${index}-recommendation-title` }>
                {rec.strDrink}
              </h3>
              <img src={ rec.strDrinkThumb } alt={ rec.strDrink } width={ 80 } />
            </div>
          ))
        )}
      </div>
      <div className="carousel">
        {isMealARecomedation && (
          ((recommendation as MealsType[]).map((rec, index) => (
            <div
              className="carousel-card"
              data-testid={ `${index}-recommendation-card` }
              key={ index }
            >
              <h3 data-testid={ `${index}-recommendation-title` }>
                {rec.strMeal}
              </h3>
              <img src={ rec.strMealThumb } alt={ rec.strMeal } width={ 100 } />
            </div>
          )))
        )}
      </div>
    </div>
  );
}
