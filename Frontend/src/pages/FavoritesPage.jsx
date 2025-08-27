import React from "react";
import Header from "../components/Header";
import { Link, NavLink } from "react-router-dom";
import { useFavoriteContext } from "../contexts/FavoriteContext";
import { useCompare } from "../hooks/useCompare";

export default function FavoritesPage() {
  const { favorites, isFavorited, removeFromFavorites, addToFavorites } = useFavoriteContext();
  const { compareList, toggleCompare, isInCompare } = useCompare();

  return (
    <div className="container">
      <Header />
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          HomePage
        </NavLink>
        <NavLink
          to="/compare"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Comparatore ({compareList.length})
        </NavLink>
        <NavLink
          to="/preferiti"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Preferiti ({favorites.length})
        </NavLink>
      </nav>

      <h2>I tuoi preferiti</h2>

      {favorites.length === 0 ? (
        <p>Non hai ancora aggiunto software ai preferiti.</p>
      ) : (
        <div className="container-cards">
          {favorites.map((software) => {
            const favorite = isFavorited(software.id);
            const inCompare = isInCompare(software.id);

            return (
              <Link
                key={software.id}
                to={`/detailsproduct/${software.id}`}
                className="card"
              >
                <div className="card-header">
                  <h3>{software.title}</h3>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (removeFromFavorites && addToFavorites) {
                        if (favorite) {
                          removeFromFavorites(software.id);
                        } else {
                          addToFavorites(software);
                        }
                      }
                    }}
                    className={`heart-button ${favorite ? "active" : ""}`}
                    aria-label="Aggiungi ai preferiti"
                  >
                    ♥
                  </button>
                </div>
                <p>Categoria: {software.category}</p>

                {inCompare !== undefined && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleCompare(software);
                    }}
                    className="compare-button styled"
                  >
                    {inCompare ? "Rimuovi dal confronto" : "Confronta"}
                  </button>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
