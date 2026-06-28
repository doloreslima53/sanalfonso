import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar      from './components/Navbar';
import Home        from './pages/Home';
import Residentes  from './pages/Residentes';
import Personal    from './pages/Personal';
import Actividades from './pages/Actividades';
import Panel       from './pages/Panel';

export default function App() {
  const { pathname } = useLocation();
  const hideNav = pathname.startsWith('/panel');

  return (
    <>
      {!hideNav && <Navbar />}
      <Routes>
        <Route path="/"                  element={<Home />} />
        <Route path="/admin/residentes"  element={<Residentes />} />
        <Route path="/admin/personal"    element={<Personal />} />
        <Route path="/admin/actividades" element={<Actividades />} />
        <Route path="/panel"             element={<Panel />} />
      </Routes>
    </>
  );
}
