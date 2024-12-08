import { Canvas } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import Header from "../../../components/header/Header";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import LampPost from "../../inicio/models-3d/LampPost";
import Korrigan from "../../inicio/models-3d/Korrigan";
import Rock from "../../inicio/models-3d/Rock";
import Tree from "../../inicio/models-3d/Tree";
import TreeRotate from "../../inicio/models-3d/TreeRotate";
import Ankou from "../../inicio/models-3d/Ankou";
import Ground from "./Ground";
import { Physics, Debug } from "@react-three/cannon";
import "./Solucion.css";
import { useBox } from "@react-three/cannon";
import { Text } from "@react-three/drei"; // Importa Text para agregar texto 3D
import InicStaging from "../../staging/InicStaging";
import Druid from "../../inicio/models-3d/Druid";
import TrashCan from "../../inicio/models-3d/TrashCan";
import Paper from "../../inicio/models-3d/Paper";
import Composta from "../../inicio/models-3d/Composta";
import Planta from "../../inicio/models-3d/Plantas";
import Cerca from "../../inicio/models-3d/Cerca";
import CercaRot from "../../inicio/models-3d/CercaRot";
import SoluControls from "../../controls/SoluControls";

const MovingItem = (props) => {
    const ref = useRef();
    const [isMoving, setIsMoving] = useState(false);
    const [currentCycle, setCurrentCycle] = useState(0);
    const audioRef = useRef(new Audio('./audio/Song Of Unity.mp3')); // Cargar el audio
  
    useEffect(() => {
      const handleKeyDown = (e) => {
        if ((e.key === "ArrowLeft" || e.key === "a") && !isMoving) {
          setIsMoving(true);
        }
      };
  
      window.addEventListener("keydown", handleKeyDown);
  
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [isMoving]);

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

    useFrame(() => {
      if (isMoving) {
        const targetPositionX = 20 * (currentCycle + 1);
        if (ref.current.position.x < targetPositionX) {
          ref.current.position.x += 0.05;
        } else {
          setIsMoving(false);
          setCurrentCycle((prev) => prev + 1);
        }
      }
    });
  
    return (
      <group ref={ref} position={[0, 0, 0]} castShadow receiveShadow>
        {props.children}
      </group>
    );
  };

  const TreeWithPhysics = (props) => {
    const [ref] = useBox(() => ({
      mass: 1,
      position: props.position,
      args: [1, 2.3, 1],
    }));
  
    return (
      <mesh ref={ref} castShadow receiveShadow>
        <Tree scale={props.scale} />
      </mesh>
    );
  };

  const TreeWithPhysicsRot = (props) => {
    const [ref] = useBox(() => ({
      mass: 1,
      position: props.position,
      args: [1, 2.3, 1],
    }));
  
    return (
      <mesh ref={ref}>
        <TreeRotate scale={props.scale} />
      </mesh>
    );
  };

  const TreeGrid = ({ basePosition, countX, countZ, spacing }) => {
    return (
      <group>
        {Array.from({ length: countX }).map((_, xIndex) => 
          Array.from({ length: countZ }).map((_, zIndex) => {
            // Alternar la escala entre 0.1 y 0.15 en función de la fila (zIndex)
            const scale = (zIndex % 2 === 0) ? 0.1 : 0.15; // Alterna entre 0.1 y 0.15 según el índice
  
            return (
              <TreeWithPhysics
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
  
  const TreeGridRot = ({ basePosition, countX, countZ, spacing }) => {
    return (
      <group>
        {Array.from({ length: countX }).map((_, xIndex) => 
          Array.from({ length: countZ }).map((_, zIndex) => {
            // Alternar la escala entre 0.1 y 0.15 en función de la fila (zIndex)
            const scale = (zIndex % 2 === 0) ? 0.1 : 0.15; // Alterna entre 0.1 y 0.15 según el índice

            return (
              <TreeWithPhysicsRot
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

  const FenceGrid = ({ basePosition, countX, countY, spacing }) => {
    return (
      <group>
        {Array.from({ length: countX }).map((_, xIndex) =>
          Array.from({ length: countY }).map((_, yIndex) => {
            return (
              <Cerca
                key={`${xIndex}-${yIndex}`} // Clave única para cada cerca
                scale={[1, 1, 1]} // Escala constante
                position={[
                  basePosition[0] + xIndex * spacing, // Desplazar en el eje X
                  basePosition[1] + yIndex * spacing, // Desplazar en el eje Y
                  basePosition[2], // Mantener constante en Z
                ]}
              />
            );
          })
        )}
      </group>
    );
  };

  const FenceGridRot = ({ basePosition, countX, countY, spacing }) => {
    return (
      <group>
        {Array.from({ length: countX }).map((_, xIndex) =>
          Array.from({ length: countY }).map((_, yIndex) => {
            return (
              <CercaRot
                key={`${xIndex}-${yIndex}`} // Clave única para cada cerca
                scale={[1, 1, 1]} // Escala constante
                position={[
                  basePosition[0] + xIndex * spacing, // Desplazar en el eje X
                  basePosition[1] + yIndex * spacing, // Desplazar en el eje Y
                  basePosition[2], // Mantener constante en Z
                ]}
              />
            );
          })
        )}
      </group>
    );
  };

const Background = () => {
  return (
    <group position={[0, 0, 0]}>
      <MovingItem>
        <LampPost scale={[0.5, 0.5, 0.5]} position={[0, 0, -1.5]} />

        <Rock scale={[0.1, 0.1, 0.1]} position={[0, 0, 1]} />
  
        <Druid position={[-20, 0, -3.5]} />

        <TrashCan 
        scale={[0.01, 0.01, 0.01]} 
        position={[-40, 0, -4.5]} 
        rotation={[0, Math.PI/2, 0]} />
        
        <Paper 
        scale={[0.05, 0.05, 0.03]} 
        position={[-40.5, 0, 5]} 
        rotation={[0, Math.PI/2, 0]} />

        <Composta 
        scale={[5, 5, 5]} 
        position={[-60, 0, -4.5]} />

        <Planta 
        scale={[1, 1, 1]} 
        position={[-60, -0.1, 3]} />

        <Planta 
        scale={[1, 1, 1]} 
        position={[-59, -0.1, 3]} />

        <Planta 
        scale={[1, 1, 1]} 
        position={[-60, -0.1, 4]} />

        <Planta 
        scale={[1, 1, 1]} 
        position={[-59, -0.1, 4]} />

        <Planta 
        scale={[1, 1, 1]} 
        position={[-61, -0.1, 3]} />

        <Planta 
        scale={[1, 1, 1]} 
        position={[-61, -0.1, 4]} />

        <FenceGrid
            basePosition={[-81, 0, -2]} // Posición inicial en X, Y, Z
            countX={92} // 10 repeticiones en el eje X
            countY={1}  // 5 repeticiones en el eje Y
            spacing={1} // Espaciado de 5 unidades entre cercas
          />

        <FenceGrid
            basePosition={[-81, 0, 3]} // Posición inicial en X, Y, Z
            countX={92} // 10 repeticiones en el eje X
            countY={1}  // 5 repeticiones en el eje Y
            spacing={1} // Espaciado de 5 unidades entre cercas
          />

        <FenceGridRot
            basePosition={[-81, 0, 0]} // Posición inicial en X, Y, Z
            countX={1} // 10 repeticiones en el eje X
            countY={1}  // 5 repeticiones en el eje Y
            spacing={1} // Espaciado de 5 unidades entre cercas
          />
        <FenceGridRot
            basePosition={[-81, 0, 1]} // Posición inicial en X, Y, Z
            countX={1} // 10 repeticiones en el eje X
            countY={1}  // 5 repeticiones en el eje Y
            spacing={1} // Espaciado de 5 unidades entre cercas
          />
        <FenceGridRot
            basePosition={[-81, 0, 2]} // Posición inicial en X, Y, Z
            countX={1} // 10 repeticiones en el eje X
            countY={1}  // 5 repeticiones en el eje Y
            spacing={1} // Espaciado de 5 unidades entre cercas
          />
        <FenceGridRot
            basePosition={[-81, 0, -1]} // Posición inicial en X, Y, Z
            countX={1} // 10 repeticiones en el eje X
            countY={1}  // 5 repeticiones en el eje Y
            spacing={1} // Espaciado de 5 unidades entre cercas
          />
          <FenceGridRot
            basePosition={[-81, 0, -2]} // Posición inicial en X, Y, Z
            countX={1} // 10 repeticiones en el eje X
            countY={1}  // 5 repeticiones en el eje Y
            spacing={1} // Espaciado de 5 unidades entre cercas
          />
      </MovingItem>

      <MovingItem>
       <TreeWithPhysics 
       scale={[0.04, 0.04, 0.04]} 
       position={[-19, 4, -5]} />

       <TreeWithPhysics 
       scale={[0.04, 0.04, 0.04]} 
       position={[-21, 4, -5]} />

        <TreeWithPhysics 
       scale={[0.04, 0.04, 0.04]} 
       position={[-20, 4, -6]} />

        <TreeWithPhysics 
       scale={[0.5, 0.5, 0.5]} 
       position={[-20, 4, -18]} />
      </MovingItem>

       <MovingItem>
        <group>
            <TreeGrid
                basePosition={[10, 1, -3.5]} // Posición inicial
                scale={[0.1, 0.1, 0.1]} // Escala de los árboles
                countX={14} // Número de árboles en el eje X (izquierda/derecha)
                countZ={7} // Número de árboles en el eje Z (delante/detrás)
                spacing={2} // Espaciado entre los árboles
            />               

            <TreeGridRot 
                 basePosition={[10, 1.2, 15]} // Posición inicial
                 scale={[0.1, 0.1, 0.1]} // Escala de los árboles
                 countX={14} // Número de árboles en el eje X (izquierda/derecha)
                 countZ={7} // Número de árboles en el eje Z (delante/detrás)
                 spacing={2} // Espaciado entre los árboles
            />  

            <TreeGrid 
                 basePosition={[-24, 1, -3.5]} // Posición inicial
                 scale={[0.1, 0.1, 0.1]} // Escala de los árboles
                 countX={7} // Número de árboles en el eje X (izquierda/derecha)
                 countZ={7} // Número de árboles en el eje Z (delante/detrás)
                 spacing={2} // Espaciado entre los árboles
            />  

            <TreeGridRot 
                 basePosition={[-24, 1.2, 15]} // Posición inicial
                 scale={[0.1, 0.1, 0.1]} // Escala de los árboles
                 countX={7} // Número de árboles en el eje X (izquierda/derecha)
                 countZ={7} // Número de árboles en el eje Z (delante/detrás)
                 spacing={2} // Espaciado entre los árboles
            />  

            <TreeGrid 
                 basePosition={[-43, 1, -3.5]} // Posición inicial
                 scale={[0.1, 0.1, 0.1]} // Escala de los árboles
                 countX={8} // Número de árboles en el eje X (izquierda/derecha)
                 countZ={7} // Número de árboles en el eje Z (delante/detrás)
                 spacing={2} // Espaciado entre los árboles
            />  

            <TreeGridRot 
                 basePosition={[-43, 1.2, 15]} // Posición inicial
                 scale={[0.1, 0.1, 0.1]} // Escala de los árboles
                 countX={7} // Número de árboles en el eje X (izquierda/derecha)
                 countZ={7} // Número de árboles en el eje Z (delante/detrás)
                 spacing={2} // Espaciado entre los árboles
            />  

            <TreeGrid 
                 basePosition={[-63, 1, -3.5]} // Posición inicial
                 scale={[0.1, 0.1, 0.1]} // Escala de los árboles
                 countX={10} // Número de árboles en el eje X (izquierda/derecha)
                 countZ={7} // Número de árboles en el eje Z (delante/detrás)
                 spacing={2} // Espaciado entre los árboles
            />  

            <TreeGridRot 
                 basePosition={[-63, 1.2, 15]} // Posición inicial
                 scale={[0.1, 0.1, 0.1]} // Escala de los árboles
                 countX={10} // Número de árboles en el eje X (izquierda/derecha)
                 countZ={7} // Número de árboles en el eje Z (delante/detrás)
                 spacing={2} // Espaciado entre los árboles
            />  

            <TreeGrid
                basePosition={[12, 20, 2]} // Posición inicial
                scale={[0.1, 0.1, 0.1]} // Escala de los árboles
                countX={1} // Número de árboles en el eje X (izquierda/derecha)
                countZ={4} // Número de árboles en el eje Z (delante/detrás)
                spacing={2} // Espaciado entre los árboles
            />   

            <TreeGrid 
                 basePosition={[-83, 1, 15]} // Posición inicial
                 scale={[0.1, 0.1, 0.1]} // Escala de los árboles
                 countX={1} // Número de árboles en el eje X (izquierda/derecha)
                 countZ={16} // Número de árboles en el eje Z (delante/detrás)
                 spacing={2} // Espaciado entre los árboles
            />  

            <TreeGrid 
                 basePosition={[-84, 1, 15]} // Posición inicial
                 scale={[0.1, 0.1, 0.1]} // Escala de los árboles
                 countX={1} // Número de árboles en el eje X (izquierda/derecha)
                 countZ={16} // Número de árboles en el eje Z (delante/detrás)
                 spacing={2.5} // Espaciado entre los árboles
            /> 

            <TreeGrid 
                 basePosition={[-85, 1, 15]} // Posición inicial
                 scale={[0.1, 0.1, 0.1]} // Escala de los árboles
                 countX={1} // Número de árboles en el eje X (izquierda/derecha)
                 countZ={16} // Número de árboles en el eje Z (delante/detrás)
                 spacing={2} // Espaciado entre los árboles
            />  

            <Text
              position={[-20, 2, -7]} 
              fontSize={0.5}
              color="black"
              anchorX="center"
              anchorY="middle"
            >
              Planta Arboles
            </Text>

            <Text
              position={[-22, 2.5, 9]} 
              rotation={[0, 3, 0]}
              fontSize={0.5}
              color="black"
              anchorX="center"
              anchorY="middle"
              maxWidth={8}
            >
              Plantar árboles en áreas deforestadas para restaurar los ecosistemas naturales
            </Text>

            <Text
              position={[-39, 2.5, -7]} 
              fontSize={0.5}
              color="black"
              anchorX="center"
              anchorY="middle"
              maxWidth={6}
            >
              Usa productos que no contribuyan a la deforestacion
            </Text>

            <Text
              position={[-42, 2.5, 9]} 
              rotation={[0, 3, 0]}
              fontSize={0.5}
              color="black"
              anchorX="center"
              anchorY="middle"
              maxWidth={8}
            >
              Al reducir la cantidad de residuos de papel y madera, se disminuye la presión sobre los recursos forestales
            </Text>

            <Text
              position={[-59, 2.5, -7]} 
              fontSize={0.5}
              color="black"
              anchorX="center"
              anchorY="middle"
              maxWidth={5}
            >
              Has uso del compostaje
            </Text>

            <Text
              position={[-61, 2.5, 9]} 
              rotation={[0, 3, 0]}
              fontSize={0.35}
              color="black"
              anchorX="center"
              anchorY="middle"
              maxWidth={5}
            >
              Los restos de madera y papel pueden ser compostados y utilizados como abono natural, mejorando la calidad del suelo sin necesidad de productos químicos que puedan dañar el medio ambiente.
            </Text>
        </group>
       </MovingItem>
    </group>
  );
};

const Solucion = () => {
  return (
    <>
      <Header />
        <div className="inicio-container">
            <Canvas shadows camera={{ position: [-5, 2, 4], fov: 50 }}>
              <SoluControls />
              <directionalLight
                position={[10, 10, 15]}
                intensity={1}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
                />
              <InicStaging />
              <Environment preset="sunset" intensity={0.7} blur={0.8} />
              <Physics gravity={[0, -9.8, 0]}>
                <Ground />
                <group position={[0, -1, 0]}>
                  <Background />
                  <Ankou
                    rotation-y={-Math.PI / 2}
                    position={[0.9, 0, 0]}
                    scale={[0.5, 0.5, 0.5]}
                  />
                  <Korrigan
                    rotation-y={-Math.PI / 2}
                    position={[-1, -0.02, 0]}
                    scale={[1.5, 1.5, 1.5]}
                  />
                  
                </group>
              </Physics>
            </Canvas>
        </div>
    </>
  );
};

export default Solucion;