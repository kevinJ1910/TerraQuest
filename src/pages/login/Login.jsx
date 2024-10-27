import "./Login.css";
import { useCallback, useEffect, useState } from "react";
import useAuthStore from "../../stores/use-auth-store";
import UserDAO from "../../daos/UserDAO";
import { useNavigate } from "react-router-dom";

/**
 * Login is a component that handles user authentication via Google sign-in.
 * It displays different content based on the authentication status of the user.
 */
const Login = () => {
  // Destructure authentication-related properties and methods from the Zustand store.
  const { user, loginGoogleWithPopUp, logout, observeAuthState, loading, error } = useAuthStore();

  // Hook for programmatic navigation.
  const navigate = useNavigate();

  // State to manage the visibility of an error message if login fails.
  const [showError, setShowError] = useState(false);

  /**
   * useEffect to observe authentication state changes when the component mounts.
   * It ensures the authentication state is kept in sync.
   */
  useEffect(() => {
    observeAuthState();
  }, [observeAuthState]);

  /**
   * useEffect to handle side effects when the `user` state changes.
   * If the user is authenticated, their details are saved to the database,
   * and the user is redirected to the "World" page.
   */
  useEffect(() => {
    if (user) {
      const newUser = {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
      };
      UserDAO.createUser(newUser); // Save the user's details to the database.
      navigate(); // Redirect to the World page.
    }
  }, [user, navigate]);

  /**
   * handleLogin is a function that triggers Google login when called.
   * It uses `useCallback` to optimize performance by memoizing the function.
   */
  const handleLogin = useCallback(async () => {
    try {
      await loginGoogleWithPopUp();
    } catch (err) {
      setShowError(true); // Show an error message if the login fails.
    }
  }, [loginGoogleWithPopUp]);

  /**
   * handleLogout is a function that triggers the logout process.
   * It is also memoized using `useCallback` for performance optimization.
   */
  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  // Render a loading screen if the authentication state is still being determined.
  if (loading) {
    return (
      <div className="loading-container">
        <p className="loading-text">Cargando...</p>
      </div>
    );
  }

  // Render the login UI, or a welcome message with logout option if the user is authenticated.
  return (
    <div className="container-login">
      <div className="container-title">
        <img src="src/assets/images/logo.jpg" alt="Logo TerraQuest" />
        <h1>TerraQuest</h1>
      </div>
      
      <div className="box">
        {showError && (
          <p className="error-text">
            Hubo un error al iniciar sesión. Por favor, inténtalo de nuevo.
          </p>
        )}
        {user ? (
          <>
            <h1 className="welcome-text">¡Hola, {user.displayName}!</h1>
            <button className="button-logout" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <div className="login-buttons">
            <h1 className="welcome-message">¡Bienvenido!</h1>
            <h3 className="welcome-message">Inicia sesion con Google</h3>
            <button className="button-login" onClick={handleLogin}>
              Iniciar sesión
            </button>
            {error && <p className="error-text">Error: {error.message}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
