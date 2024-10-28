import "./Header.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/use-auth-store";
import logo from "../../assets/images/logo.png";

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
        <div className="container-title">
          <img src={logo} alt="Logo" />
          <h1>Problemas Medioambientales Relacionados con la Tierra</h1>
          <h6>Bienvenido a TerraQuest, {user.displayName}</h6>
          {user ? (
            <button className="button-logout" onClick={logout}>Cerrar Sesión</button>
          ) : (Logeado)}
        </div>
      </div>
    );
  };
  
  export default Header;