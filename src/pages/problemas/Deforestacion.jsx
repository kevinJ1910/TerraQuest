import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useState, useRef } from "react";
import Header from "../../components/header/Header";
import Swamp from "../inicio/models-3d/Swamp";
import DeforControls from "../controls/DeforControls";
import "./Deforestacion.css";
import Lights from "../lights/Lights";
import Staging from "../staging/Staging";
import IntroDefor from "../texts/IntroDefor";
import SensDef from "../texts/SensDef";
import SoluDef from "../texts/Soludef";

const Deforestacion = () => {
    // Definir las posiciones de los objetivos
    const objetivos = [
        { cameraPos: [0, 5, 34], targetPos: [0, 3, 27] }, // Posición inicial
        { cameraPos: [4, 2, 16], targetPos: [-2, 2, 14] }, // Primer objetivo
        { cameraPos: [-1, 7, 4], targetPos: [0, 6, 0] } // Segundo objetivo
    ];

    // Estado para el índice de objetivo
    const [currentObjectiveIndex, setCurrentObjectiveIndex] = useState(0);
    // Estado para la posición final y objetivo de la cámara
    const [targetCameraPosition, setTargetCameraPosition] = useState(objetivos[0].cameraPos);
    const [targetLookAtPosition, setTargetLookAtPosition] = useState(objetivos[0].targetPos);
    const [showNavMessage, setShowNavMessage] = useState(true);
    const audioRef = useRef(new Audio('./audio/forest-sounds.mp3')); // Cargar el audio


    useEffect(() => {
        // Reproduce el audio cuando el componente esté activo
        const audio = audioRef.current;
        audio.loop = true; // Opcional: para que la música se repita
        audio.volume = 0.1; // Ajusta el volumen 
        audio.play();
    
        return () => {
          // Detén el audio cuando el componente se desmonte
          audio.pause();
          audio.currentTime = 0;
        };
      }, []); // Ejecutar al montar

    // Mostrar mensaje por 5 segundos al montar el componente
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowNavMessage(false);
      }, 5000);

      return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === "w" || event.key === "ArrowUp") {
            // Mover hacia el siguiente objetivo si no estamos en el último
            setCurrentObjectiveIndex((prevIndex) => {
                if (prevIndex >= objetivos.length - 1) return prevIndex;
                const newIndex = prevIndex + 1;
                setTargetCameraPosition(objetivos[newIndex].cameraPos);
                setTargetLookAtPosition(objetivos[newIndex].targetPos);
                return newIndex;
            });
        }
        
        if (event.key === "s" || event.key === "ArrowDown") {
            // Mover hacia el objetivo anterior si no estamos en el primero
            setCurrentObjectiveIndex((prevIndex) => {
                if (prevIndex <= 0) return prevIndex;
                const newIndex = prevIndex - 1;
                setTargetCameraPosition(objetivos[newIndex].cameraPos);
                setTargetLookAtPosition(objetivos[newIndex].targetPos);
                return newIndex;
            });
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <>
            <Header />
            <div className="container-defor">
                {showNavMessage && (
                    <div className="message-container">
                      <h2>Navega con las teclas "W" y "S" o usando ↑  ↓</h2> 
                    </div>
                )}
                <Canvas camera={{ position: objetivos[0].cameraPos, fov: 90 }}>
                    <Lights />
                    <DeforControls />
                    <Swamp />
                    <Staging />
                    {currentObjectiveIndex === 0 && <IntroDefor />}
                    {currentObjectiveIndex === 1 && <SensDef />}
                    {currentObjectiveIndex === 2 && <SoluDef />}
                    <CameraUpdater targetPosition={targetCameraPosition} targetLookAt={targetLookAtPosition} />
                    
                </Canvas>
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
        camera.position.lerp(targetPos, 0.05);
        camera.lookAt(lookAtPos);
    });

    return null;
};

export default Deforestacion;