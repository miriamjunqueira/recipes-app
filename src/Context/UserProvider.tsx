import { useEffect, useState } from 'react';
import UserContext from './UserContext';

type UserProviderProps = {
  children: React.ReactNode;
};

export default function UserProvider({ children }: UserProviderProps) {
  const [recipesAPI, setRecipesAPI] = useState([]);

  useEffect(() => {
    async function fetchRecipesAPI() {
      const URL_API = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken';
      const response = await fetch(URL_API);
      const { results } = await response.json();
      const recipes = results;
      return results;
    }
    fetchRecipesAPI();
  }, []);

  return (
    <UserContext.Provider value={ { recipesAPI } }>
      {children}
    </UserContext.Provider>
  );
}
