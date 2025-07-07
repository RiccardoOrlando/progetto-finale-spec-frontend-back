import { useState, useEffect } from "react";

function useAllFetch(category, search) {
  const [cpus, setCpus] = useState([]);
  const [gpus, setGpus] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [peripherals, setPeripherals] = useState([]);
  const [screens, setScreens] = useState([]);
  const [storage, setStorage] = useState([]);

  // Funzione generica per fare fetch e aggiornare lo stato
  const fetchData = (endpoint, setter) => {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (search) params.append("search", search);

    fetch(`${endpoint}?${params.toString()}`)
      .then(res => {
        if (!res.ok) throw new Error(`Errore fetch ${endpoint}`);
        return res.json();
      })
      .then(data => setter(data))
      .catch(err => {
        console.error(err);
        setter([]); // resetto dati in caso di errore
      });
  };

  useEffect(() => {
    fetchData("http://localhost:3001/cpus", setCpus);
    fetchData("http://localhost:3001/gpus", setGpus);
    fetchData("http://localhost:3001/laptops", setLaptops);
    fetchData("http://localhost:3001/peripherals", setPeripherals);
    fetchData("http://localhost:3001/screens", setScreens);
    fetchData("http://localhost:3001/storages", setStorage);
  }, [category, search]); 

  return { cpus, gpus, laptops, peripherals, screens, storage };
}

export default useAllFetch;
