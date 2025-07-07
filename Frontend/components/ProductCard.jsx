import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img
        src={product.image || "https://via.placeholder.com/300x200.png?text=Product+Image"}
        alt={product.title}
        className="product-image"
      />
      <h2>{product.title}</h2>
      <p>Category: {product.category}</p>
      <p>Price: {product.price}€</p>
    </div>
  );
}