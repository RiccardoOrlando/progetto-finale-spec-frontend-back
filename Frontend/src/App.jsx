import React from "react";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import HomePage from "../pages/HomePage";


function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active-link nav-link" : "nav-link"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/comparatore"
          className={({ isActive }) =>
            isActive ? "active-link nav-link" : "nav-link"
          }
        >
          Comparatore
        </NavLink>
        <NavLink
          to="/Preferiti"
          className={({ isActive }) =>
            isActive ? "active-link nav-link" : "nav-link"
          }
        >
          Preferiti
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/about" element={<h1>About Page</h1>} />
        <Route path="/contact" element={<h1>Contact Page</h1>} />
        <Route path="/users" element={<h1>Users Page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
