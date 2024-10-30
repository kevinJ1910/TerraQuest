import "./Login.css";
import { useCallback, useEffect, useState, useRef } from "react";
import useAuthStore from "../../stores/use-auth-store";
import UserDAO from "../../daos/UserDAO";
import { useNavigate } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import {useGLTF, Text3D, Center } from "@react-three/drei";
import { Box } from "@react-three/drei";
import LoginControls from "../controls/LoginControls";
import LoginText from "./text/LoginText";
import Logo from "./logo/Logo";
/**
 * Componente que representa un modelo 3D de un bosque giratorio en la pantalla de login.
 */
function LoginForest() {
  // Carga el modelo 3D del bosque usando GLTF.
  const { scene } = useGLTF('models-3d/forest_scene.glb');
  const modelRef = useRef();

  // Aplica una rotación constante al modelo en el eje Y para crear un efecto de giro.
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.003;
    }
  });

  // Renderiza el modelo en el canvas 3D.
  return <primitive ref={modelRef} position={[0, -80, 0]} object={scene} scale={0.5} />;
}

/**
 * Componente que representa un botón 3D interactivo para iniciar sesión con Google.
 */
function LoginButton3D({ onClick }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Cambia el cursor del cuerpo al estilo de puntero cuando se hace hover sobre el botón.
  useEffect(() => {
    if (hovered) {
      document.body.classList.add('cursor-pointer');
    } else {
      document.body.classList.remove('cursor-pointer');
    }
    // Limpia el efecto al desmontar el componente.
    return () => document.body.classList.remove('cursor-pointer');
  }, [hovered]);

  // Aplica animaciones de rotación y escala al botón en función del estado de hover.
  useFrame((state) => {
    if (groupRef.current) {
      const cameraPosition = state.camera.position;
      groupRef.current.lookAt(cameraPosition); // Hace que el botón mire a la cámara.

      // Animación de balanceo.
      groupRef.current.rotation.z += Math.sin(state.clock.getElapsedTime() * 2) * 0.05;

      // Cambia el tamaño del botón en función de si está siendo hoverado.
      if (hovered) {
        groupRef.current.scale.set(1.1, 1.1, 1.1);
      } else {
        groupRef.current.scale.set(1, 1, 1);
      }
    }
  });

  return (
    <group 
      ref={groupRef}
      position={[0, -5, 150]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Fondo del botón */}
      <Box args={[220, 30, 5]} onClick={onClick} position={[0, 0, 0]}>
        <meshStandardMaterial color="blue" transparent opacity={0.7} />
      </Box>

      {/* Texto del botón */}
      <Center position={[0, 0, 3]}>
        <Text3D
          size={15}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="fonts/Farek.json"
          height={3}
        >
          Acceder con Google
          <meshStandardMaterial />
        </Text3D>
      </Center>
    </group>
  );
}

/**
 * Componente principal de la pantalla de login.
 */
const Login = () => {
  // Obtiene los datos y funciones de autenticación del store.
  const { user, loginGoogleWithPopUp, observeAuthState, loading, error } = useAuthStore();
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);

  // Observa el estado de autenticación al cargar el componente.
  useEffect(() => {
    observeAuthState();
  }, [observeAuthState]);

  // Redirige al usuario al inicio si está autenticado.
  useEffect(() => {
    if (user) {
      const newUser = {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
      };
      UserDAO.createUser(newUser); // Guarda la información del usuario en la base de datos.
      navigate("/Inicio");
    }
  }, [user, navigate]);

  // Maneja el inicio de sesión con Google.
  const handleLogin = useCallback(async () => {
    try {
      await loginGoogleWithPopUp();
    } catch (err) {
      setShowError(true); // Muestra un mensaje de error si el login falla.
    }
  }, [loginGoogleWithPopUp]);

  // Muestra un indicador de carga mientras el estado de autenticación está siendo verificado.
  if (loading) {
    return (
      <div className="loading-container">
        <p className="loading-text">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="container-login">
      {/* Mensaje de error en caso de fallo en el inicio de sesión */}
      {showError && (
        <p className="error-text">
          Hubo un error al iniciar sesión. Por favor, inténtalo de nuevo.
        </p>
      )}
      
      {/* Si no hay usuario autenticado, muestra el Canvas 3D con el botón de login y otros elementos */}
      {!user && (
        <>
          <Canvas camera={{ position: [0, 50, 370], fov: 75 }}>
            <LoginControls />
            <ambientLight />
            <directionalLight position={[0, 10, 5]} />
            <LoginForest />
            <LoginButton3D onClick={handleLogin} />
            <LoginText />
            <Logo />
          </Canvas>
          
          {/* Mensaje de error en caso de algún otro error */}
          {error && <p className="error-text">Error: {error.message}</p>}
        </>
      )}
    </div>
  );
};

export default Login;

// Precarga el modelo 3D del bosque para mejorar el rendimiento.
useGLTF.preload('models-3d/forest_scene.glb');