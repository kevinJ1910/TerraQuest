import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import "./Inicio.css";
import { Canvas } from "@react-three/fiber";
import Forest from "./models-3d/Forest";
import Controls from "../controls/Controls";
import * as THREE from "three";
import IntroInic from "../texts/IntroInic";
import PropInic from "../texts/PropInic";
import Key from "./models-3d/Key";
import LightsInic from "../lights/LightsInic";
import { BakeShadows, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, Noise, DepthOfField, Scanline, SMAA, ToneMapping, Outline, LensFlare, HueSaturation, GodRays, Glitch } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

const Inicio = () => {
  const targetPosition = new THREE.Vector3(-10, 0, 10);
  const cameraSettings = {
    position: [-100, 70, 95],
    fov: 90,
  };

  const [showIntro, setShowIntro] = useState(false);
  const [showProp, setShowProp] = useState(false);
  const [showMessage, setShowMessage] = useState(true); // Estado para mostrar el mensaje inicial

  // Mostrar mensaje por 5 segundos al montar el componente
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 5000);

    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
  }, []);

  const handleFirstKey = () => {
    setShowIntro(true);
    setShowProp(false);
  };

  const handleSecondKey = () => {
    setShowProp(true);
    setShowIntro(false);
  };

  const closeIntro = () => setShowIntro(false);
  const closeProp = () => setShowProp(false);

  return (
    <>
      <Header />
      <div className="inicio-container">
        {showMessage && (
          <div className="message-container">
            <h2>Usa la rueda del mouse para acercarte al árbol</h2>
          </div>
        )}
        <Canvas shadows camera={cameraSettings}>
          <Controls target={targetPosition} />
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
          <EffectComposer>
            <HueSaturation hue={0.2} saturation={0.5} />
          </EffectComposer>
          {showIntro && <IntroInic closeIntro={closeIntro} />}
          {showProp && <PropInic closeProp={closeProp} />}
          <Key position={[-10, 0.05, -5]} rotation={[Math.PI, Math.PI / 4, Math.PI * 0.8]} onClick={handleFirstKey} />
          <Key position={[10, -0.08, 15]} rotation={[Math.PI, Math.PI / 2, Math.PI * 0.8]} onClick={handleSecondKey} />
        </Canvas>
      </div>
    </>
  );
};

export default Inicio;
