import { useCompare } from "../context/CompareContext";
import React, { useEffect, useState } from "react";

export default function ComparatorPage() {
  const { selectedProducts } = useCompare();
  const [detailedProducts, setDetailedProducts] = useState([]);

  useEffect(() => {
  async function fetchDetails() {
    const fetched = await Promise.all(
      selectedProducts.map(async (p) => {
        try {
          const res = await fetch(`http://localhost:3001/${p.category.toLowerCase()}s/${p.id}`);
          const data = await res.json();
          return data[p.category.toLowerCase()];
        } catch (error) {
          console.error("Errore nel fetch:", error);
          return null;
        }
      })
    );

    // Filtra eventuali null
    setDetailedProducts(fetched);
  }

  fetchDetails();
}, [selectedProducts]);


  if (selectedProducts.length === 0) {
    return (
      <div className="comparator-container">
        <h1>Prodotti selezionati per il confronto</h1>
        <p>Nessun prodotto selezionato.</p>
      </div>
    );
  }

return (
<div className="compare-container">
  <h1>Prodotti selezionati per il confronto</h1>

  {detailedProducts.length === 0 ? (
    <p>Nessun prodotto selezionato.</p>
  ) : (
    <div className="compare-cards">
      {detailedProducts.map((product) => (
          <div key={`${product.category}-${product.id}`} className="product-card">
      <h2 className="product-title">{product.title}</h2>
      
      <div className="product-info">
        {product.category && (
          <div className="info-row">
            <span className="label">Categoria:</span>
            <span className="value">{product.category}</span>
          </div>
        )}
        
        {product.price && (
          <div className="info-row">
            <span className="label">Prezzo:</span>
            <span className="value">{product.price}€</span>
          </div>
        )}
        
        {product.brand && (
          <div className="info-row">
            <span className="label">Brand:</span>
            <span className="value">{product.brand}</span>
          </div>
        )}
        
        {product.model && (
          <div className="info-row">
            <span className="label">Model:</span>
            <span className="value">{product.model}</span>
          </div>
        )}

        {/* Proprietà GPU */}
        {product.vramGB && (
          <div className="info-row">
            <span className="label">VRAM:</span>
            <span className="value">{product.vramGB} GB</span>
          </div>
        )}
        
        {product.dedicated !== undefined && (
          <div className="info-row">
            <span className="label">Dedicata:</span>
            <span className={`value ${product.dedicated ? 'yes' : 'no'}`}>
              {product.dedicated ? "Sì" : "No"}
            </span>
          </div>
        )}

        {/* Proprietà CPU */}
        {product.cores && (
          <div className="info-row">
            <span className="label">Cores:</span>
            <span className="value">{product.cores}</span>
          </div>
        )}
        
        {product.threads && (
          <div className="info-row">
            <span className="label">Threads:</span>
            <span className="value">{product.threads}</span>
          </div>
        )}
        
        {product.baseClockGHz && (
          <div className="info-row">
            <span className="label">Base Clock:</span>
            <span className="value">{product.baseClockGHz} GHz</span>
          </div>
        )}
        
        {product.turboClockGHz && (
          <div className="info-row">
            <span className="label">Turbo Clock:</span>
            <span className="value">{product.turboClockGHz} GHz</span>
          </div>
        )}

        {/* Proprietà Screen */}
        {product.sizeInches && (
          <div className="info-row">
            <span className="label">Dimensione:</span>
            <span className="value">{product.sizeInches}"</span>
          </div>
        )}
        
        {product.resolution && (
          <div className="info-row">
            <span className="label">Risoluzione:</span>
            <span className="value">{product.resolution}</span>
          </div>
        )}
        
        {product.refreshRateHz && (
          <div className="info-row">
            <span className="label">Refresh Rate:</span>
            <span className="value">{product.refreshRateHz} Hz</span>
          </div>
        )}
        
        {product.panelType && (
          <div className="info-row">
            <span className="label">Tipo Pannello:</span>
            <span className="value">{product.panelType}</span>
          </div>
        )}

        {/* Proprietà Peripheral */}
        {product.type && (
          <div className="info-row">
            <span className="label">Tipo:</span>
            <span className="value">{product.type}</span>
          </div>
        )}
        
        {product.wireless !== undefined && (
          <div className="info-row">
            <span className="label">Wireless:</span>
            <span className={`value ${product.wireless ? 'yes' : 'no'}`}>
              {product.wireless ? "Sì" : "No"}
            </span>
          </div>
        )}

        {/* Proprietà Storage */}
        {product.capacityGB && (
          <div className="info-row">
            <span className="label">Capacità:</span>
            <span className="value">{product.capacityGB} GB</span>
          </div>
        )}
      </div>

      {/* CPU */}
      {product.cpu && (
        <div className="section">
          <h3 className="section-title">CPU</h3>
          <div className="section-content">
            <div className="info-row">
              <span className="label">Title:</span>
              <span className="value">{product.cpu.title}</span>
            </div>
            <div className="info-row">
              <span className="label">Brand:</span>
              <span className="value">{product.cpu.brand}</span>
            </div>
            <div className="info-row">
              <span className="label">Cores:</span>
              <span className="value">{product.cpu.cores}</span>
            </div>
            <div className="info-row">
              <span className="label">Threads:</span>
              <span className="value">{product.cpu.threads}</span>
            </div>
            <div className="info-row">
              <span className="label">Base Clock:</span>
              <span className="value">{product.cpu.baseClockGHz} GHz</span>
            </div>
            <div className="info-row">
              <span className="label">Turbo Clock:</span>
              <span className="value">{product.cpu.turboClockGHz} GHz</span>
            </div>
          </div>
        </div>
      )}

      {/* GPU */}
      {product.gpu && (
        <div className="section">
          <h3 className="section-title">GPU</h3>
          <div className="section-content">
            <div className="info-row">
              <span className="label">Title:</span>
              <span className="value">{product.gpu.title}</span>
            </div>
            <div className="info-row">
              <span className="label">Brand:</span>
              <span className="value">{product.gpu.brand}</span>
            </div>
            <div className="info-row">
              <span className="label">VRAM:</span>
              <span className="value">{product.gpu.vramGB} GB</span>
            </div>
            <div className="info-row">
              <span className="label">Dedicated:</span>
              <span className={`value ${product.gpu.dedicated ? 'yes' : 'no'}`}>
                {product.gpu.dedicated ? "Sì" : "No"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Storage */}
      {product.storage && product.storage.length > 0 && (
        <div className="section">
          <h3 className="section-title">Storage</h3>
          <div className="section-content">
            {product.storage.map((storageItem) => (
              <div key={storageItem.id} className="storage-item">
                <div className="info-row">
                  <span className="label">Title:</span>
                  <span className="value">{storageItem.title}</span>
                </div>
                <div className="info-row">
                  <span className="label">Tipo:</span>
                  <span className="value">{storageItem.type}</span>
                </div>
                <div className="info-row">
                  <span className="label">Capacità:</span>
                  <span className="value">{storageItem.capacityGB} GB</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Screen */}
      {product.screen && (
        <div className="section">
          <h3 className="section-title">Screen</h3>
          <div className="section-content">
            <div className="info-row">
              <span className="label">Title:</span>
              <span className="value">{product.screen.title}</span>
            </div>
            <div className="info-row">
              <span className="label">Dimensione:</span>
              <span className="value">{product.screen.sizeInches}"</span>
            </div>
            <div className="info-row">
              <span className="label">Risoluzione:</span>
              <span className="value">{product.screen.resolution}</span>
            </div>
            <div className="info-row">
              <span className="label">Refresh Rate:</span>
              <span className="value">{product.screen.refreshRateHz} Hz</span>
            </div>
            <div className="info-row">
              <span className="label">Tipo Pannello:</span>
              <span className="value">{product.screen.panelType}</span>
            </div>
          </div>
        </div>
      )}

      {/* Peripheral */}
      {product.peripheral && (
        <div className="section">
          <h3 className="section-title">Peripheral</h3>
          <div className="section-content">
            <div className="info-row">
              <span className="label">Title:</span>
              <span className="value">{product.title}</span>
            </div>
            <div className="info-row">
              <span className="label">Brand:</span>
              <span className="value">{product.brand}</span>
            </div>
            <div className="info-row">
              <span className="label">Tipo:</span>
              <span className="value">{product.type}</span>
            </div>
            <div className="info-row">
              <span className="label">Wireless:</span>
              <span className={`value ${product.wireless ? 'yes' : 'no'}`}>
                {product.wireless ? "Sì" : "No"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
      ))}
    </div>
  )}
</div>
);

}
