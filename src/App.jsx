// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Inicio from './pages/inicio/Inicio';
import Deforestacion from './pages/problemas/Deforestacion';
import Solucion from './pages/problemas/solucExperience/Solucion'
import PlantTreesScene from './pages/quiz/PlantTrees';
import Gallery from './pages/problemas/Gallery';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/Deforestacion" element={<Deforestacion />} />
        <Route path="/Galeria" element={<Gallery />} />
        <Route path="/Solucion" element={<Solucion />} />
        <Route path='/Quiz' element={<PlantTreesScene />} />
      </Routes>
    </Router>
  );
}

export default App;
