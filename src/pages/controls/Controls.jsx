import { OrbitControls } from "@react-three/drei";
import { useRef, useEffect } from "react";

const Controls = ({ target, minZoom = 15, maxZoom = 100 }) => {
  const controlsRef = useRef();

  useEffect(() => {
    if (controlsRef.current && target) {
      controlsRef.current.target = target;
    }

    if (controlsRef.current) {
      controlsRef.current.maxDistance = maxZoom;
      controlsRef.current.minDistance = minZoom;
    }
  }, [target, minZoom, maxZoom]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={true}
      enablePan={false}
      // Límites de rotación vertical
      maxPolarAngle={Math.PI / 2.5} // Ajusta este valor para limitar el ángulo hacia arriba
      minPolarAngle={Math.PI / 3}   // Ajusta este valor para limitar el ángulo hacia abajo
      // Límites de rotación horizontal
      maxAzimuthAngle={Math.PI / 80} // Ajusta este valor para limitar el ángulo hacia la derecha
      minAzimuthAngle={-Math.PI / 2} // Ajusta este valor para limitar el ángulo hacia la izquierda
    />
  );
};

export default Controls;

