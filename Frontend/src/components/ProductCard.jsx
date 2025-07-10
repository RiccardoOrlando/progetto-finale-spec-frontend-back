import React from "react";
import { Link } from "react-router-dom";
import { useCompare } from "../context/CompareContext";
import { useFavorites } from "../context/FavoritesContext";

export default function ProductCard({ product }) {
  const { selectedProducts, handleProductSelect } = useCompare();
  const { toggleFavorite, isFavorite } = useFavorites();

  const isSelected = selectedProducts.some(
    (p) => p.id === product.id && p.category === product.category
  );

  // Controlla se il prodotto è preferito
  const isProductFavorite = isFavorite(product.id, product.category);

  return (
    <div className="product-card">
      <Link
        to={`/${product.category.toLowerCase()}s/${product.id}`}
        className="product-link"
      >
        <img src={product.image} alt={product.title} className="product-image" />
        <h2>
          {product.title}{" "}
          <button
            onClick={(e) => {
              e.preventDefault(); // evita apertura link cliccando cuore
              toggleFavorite(product.id, product.category);
            }}
            className={`favorite-button ${isProductFavorite ? 'favorited' : 'not-favorited'}`}
            aria-label={isProductFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
          >
            ♥
          </button>
        </h2>
        <p>Category: {product.category}</p>
        <p>Price: {product.price}€</p>
      </Link>
      <button
        className="bottone-comparatore"
        onClick={() => handleProductSelect(product)}
      >
        {isSelected ? "deseleziona" : "Confronta"}
      </button>
    </div>
  );
}