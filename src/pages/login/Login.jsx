import "./Login.css";
import { useCallback, useEffect, useState, useRef } from "react";
import useAuthStore from "../../stores/use-auth-store";
import UserDAO from "../../daos/UserDAO";
import { useNavigate } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Text3D, Center, Plane } from "@react-three/drei";
import { Box } from "@react-three/drei";
import LoginControls from "../controls/LoginControls";
import LoginText from "./text/LoginText";
import Logo from "./logo/Logo";

function LoginForest() {
  const { scene } = useGLTF('models-3d/forest_scene.glb');
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.003;
    }
  });

  return <primitive ref={modelRef} position={[0, -80, 0]} object={scene} scale={0.5} />;
}

function LoginButton3D({ onClick }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) {
      document.body.classList.add('cursor-pointer');
    } else {
      document.body.classList.remove('cursor-pointer');
    }
    return () => document.body.classList.remove('cursor-pointer');
  }, [hovered]);

  useFrame((state) => {
    if (groupRef.current) {
      const cameraPosition = state.camera.position;
      groupRef.current.lookAt(cameraPosition);

      groupRef.current.rotation.z += Math.sin(state.clock.getElapsedTime() * 2) * 0.05;

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
      castShadow
    >
      <Box args={[220, 30, 5]} onClick={onClick} position={[0, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="blue" transparent opacity={0.7} />
      </Box>

      <Center position={[0, 0, 3]}>
        <Text3D
          size={15}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="fonts/Farek.json"
          height={3}
          castShadow
        >
          Acceder con Google
          <meshStandardMaterial />
        </Text3D>
      </Center>
    </group>
  );
}

const Login = () => {
  const { user, loginGoogleWithPopUp, observeAuthState, loading, error } = useAuthStore();
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    observeAuthState();
  }, [observeAuthState]);

  useEffect(() => {
    if (user) {
      const newUser = {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
      };
      UserDAO.createUser(newUser);
      navigate("/Inicio");
    }
  }, [user, navigate]);

  const handleLogin = useCallback(async () => {
    try {
      await loginGoogleWithPopUp();
    } catch (err) {
      setShowError(true);
    }
  }, [loginGoogleWithPopUp]);

  if (loading) {
    return (
      <div className="loading-container">
        <p className="loading-text">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="container-login">
      {showError && (
        <p className="error-text">
          Hubo un error al iniciar sesión. Por favor, inténtalo de nuevo.
        </p>
      )}
      
      {!user && (
        <>
          <Canvas 
          shadows
          gl={{ preserveDrawingBuffer: true }}
          camera={{ position: [0, 50, 370], fov: 75 }}
          >
            <LoginControls />
            <ambientLight intensity={0.5} />
            
            {/* Configura una luz direccional para sombras */}
            <directionalLight
              position={[0, 100, 100]}
              intensity={1}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-near={0.1}
              shadow-camera-far={500}
              shadow-camera-left={-200}
              shadow-camera-right={200}
              shadow-camera-top={200}
              shadow-camera-bottom={-200}
            />

            <LoginForest />
            <LoginButton3D onClick={handleLogin} />
            <LoginText />
            <Logo />
          </Canvas>
          
          {error && <p className="error-text">Error: {error.message}</p>}
        </>
      )}
    </div>
  );
};

export default Login;

useGLTF.preload('models-3d/forest_scene.glb');

