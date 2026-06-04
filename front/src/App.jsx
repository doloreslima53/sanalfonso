import { Routes, Route } from 'react-router-dom';
import Navbar      from './components/Navbar';
import Home        from './pages/Home';
import Residentes  from './pages/Residentes';
import Personal    from './pages/Personal';
import Actividades from './pages/Actividades';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"                    element={<Home />} />
        <Route path="/admin/residentes"    element={<Residentes />} />
        <Route path="/admin/personal"      element={<Personal />} />
        <Route path="/admin/actividades"   element={<Actividades />} />
      </Routes>
    </>
  );
}
