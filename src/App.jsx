// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Inicio from './pages/inicio/Inicio';
import Deforestacion from './pages/problemas/Deforestacion';
import Erosion from './pages/problemas/Erosion';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/Deforestacion" element={<Deforestacion />} />
        <Route path="/Erosion_suelo" element={<Erosion />} />
      </Routes>
    </Router>
  );
}

export default App;
