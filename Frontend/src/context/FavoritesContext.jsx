import React, { createContext, useContext, useState, useEffect } from 'react';

// Crea il Context
const FavoritesContext = createContext();

// Hook personalizzato per usare il Context
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites deve essere usato dentro FavoritesProvider');
  }
  return context;
}

// Provider che gestisce lo stato dei preferiti
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Carica i preferiti dal localStorage quando il componente si monta
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error("Errore nel caricamento dei preferiti:", error);
        setFavorites([]);
      }
    }
  }, []);

  // Funzione per aggiungere/rimuovere preferiti
  const toggleFavorite = (id, category) => {
    setFavorites(currentFavorites => {
      const isFav = currentFavorites.some(
        fav => fav.id === id && fav.category === category
      );
      
      let updated;
      if (isFav) {
        // Rimuovi dai preferiti
        updated = currentFavorites.filter(
          fav => !(fav.id === id && fav.category === category)
        );
      } else {
        // Aggiungi ai preferiti
        updated = [...currentFavorites, { id, category }];
      }
      
      // Salva nel localStorage
      localStorage.setItem("favorites", JSON.stringify(updated));
      
      return updated;
    });
  };

  // Funzione helper per controllare se un prodotto è preferito
  const isFavorite = (id, category) => {
    return favorites.some(fav => fav.id === id && fav.category === category);
  };

  // Funzione per rimuovere un preferito specifico (utile per la pagina preferiti)
  const removeFavorite = (id, category) => {
    setFavorites(currentFavorites => {
      const updated = currentFavorites.filter(
        fav => !(fav.id === id && fav.category === category)
      );
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  // Funzione per svuotare tutti i preferiti
  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      toggleFavorite, 
      isFavorite, 
      removeFavorite,
      clearFavorites 
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

