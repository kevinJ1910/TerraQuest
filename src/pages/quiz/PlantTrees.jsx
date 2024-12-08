import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Tree from '../inicio/models-3d/Tree';
import QuizHeader from '../../components/header/QuizHeader';
import useStore from '../../stores/use-quiz-store';
import "./PlantTrees.css";

const PlantTreesScene = () => {
  const [trees, setTrees] = useState([]); // Árboles plantados
  const [showMessage, setShowMessage] = useState(false); // Mostrar mensaje de reforestación

  const addPoints = useStore((state) => state.addPoints); // Función para sumar puntos
  const addReward = useStore((state) => state.addReward); // Función para añadir recompensas

  const handlePlantTree = (event) => {
    if (trees.length >= 10) {
      // No permitir plantar más de 10 árboles
      return;
    }

    // Planta el árbol
    const [x, y, z] = event.point.toArray();
    setTrees((prevTrees) => [...prevTrees, { position: [x, y, z] }]);

    // Incrementa la puntuación
    addPoints(10); // Suma 10 puntos por cada árbol plantado
  };

  useEffect(() => {
    // Mostrar el mensaje solo cuando se planta el décimo árbol
    if (trees.length === 10) {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 10000); // Oculta el mensaje después de 10 segundos
      addReward('🏆 Trofeo de Reforestación');
    }
  }, [trees, addReward]);

  return (
    <>
      <QuizHeader />
      <div className="inicio-container">
        <Canvas shadows camera={{ position: [0, 20, 80], fov: 50 }}>
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          {/* Terreno */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            onClick={handlePlantTree}
            receiveShadow
          >
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>

          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -0.1, 0]}
            receiveShadow
          >
            <planeGeometry args={[500, 500]} />
            <meshStandardMaterial color="#2da551" />
          </mesh>

          {/* Árboles plantados */}
          {trees.map((tree, index) => (
            <Tree key={index} position={tree.position} />
          ))}
        </Canvas>

        {/* Mensaje de reforestación que aparece solo cuando se planta el décimo árbol */}
        {showMessage && (
          <div className="reforest-message">
            <h2>¡Felicidades has ganado 🏆 Trofeo de Reforestación!</h2>
            ¡Has ayudado a reforestar! Esto reducirá el CO2 y aumentará la biodiversidad.
          </div>
        )}
      </div>
    </>
  );
};

export default PlantTreesScene;
