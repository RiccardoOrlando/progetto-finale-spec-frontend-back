import Header from "../components/Header";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCaategory] = useState("");

  return (
    <div className="header-container">
      <Header />
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          HomePage
        </NavLink>
        <NavLink
          to="/comparatore"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Comparatore
        </NavLink>
        <NavLink
          to="/preferiti"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Preferiti
        </NavLink>
      </nav>
      <div className="input-box">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select>
          <option value="">Grafica</option>
          <option value="">Video Editing</option>
          <option value="">Programmazione</option>
          <option value="">Musica</option>
          <option value="">Grafica</option>
        </select>
      </div>
    </div>
  );
}
