import "./QuizHeader.css";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../stores/use-auth-store";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Icono de "cerrar sesión"
import useStore from "../../stores/use-quiz-store";


const QuizHeader = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const score = useStore((state) => state.score);
  
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
          <h1>TERRAQUEST</h1>
          <nav>
            <ul>
              <li><Link to="/Inicio"> Inicio</Link></li>
              <li><Link to="/Deforestacion">Deforestacion</Link></li>
              <li><Link to="/Galeria">Galeria</Link></li>
              <li><Link to="/Quiz">Quiz</Link></li>
            </ul>
          </nav>
          {user && (
            <button className="button-logout" onClick={logout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          )}
           <div className="score">Puntuación: {score}</div>
        </header>
      </div>
    );
    
    
  };
  
  export default QuizHeader;