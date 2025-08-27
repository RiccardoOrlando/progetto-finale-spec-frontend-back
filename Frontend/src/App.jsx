import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import DetailsPage from "./pages/DetailsPage";
import { CompareProvider } from "./hooks/useCompare";
import ComparePage from "./pages/ComparePage";
import { FavoriteProvider } from "./contexts/FavoriteContext";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  return (
    <>
      <CompareProvider>
        <FavoriteProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/detailsproduct/:id" element={<DetailsPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/preferiti" element={<FavoritesPage />} />
          </Routes>
        </FavoriteProvider>
      </CompareProvider>
    </>
  );
}

export default App;
