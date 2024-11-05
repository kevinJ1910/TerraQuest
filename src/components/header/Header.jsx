import "./Header.css";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../stores/use-auth-store";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Icono de "cerrar sesión"


const Header = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!user) {
        navigate("/"); // Redirige al login si no hay un usuario autenticado
      }
    }, [user, navigate]);
  
    if (!user) {
      return <p>Cargando...</p>;
    }
  
    return (
      <div className="inicio-container">
        <header className="container-header">
          <img src={logo} alt="Logo" />
          <nav>
            <ul>
              <li><Link to="/Inicio"> Inicio</Link></li>
              <li><Link to="/Deforestacion">Deforestacion</Link></li>
              <li><Link to="/Erosion_suelo">Erosion del Suelo</Link></li>
              <li><Link to="/Quiz">Quiz</Link></li>
            </ul>
          </nav>
          {user && (
            <button className="button-logout" onClick={logout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          )}
        </header>
      </div>
    );
    
    
  };
  
  export default Header;