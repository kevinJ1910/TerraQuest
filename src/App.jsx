// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Inicio from './pages/inicio/Inicio';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Inicio" element={<Inicio />} />
      </Routes>
    </Router>
  );
}

export default App;
