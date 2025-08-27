import { createContext, useContext, useState } from "react";

// Crea il context
const CompareContext = createContext();

// Provider component
export function CompareProvider({ children }) {
  const [compareList, setCompareList] = useState([]);

  const toggleCompare = (software) => {
    const isAlreadyInList = compareList.find((item) => item.id === software.id);

    if (isAlreadyInList) {
      setCompareList(compareList.filter((item) => item.id !== software.id));
      console.log("Rimosso dal confronto:", software.title);
      return;
    }

    if (compareList.length >= 3) {
      alert("Massimo 3 software nel confronto");
      return;
    }

    if (compareList.length > 0) {
      const firstCategory = compareList[0].category;
      if (software.category !== firstCategory) {
        alert(`Non puoi confrontare software di categorie diverse!\nCategoria attuale nel confronto: ${firstCategory}\nCategoria del software selezionato: ${software.category}`);
        return;
      }
    }

    setCompareList([...compareList, software]);
    console.log("Aggiunto al confronto:", software.title);
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (softwareId) => {
    return compareList.find((item) => item.id === softwareId) ? true : false;
  };

  return (
    <CompareContext.Provider value={{ compareList, toggleCompare, isInCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
}


export function useCompare() {
  const context = useContext(CompareContext);
  
  if (!context) {
    throw new Error('useCompare deve essere usato dentro CompareProvider');
  }
  
  return context;
}

export default CompareContext;