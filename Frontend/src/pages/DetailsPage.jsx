import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function DetailsPage() {
  const [singleProduct, setSingleProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/softwares/${id}`);
        const data = await response.json();
        setSingleProduct(data.software);
      } catch (error) {
        console.error("Errore nel caricamento del prodotto:", error);
      }
    };

    fetchSingleProduct();
  }, [id]);

  if (!singleProduct) {
    return <div className="loading">Caricamento...</div>;
  }

  return (
    <div className="details-container">
      <div className="details-card">
        {singleProduct.title && <h1 className="details-title">{singleProduct.title}</h1>}
        {singleProduct.category && <p><span className="details-label">Categoria:</span> {singleProduct.category}</p>}
        {singleProduct.brand && <p><span className="details-label">Brand:</span> {singleProduct.brand}</p>}
        {singleProduct.price !== undefined && <p><span className="details-label">Prezzo:</span> ${singleProduct.price}</p>}
        {singleProduct.platform && <p><span className="details-label">Piattaforma:</span> {singleProduct.platform}</p>}
        {singleProduct.releaseYear && <p><span className="details-label">Anno di rilascio:</span> {singleProduct.releaseYear}</p>}
        {singleProduct.subscription !== undefined && <p><span className="details-label">Subscription:</span> {singleProduct.subscription ? "Sì" : "No"}</p>}
        {singleProduct.rating !== undefined && <p><span className="details-label">Rating:</span> {singleProduct.rating} / 5</p>}
      </div>
    </div>
  );
}
