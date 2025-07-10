import React, { useState } from "react";
import useAllFetch from "../hook/fetchData";
import { filterByCategory, sortItems } from "../utils/filters";
import ProductCard from "../components/ProductCard";
import useDebounce from "../hook/useDebounce";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [order, setOrder] = useState("");

  const debouncedSearch = useDebounce(search, 600);
  const debounceOrder = useDebounce(order, 200);
  const debouncedCategory = useDebounce(category, 100);

  const { cpus, gpus, laptops, peripherals, screens, storage } = useAllFetch(
    debouncedCategory,
    debouncedSearch,
  );

  const processedCpus = sortItems(filterByCategory(cpus, category), debounceOrder);
  const processedGpus = sortItems(filterByCategory(gpus, category), debounceOrder);
  const processedLaptops = sortItems(
    filterByCategory(laptops, category),
    debounceOrder
  );
  const processedPeripherals = sortItems(
    filterByCategory(peripherals, category),
    debounceOrder
  );
  const processedScreens = sortItems(
    filterByCategory(screens, category),
    debounceOrder
  );
  const processedStorage = sortItems(
    filterByCategory(storage, category),
    debounceOrder
  );

  const products = [
    ...processedCpus,
    ...processedGpus,
    ...processedLaptops,
    ...processedPeripherals,
    ...processedScreens,
    ...processedStorage,
  ];

  return (
    <>
      <h1 className="title">Home Page</h1>
      <div className="form-container">
        <input
          type="text"
          placeholder="Search for a product"
          onChange={(e) => setSearch(e.target.value)}
          className="input"
        />

        <select
          name="filtro per categoria"
          defaultValue=""
          onChange={(e) => setCategory(e.target.value)}
          className="select"
        >
          <option value="" disabled hidden>
            Filtra per Categoria
          </option>
          <option value="cpu">CPU</option>
          <option value="gpu">GPU</option>
          <option value="laptop">Laptop</option>
          <option value="peripheral">Peripheral</option>
          <option value="screen">Screen</option>
          <option value="storage">Storage</option>
        </select>

        <select
          name="ordine alfabetico"
          defaultValue=""
          onChange={(e) => setOrder(e.target.value)}
          className="select"
        >
          <option value="" disabled hidden>
            Filtra per Ordine Alfabetico
          </option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>
      </div>
      <div className="products-container">
        {products.map((product) => (
          <ProductCard key={`${product.category}${product.id}`} product={product} />
        ))}
      </div>
    </>
  );
}
