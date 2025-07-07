import React, { useState } from "react";
import useAllFetch from "../hook/fetchData";
import { filterByCategory, sortItems } from "../utils/filters";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [order, setOrder] = useState("");

  const { cpus, gpus, laptops, peripherals, screens, storage } = useAllFetch(
    category,
    search
  );

  const processedCpus = sortItems(filterByCategory(cpus, category), order);
  const processedGpus = sortItems(filterByCategory(gpus, category), order);
  const processedLaptops = sortItems(
    filterByCategory(laptops, category),
    order
  );
  const processedPeripherals = sortItems(
    filterByCategory(peripherals, category),
    order
  );
  const processedScreens = sortItems(
    filterByCategory(screens, category),
    order
  );
  const processedStorage = sortItems(
    filterByCategory(storage, category),
    order
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
      <h1 class="title">Home Page</h1>
      <div class="form-container">
        <input
          type="text"
          placeholder="Search for a product"
          onChange={(e) => setSearch(e.target.value)}
          class="input"
        />

        <select
          name="filtro per categoria"
          defaultValue=""
          onChange={(e) => setCategory(e.target.value)}
          class="select"
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
          class="select"
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
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
