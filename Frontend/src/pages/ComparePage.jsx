import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCompare } from "../hooks/useCompare";
import Header from "../components/Header";
import { NavLink } from "react-router-dom";
import { useFavoriteContext } from "../contexts/FavoriteContext";

export default function ComparePage() {
  const { compareList, toggleCompare, clearCompare } = useCompare();
  const { isFavorited, addToFavorites, removeFromFavorites, favorites } =
    useFavoriteContext();

  const [fullProducts, setFullProducts] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const products = await Promise.all(
        compareList.map(async (s) => {
          const res = await fetch(`http://localhost:3001/softwares/${s.id}`);
          const data = await res.json();
          return data.software;
        })
      );
      setFullProducts(products);
    };

    if (compareList.length > 0) fetchAll();
  }, [compareList]);

  const getBestSoftware = () => {
    if (fullProducts.length === 0) return null;
    return fullProducts.reduce((best, current) => {
      const bestRating = parseFloat(best.rating) || 0;
      const currentRating = parseFloat(current.rating) || 0;
      return currentRating > bestRating ? current : best;
    });
  };

  const bestSoftware = getBestSoftware();

  if (compareList.length === 0) {
    return (
      <div className="container">
        <Header />
        <div className="compare-empty">
          <h2>Nessun software da confrontare</h2>
          <p>Aggiungi dei software al confronto dalla homepage per iniziare</p>
          <Link to="/" className="back-button">
            Torna alla Homepage
          </Link>
        </div>
      </div>
    );
  }

  const categoryName = compareList[0]?.category || "";

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

      <div className="compare-header">
        <div>
          <h1>Confronto Software ({compareList.length}/3)</h1>
          <p className="category-info">
            Categoria: <strong>{categoryName}</strong>
          </p>
        </div>
        <div className="compare-actions">
          <button onClick={clearCompare} className="clear-button">
            Svuota confronto
          </button>
        </div>
      </div>

      {bestSoftware && fullProducts.length > 1 && (
        <div className="best-software-section">
          <div className="best-software-badge">
            <h2>🏆 Miglior Software</h2>
            <div className="best-software-card">
              <h3>{bestSoftware.title}</h3>
              <div className="best-rating">
                ⭐ {bestSoftware.rating}/5 - Il punteggio più alto!
              </div>
              <Link
                to={`/detailsproduct/${bestSoftware.id}`}
                className="best-details-button"
              >
                Vedi dettagli del vincitore
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="compare-container">
        {fullProducts.map((software) => {
          const favorite = isFavorited(software.id);
          return (
            <div
              key={software.id}
              className={`compare-card ${
                bestSoftware && software.id === bestSoftware.id
                  ? "winner-card"
                  : ""
              }`}
            >
              <div className="compare-card-header">
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
                <button
                  onClick={() => toggleCompare(software)}
                  className="remove-button"
                  title="Rimuovi dal confronto"
                >
                  ✕
                </button>
              </div>

              <div className="compare-card-content">
                <div className="compare-field">
                  <h3>
                    {software.title}
                    {bestSoftware && software.id === bestSoftware.id && (
                      <span className="winner-badge">👑 Vincitore</span>
                    )}
                  </h3>
                </div>
                <div className="compare-field">
                  <strong>Categoria:</strong> <span>{software.category}</span>
                </div>
                <div className="compare-field">
                  <strong>Brand:</strong> <span>{software.brand}</span>
                </div>
                <div className="compare-field">
                  <strong>Prezzo:</strong> <span>{software.price} €</span>
                </div>
                <div className="compare-field">
                  <strong>Piattaforma:</strong> <span>{software.platform}</span>
                </div>
                <div className="compare-field">
                  <strong>Anno di rilascio:</strong>{" "}
                  <span>{software.releaseYear}</span>
                </div>
                <div className="compare-field">
                  <strong>Abbonamento:</strong>{" "}
                  <span>{software.subscription ? "Sì" : "No"}</span>
                </div>
                <div className="compare-field rating-field">
                  <strong>Valutazione:</strong>{" "}
                  <span className="rating-display">
                    ⭐ {software.rating}/5
                    {bestSoftware && software.id === bestSoftware.id && (
                      <span className="rating-best"> - Il migliore!</span>
                    )}
                  </span>
                </div>
                <div className="compare-field">
                  <strong>Creato il:</strong>{" "}
                  <span>
                    {new Date(software.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="compare-field">
                  <strong>Aggiornato il:</strong>{" "}
                  <span>
                    {new Date(software.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="compare-card-footer">
                <Link
                  to={`/detailsproduct/${software.id}`}
                  className="details-button"
                >
                  Vedi dettagli
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {compareList.length < 3 && (
        <div className="add-more">
          <p>
            Puoi aggiungere ancora {3 - compareList.length} software della
            categoria <strong>{categoryName}</strong>
          </p>
          <Link to="/" className="add-more-button">
            Aggiungi altri software
          </Link>
        </div>
      )}
    </div>
  );
}
