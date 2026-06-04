import { Routes, Route, Link } from "react-router-dom";
import Residentes from "./pages/Residentes";
import Personal from "./pages/Personal";
import Actividades from "./pages/Actividades";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <span className="navbar-brand">Geriátrico San Alfonso</span>
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/residentes">Residentes</Link></li>
          <li><Link to="/personal">Personal</Link></li>
          <li><Link to="/actividades">Actividades</Link></li>
        </ul>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/residentes" element={<Residentes />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/actividades" element={<Actividades />} />
        </Routes>
      </main>
    </div>
  );
}
