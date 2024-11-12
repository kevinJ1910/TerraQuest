import { OrbitControls } from "@react-three/drei";
import { useRef, useEffect } from "react";

const Controls = ({ target, minZoom = 15, maxZoom = 100 }) => {
  const controlsRef = useRef();

  useEffect(() => {
    // Si hay un target, ajustamos el enfoque de la cámara
    if (controlsRef.current && target) {
      controlsRef.current.target = target;
    }

    // Establecemos los límites del zoom
    if (controlsRef.current) {
      controlsRef.current.maxDistance = maxZoom;  // Establece el máximo de zoom (alejamiento)
      controlsRef.current.minDistance = minZoom;  // Establece el mínimo de zoom (acercamiento)
    }
  }, [target, minZoom, maxZoom]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={true}  // Habilitamos el zoom
      enablePan={false}  // Deshabilitamos el paneo (movimiento de cámara)
    />
  );
};

export default Controls;
