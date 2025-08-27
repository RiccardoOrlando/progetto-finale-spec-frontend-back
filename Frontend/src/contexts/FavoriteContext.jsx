import { createContext, useState, useContext, useEffect } from "react";
import '../css/headerNav.css'
import '../css/Card.css'
import '../css/Button.css'
import '../css/ComparePage.css'
import '../css/BestSoftware.css'


const FavoriteContext = createContext();

export const useFavoriteContext = () => useContext(FavoriteContext);

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    setIsMounted(true);
  }, []);


  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites, isMounted]);

  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorited = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorited,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};
