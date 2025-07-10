import React, { createContext, useState, useContext } from "react";

const CompareContext = createContext();

export function CompareProvider({ children }) {
  const [selectedProducts, setSelectedProducts] = useState([]);

  function handleProductSelect(product) {
    const exists = selectedProducts.some(
      (p) => p.id === product.id && p.category === product.category
    );

    if (exists) {
      setSelectedProducts(
        selectedProducts.filter(
          (p) => p.id !== product.id || p.category !== product.category
        )
      );
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  }
  return (
    <CompareContext.Provider value={{ selectedProducts, handleProductSelect }}>
      {children}
    </CompareContext.Provider>
  );
}

// Hook per usare il context più facilmente
export function useCompare() {
  return useContext(CompareContext);
}
