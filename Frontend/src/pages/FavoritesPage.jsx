import React, { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";

export default function FavoritesPage() {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("Favorites dal context:", favorites);
    
    const fetchFavoriteProducts = async () => {
      if (favorites.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const productPromises = favorites.map(async (fav) => {
          console.log("Fetching prodotto:", fav);
          
          // Converti category in formato plurale minuscolo per l'URL
          const categoryForUrl = fav.category.toLowerCase() + 's';
          const url = `http://localhost:3001/${categoryForUrl}/${fav.id}`;
          console.log("URL chiamata:", url);
          
          const res = await fetch(url);
          const data = await res.json();
          console.log("Risposta API:", data);
          
          // Converti category in formato singolare minuscolo per la chiave
          const singular = fav.category.toLowerCase();

          
          return data[singular];
        });

        const products = await Promise.all(productPromises);
        console.log("Prodotti caricati:", products);
        setFavoriteProducts(products.filter(Boolean)); // Filtra eventuali null/undefined
      } catch (err) {
        console.error("Errore nel fetch dei preferiti:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteProducts();
  }, [favorites]);

  if (loading) return <p>Caricamento...</p>;
  if (error) return <p>Errore nel caricamento dei preferiti.</p>;

  if (favorites.length === 0) {
    return (
      <div>
        <h1>I tuoi preferiti</h1>
        <p>Nessun preferito salvato.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>I tuoi preferiti</h1>

      
      {/* Bottone per svuotare tutti i preferiti */}
      <button 
        onClick={clearFavorites}
        className="clear-favorites-btn"
      >
        Svuota tutti i preferiti
      </button>

      {favoriteProducts.map((product) => (
        <div
          key={`${product.category}-${product.id}`}
          className="favorite-product-card"
        >
          <div className="product-detail">
            <h2>{product.title}</h2>
            <p><strong>Categoria:</strong> {product.category}</p>
            <p><strong>Prezzo:</strong> {product.price}€</p>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Model:</strong> {product.model}</p>

            {/* Proprietà specifiche per CPU */}
            {product.cores && <p><strong>Cores:</strong> {product.cores}</p>}
            {product.threads && <p><strong>Threads:</strong> {product.threads}</p>}
            {product.baseClockGHz && <p><strong>Clock base:</strong> {product.baseClockGHz} GHz</p>}
            {product.turboClockGHz && <p><strong>Turbo clock:</strong> {product.turboClockGHz} GHz</p>}
            
            {/* Proprietà specifiche per GPU */}
            {product.vramGB && <p><strong>VRAM:</strong> {product.vramGB} GB</p>}
            {product.dedicated !== undefined && (
              <p><strong>Dedicated:</strong> {product.dedicated ? "Sì" : "No"}</p>
            )}

            {/* Proprietà specifiche per Storage */}
            {product.capacityGB && <p><strong>Capacità:</strong> {product.capacityGB} GB</p>}
            {product.type && <p><strong>Tipo:</strong> {product.type}</p>}

            {/* Proprietà specifiche per Schermi */}
            {product.sizeInches && <p><strong>Dimensione:</strong> {product.sizeInches}"</p>}
            {product.resolution && <p><strong>Risoluzione:</strong> {product.resolution}</p>}
            {product.refreshRateHz && <p><strong>Refresh Rate:</strong> {product.refreshRateHz} Hz</p>}
            {product.panelType && <p><strong>Tipo Pannello:</strong> {product.panelType}</p>}

            {/* Proprietà specifiche per Periferiche */}
            {product.wireless !== undefined && (
              <p><strong>Wireless:</strong> {product.wireless ? "Sì" : "No"}</p>
            )}

            {/* Proprietà specifiche per Laptop */}
            {product.ramGB && <p><strong>RAM:</strong> {product.ramGB} GB</p>}

            {/* CPU nested (per laptop) */}
            {product.cpu && (
              <div>
                <h4>CPU:</h4>
                <p><strong>Title:</strong> {product.cpu.title}</p>
                <p><strong>Brand:</strong> {product.cpu.brand}</p>
                <p><strong>Cores:</strong> {product.cpu.cores}</p>
                <p><strong>Threads:</strong> {product.cpu.threads}</p>
                <p><strong>Base Clock:</strong> {product.cpu.baseClockGHz} GHz</p>
                <p><strong>Turbo Clock:</strong> {product.cpu.turboClockGHz} GHz</p>
              </div>
            )}

            {/* GPU nested (per laptop) */}
            {product.gpu && (
              <div>
                <h4>GPU:</h4>
                <p><strong>Title:</strong> {product.gpu.title}</p>
                <p><strong>Brand:</strong> {product.gpu.brand}</p>
                <p><strong>VRAM:</strong> {product.gpu.vramGB} GB</p>
                <p><strong>Dedicated:</strong> {product.gpu.dedicated ? "Sì" : "No"}</p>
              </div>
            )}

            {/* Storage nested (per laptop) */}
            {product.storage && product.storage.length > 0 && (
              <div>
                <h4>Storage:</h4>
                {product.storage.map((storageItem, index) => (
                  <div key={`storage-${index}`}>
                    <p><strong>Title:</strong> {storageItem.title}</p>
                    <p><strong>Tipo:</strong> {storageItem.type}</p>
                    <p><strong>Capacità:</strong> {storageItem.capacityGB} GB</p>
                  </div>
                ))}
              </div>
            )}

            {/* Screen nested (per laptop) */}
            {product.screen && (
              <div>
                <h4>Screen:</h4>
                <p><strong>Title:</strong> {product.screen.title}</p>
                <p><strong>Dimensione:</strong> {product.screen.sizeInches}"</p>
                <p><strong>Risoluzione:</strong> {product.screen.resolution}</p>
                <p><strong>Refresh Rate:</strong> {product.screen.refreshRateHz} Hz</p>
                <p><strong>Tipo Pannello:</strong> {product.screen.panelType}</p>
              </div>
            )}
          </div>
          
          {/* Bottone per rimuovere singolo preferito */}
          <button 
            onClick={() => removeFavorite(product.id, product.category)}
            className="remove-favorite-btn"
          >
            Rimuovi dai preferiti
          </button>
        </div>
      ))}
    </div>
  );
}