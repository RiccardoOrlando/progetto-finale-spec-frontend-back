import Header from "../components/Header";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import useFetchData from "../hooks/useFetchData";
import { useCompare } from "../hooks/useCompare";
import { useFavoriteContext } from "../contexts/FavoriteContext";
import sortItems from "../services/filters.js";
import { filterByCategory } from "../services/filters.js";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [order, setOrder] = useState("");

  const { isFavorited, addToFavorites, removeFromFavorites, favorites } =
    useFavoriteContext();

  const { isLoading, data } = useFetchData(search, category);
  const { compareList, toggleCompare, isInCompare, clearCompare } =
    useCompare();

  const sortedData = filterByCategory(sortItems(data, order), category);

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

      <div className="input-box">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Seleziona la Categoria</option>
          <option value="grafica">Grafica</option>
          <option value="Video Editing">Video Editing</option>
          <option value="programmazione">Programmazione</option>
          <option value="musica">Musica</option>
        </select>
        <select value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="" hidden>
            Ordine Alfabetico
          </option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
      </div>
      {isLoading ? (
        <div>Caricamento...</div>
      ) : (
        <div className="container-cards">
          {sortedData.map((software) => {
            const favorite = isFavorited(software.id);
            console.log(favorite);
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
                      if (favorite) {
                        removeFromFavorites(software.id);
                      } else {
                        addToFavorites(software);
                      }
                    }}
                    className={`heart-button ${favorite ? "active" : ""}`}
                    aria-label="Aggiungi ai preferiti"
                  >
                    ♥
                  </button>
                </div>

                <p>Categoria: {software.category}</p>

                {category && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleCompare(software);
                    }}
                    className="compare-button styled"
                  >
                    {isInCompare(software.id)
                      ? "Rimuovi dal confronto"
                      : "Confronta"}
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
