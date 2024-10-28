import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App"; // Importa App en lugar de configurar rutas aquí

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App /> {/* Renderiza el componente principal App */}
  </StrictMode>
);
