import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Grid, OrbitControls } from '@react-three/drei';
import Tree from '../inicio/models-3d/Tree';
import Botella from '../inicio/models-3d/Botella';
import QuizHeader from '../../components/header/QuizHeader';
import useStore from '../../stores/use-quiz-store';
import * as THREE from 'three';
import "./PlantTrees.css";
import BadTree from '../inicio/models-3d/BadTree';
import QuizExpl from '../texts/QuizExpl';
import { EffectComposer, Bloom, Vignette, Noise, DepthOfField, Scanline, SMAA, ToneMapping, Outline, LensFlare, HueSaturation, GodRays, Glitch } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import QuizStaging from '../staging/QuizStaging';
import QuizControl from '../controls/QuizControl';

const PlantTreesScene = () => {
  const [trees, setTrees] = useState([]); // Árboles plantados
  const [showReforestMessage, setShowReforestMessage] = useState(true); // Mensaje de reforestación
  const [showRewardMessage, setShowRewardMessage] = useState(false); // Mensaje de recompensa
  const [bottles, setBottles] = useState([]); // Botellas en el terreno de limpieza
  const [showFireWarning, setShowFireWarning] = useState(true); // Estado para mostrar el mensaje
  const [timer, setTimer] = useState(null); // Temporizador
  const [cleaningDisabled, setCleaningDisabled] = useState(false); 
  const [timeExpired, setTimeExpired] = useState(false); // Controla si se agotó el tiempo
  const [cleanSuccess, setCleanSuccess] = useState(false); // Éxito en limpieza
  const [currentObjectiveIndex, setCurrentObjectiveIndex] = useState(0);
  const audioRef = useRef(new Audio('./audio/sounds-of-nature.mp3')); // Cargar el audio

  const addPoints = useStore((state) => state.addPoints); // Función para sumar puntos
  const addReward = useStore((state) => state.addReward); // Función para añadir recompensas
    
  // Definir los objetivos de la cámara
  const objetivos = [
    { cameraPos: [80, 4, 0], targetPos: [100, 3, 0] }, // Vista inicial
    { cameraPos: [0, 30, 60], targetPos: [0, 0, 0] }, // Enfoque en reforestación
    { cameraPos: [-30, 7, 0], targetPos: [-50, 3, 0] }, // Enfoque en limpieza
  ];

  const [targetCameraPosition, setTargetCameraPosition] = useState(objetivos[0].cameraPos);
  const [targetLookAtPosition, setTargetLookAtPosition] = useState(objetivos[0].targetPos);

  useEffect(() => {
    // Reproduce el audio cuando el componente esté activo
    const audio = audioRef.current;
    audio.loop = true; // Opcional: para que la música se repita
    audio.play();

    return () => {
      // Detén el audio cuando el componente se desmonte
      audio.pause();
      audio.currentTime = 0;
    };
  }, []); // Ejecutar al montar

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp' || event.key === 'w') {
      // Ir al siguiente objetivo
      setCurrentObjectiveIndex((prevIndex) => {
        const newIndex = Math.min(prevIndex + 1, objetivos.length - 1);
        setTargetCameraPosition(objetivos[newIndex].cameraPos);
        setTargetLookAtPosition(objetivos[newIndex].targetPos);
        return newIndex;
      });
    }
    if (event.key === 'ArrowDown' || event.key === 's') {
      // Ir al objetivo anterior
      setCurrentObjectiveIndex((prevIndex) => {
        const newIndex = Math.max(prevIndex - 1, 0);
        setTargetCameraPosition(objetivos[newIndex].cameraPos);
        setTargetLookAtPosition(objetivos[newIndex].targetPos);
        return newIndex;
      });
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lógica de plantación de árboles
  const handlePlantTree = (event) => {
    if (trees.length >= 10) return;

    const [x, y, z] = event.point.toArray();
    setTrees((prevTrees) => [...prevTrees, { position: [x, y, z] }]);
    addPoints(10);

    if (trees.length + 1 === 10) {
      setShowRewardMessage(true);
      addReward('🏆 Trofeo de Reforestación');
    }
  };

  // Mostrar mensaje al entrar al objetivo 2 (reforestación)
  useEffect(() => {
    if (currentObjectiveIndex === 1) {
      const timerId = setTimeout(() => {
        setShowReforestMessage(false);
      }, 8000); // El mensaje durará 8 segundos

      return () => clearTimeout(timerId);
    } 
  }, [currentObjectiveIndex]);



  // Lógica para recoger botellas
  const handlePickBottle = (index) => {
    if (timeExpired || cleaningDisabled) return; // No permitir interacción si el tiempo se agotó o si está deshabilitado
  
    setBottles((prevBottles) => prevBottles.filter((_, i) => i !== index));
    addPoints(25);
  
    if (bottles.length === 1) { // La longitud será 1 antes de eliminar la última botella
      setCleanSuccess(true);
      addReward('🌟 Limpieza Completada');
      setCleaningDisabled(true); // Deshabilitar más limpieza
      setTimer(null);
    }
  };
  

  useEffect(() => {
    // Mostrar el mensaje cuando el objetivo 3 se active
    if (currentObjectiveIndex === 2) {
      const timerId = setTimeout(() => {
        setShowFireWarning(false); // Ocultar el mensaje después de 5 segundos
      }, 8000); 
  
      // Limpiar el timeout cuando el componente se desmonte o cambie el índice
      return () => clearTimeout(timerId);
    }
  }, [currentObjectiveIndex]); // Solo se ejecutará cuando el objetivo cambie
  

  // Temporizador para la tarea de limpieza
  useEffect(() => {
    if (timer !== null && bottles.length > 0) {
      const interval = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            setTimeExpired(true); // Indicar que el tiempo se agotó
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer, bottles]);

  // Configuración inicial de botellas y temporizador
  useEffect(() => {
    const initialBottles = Array.from({ length: 5 }, () => ({
      position: [
        Math.random() * 20 - 60, // Coordenadas X restringidas al terreno de limpieza
        0,
        Math.random() * 20 - 10, // Coordenadas Z ajustadas para estar en el terreno de limpieza
      ],
    }));
    setBottles(initialBottles);
    // Comprobar si estamos en el objetivo 3 (índice 2)
    if (currentObjectiveIndex === 2 && timer === null) {
      setTimer(20); // Iniciar el temporizador con 20 segundos
    }
  }, [currentObjectiveIndex, timer]);

  const TreeGrid = ({ basePosition, countX, countZ, spacing }) => {
    return (
      <group>
        {Array.from({ length: countX }).map((_, xIndex) => 
          Array.from({ length: countZ }).map((_, zIndex) => {
            // Alternar la escala entre 0.1 y 0.15 en función de la fila (zIndex)
            const scale = (zIndex % 2 === 0) ? 1.2 : 2; // Alterna entre 0.1 y 0.15 según el índice
  
            return (
              <Tree
                key={`${xIndex}-${zIndex}`} // Usar una clave única para cada árbol
                scale={[scale, scale, scale]} // Escala dinámica
                position={[
                  basePosition[0] - xIndex * spacing, // Desplazar en el eje X
                  basePosition[1],
                  basePosition[2] - zIndex * spacing, // Desplazar en el eje Z
                ]}
              />
            );
          })
        )}
      </group>
    );
  };

  const BadTreeGrid = ({ basePosition, countX, countZ, spacing }) => {
    return (
      <group>
        {Array.from({ length: countX }).map((_, xIndex) => 
          Array.from({ length: countZ }).map((_, zIndex) => {
            // Alternar la escala entre 0.1 y 0.15 en función de la fila (zIndex)
            const scale = (zIndex % 2 === 0) ? 4.5 : 3.5; // Alterna entre 0.1 y 0.15 según el índice
  
            return (
              <BadTree
                key={`${xIndex}-${zIndex}`} // Usar una clave única para cada árbol
                scale={[scale, scale, scale]} // Escala dinámica
                position={[
                  basePosition[0] - xIndex * spacing, // Desplazar en el eje X
                  basePosition[1],
                  basePosition[2] - zIndex * spacing, // Desplazar en el eje Z
                ]}
              />
            );
          })
        )}
      </group>
    );
  };

  return (
    <>
      <QuizHeader />
      <div className="inicio-container">
        <Canvas shadows camera={{ position: objetivos[0].cameraPos, fov: 50 }}>
          <QuizControl />
          <ambientLight intensity={0.5} />
          <QuizStaging />
          <directionalLight
            position={[5, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048} // Aumentar la resolución del mapa de sombras
            shadow-mapSize-height={2048}
            shadow-camera-near={0.5}
            shadow-camera-far={50}
            shadow-camera-left={-30}
            shadow-camera-right={30}
            shadow-camera-top={30}
            shadow-camera-bottom={-30}
          />

          <CameraUpdater
            targetPosition={targetCameraPosition}
            targetLookAt={targetLookAtPosition}
          />
          <QuizExpl />
          <EffectComposer>
            <ToneMapping />
            <Vignette eskil={false} offset={0.25} darkness={0.8} />
            <Noise opacity={0.6} blendFunction={BlendFunction.SOFT_LIGHT}/>
            <HueSaturation hue={0.2} saturation={0.5} />
            <DepthOfField />
          </EffectComposer>

          <TreeGrid
            basePosition={[40, 0, -27]} // Posición inicial
            scale={[1, 1, 1]} // Escala de los árboles
            countX={5} // Número de árboles en el eje X (izquierda/derecha)
            countZ={2} // Número de árboles en el eje Z (delante/detrás)
            spacing={20} // Espaciado entre los árboles
          /> 

          <TreeGrid
            basePosition={[-30, 0, 30]} // Posición inicial
            scale={[1, 1, 1]} // Escala de los árboles
            countX={1} // Número de árboles en el eje X (izquierda/derecha)
            countZ={3} // Número de árboles en el eje Z (delante/detrás)
            spacing={20} // Espaciado entre los árboles
          />

          <TreeGrid
            basePosition={[30, 0, 37]} // Posición inicial
            scale={[1, 1, 1]} // Escala de los árboles
            countX={1} // Número de árboles en el eje X (izquierda/derecha)
            countZ={3} // Número de árboles en el eje Z (delante/detrás)
            spacing={20} // Espaciado entre los árboles
          /> 

          <BadTreeGrid
            basePosition={[-62, 0, 15]} // Posición inicial
            scale={[1, 1, 1]} // Escala de los árboles
            countX={2} // Número de árboles en el eje X (izquierda/derecha)
            countZ={7} // Número de árboles en el eje Z (delante/detrás)
            spacing={5} // Espaciado entre los árboles
          /> 

          <BadTreeGrid
            basePosition={[-40, 0, 17]} // Posición inicial
            scale={[1, 1, 1]} // Escala de los árboles
            countX={4} // Número de árboles en el eje X (izquierda/derecha)
            countZ={2} // Número de árboles en el eje Z (delante/detrás)
            spacing={5} // Espaciado entre los árboles
          /> 

          <BadTreeGrid
            basePosition={[-40, 0, -12]} // Posición inicial
            scale={[1, 1, 1]} // Escala de los árboles
            countX={4} // Número de árboles en el eje X (izquierda/derecha)
            countZ={2} // Número de árboles en el eje Z (delante/detrás)
            spacing={5} // Espaciado entre los árboles
          /> 

          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -0.1, 0]}
            receiveShadoww
            castShadow
          >
            <planeGeometry args={[300, 300]} />
            <meshStandardMaterial color="#2da551" />
          </mesh>

          {/* Terreno de plantación */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            onClick={handlePlantTree}
            receiveShadow
            castShadow
          >
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>

          {/* Terreno de limpieza */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[-50, 0, 0]} // Desplazado hacia adelante
            receiveShadow
            castShadow
          >
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#3B5323" />
          </mesh>

          {/* Árboles plantados */}
          {trees.map((tree, index) => (
            <Tree key={index} position={tree.position} />
          ))}

          {/* Botellas en el terreno de limpieza */}
          {bottles.map((bottle, index) => (
            <Botella
              key={index}
              position={bottle.position}
              onClick={() => !cleaningDisabled && handlePickBottle(index)}
              visible={!cleaningDisabled} // Oculta las botellas si la limpieza está deshabilitada
            />
          ))}

        </Canvas>

        {/* Mensaje de reforestación */}
        {showRewardMessage && currentObjectiveIndex ===1 && (
          <div className="reforest-message">
            <h2>¡Felicidades has ganado 🏆 Trofeo de Reforestación!</h2>
            ¡Has ayudado a reforestar! Esto reducirá el CO2 y aumentará la biodiversidad.
          </div>
        )}

        {/* Mensaje de reforestación cuando se entra en el objetivo 2 */}
        {showReforestMessage && currentObjectiveIndex === 1 && (
          <div className="limpieza-message">
            <h2>Un área del bosque ha sido talada. Planta suficientes árboles para restaurar el equilibrio del ecosistema.</h2>
          </div>
        )}

        {/* Mensaje de advertencia cuando se alcanza el objetivo 3 */}
        { showFireWarning &&currentObjectiveIndex === 2 && (
          <div className="limpieza-message">
            <h2>El bosque está en riesgo de incendio debido a basura inflamable como botellas. Limpia todo el bosque para evitar incendios.</h2>
          </div>
        )}

        {/* Temporizador de limpieza */}
        {currentObjectiveIndex === 2 && timer !== null && bottles.length > 0 && !cleanSuccess && (
          <div className="limpieza-message timer-message" >
            <h3>Tiempo restante: {timer}s</h3>
          </div>
        )}

        {/* Mensaje de éxito en la limpieza */}
        {cleanSuccess &&  currentObjectiveIndex === 2 &&(
          <div className="reforest-message">
            <h2>¡Excelente has ganado el logro 🌟 Limpieza Completada! Has eliminado los riesgos de incendio y asegurado la protección de este ecosistema. Gracias a tu acción, el bosque sigue siendo un refugio seguro para la vida silvestre y una fuente de aire limpio para todos.</h2>
          </div>
        )}

        {/* Mensaje de tiempo agotado */}
        {timeExpired && !cleanSuccess && currentObjectiveIndex === 2 && (
          <div className="limpieza-message tiempo-agotado">
            <h2>Te demoraste mucho en limpiar...</h2>
            <a>No pudiste prevenir el desastre ambiental.</a>
          </div>
        )}
      </div>
    </>
  );
};

// Componente para actualizar la cámara suavemente
const CameraUpdater = ({ targetPosition, targetLookAt }) => {
  const { camera } = useThree();
  const targetPos = new THREE.Vector3(...targetPosition);
  const lookAtPos = new THREE.Vector3(...targetLookAt);

  useFrame(() => {
    camera.position.lerp(targetPos, 0.05); // Suavizar movimiento de la cámara
    camera.lookAt(lookAtPos); // Ajustar dirección
  });

  return null;
};

export default PlantTreesScene;