import Header from "../../components/header/Header";
import "./Inicio.css";
import { Canvas } from "@react-three/fiber";
import Forest from "./models-3d/Forest";
import Controls from "../controls/Controls";
import * as THREE from "three";
import React, { useState } from 'react';
import IntroInic from "../texts/IntroInic";  // Importamos el componente de introducción
import PropInic from "../texts/PropInic";  // Importamos el componente de propósito
import Key from "./models-3d/Key";
import InicStaging from "../staging/InicStaging";
import LightsInic from "../lights/LightsInic";
import { BakeShadows, ContactShadows } from "@react-three/drei";

const Inicio = () => {

  // Definir un punto de enfoque personalizado
  const targetPosition = new THREE.Vector3(-10, 0, 10); // Cambia a las coordenadas que desees

  const cameraSettings = {
    position: [-100, 70, 95],
    fov: 90,
  };

  // Estado para mostrar los textos
  const [showIntro, setShowIntro] = useState(false);
  const [showProp, setShowProp] = useState(false); // Estado para el texto del propósito

  // Función para manejar el clic en la primera llave
  const handleFirstKey = () => {
    setShowIntro(true);  // Mostrar el texto de introducción
    setShowProp(false);  // Asegurarse de que el texto de propósito no se muestre
  };

  // Función para manejar el clic en la segunda llave
  const handleSecondKey = () => {
    setShowProp(true);  // Mostrar el texto del propósito
    setShowIntro(false); // Asegurarse de que el texto de introducción no se muestre
  };

  // Función para cerrar el texto de introducción
  const closeIntro = () => {
    setShowIntro(false);
  };

  // Función para cerrar el texto del propósito
  const closeProp = () => {
    setShowProp(false);
  };

  return (
    <>
      <Header />
      <div className="inicio-container">
        <Canvas shadows camera={cameraSettings}>
          {/* Pasamos el targetPosition al componente Controls */}
          <Controls target={targetPosition} />
          {/*<InicStaging />*/}
          <LightsInic />
          <BakeShadows />
          <ContactShadows 
            opacity={1}
            scale={10}
            far={10}
            resolution={256}
            frames={128}
            color="#000000"
          />
          <Forest />
          {/* Mostrar el componente IntroInic o PropInic basado en el estado */}
          {showIntro && <IntroInic closeIntro={closeIntro} />}
          {showProp && <PropInic closeProp={closeProp} />}
          {/* Llaves para activar la introducción */}
          <Key position={[-10, 0.05, -5]} rotation={[Math.PI, Math.PI / 4, Math.PI * 0.8]} onClick={handleFirstKey} />
          <Key position={[10, -0.08, 15]} rotation={[Math.PI, Math.PI / 2, Math.PI * 0.8]} onClick={handleSecondKey} />
        </Canvas>
      </div>
    </>
  );
};

export default Inicio;

