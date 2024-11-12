import React, { useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

const Key = (props) => {
  const { nodes, materials } = useGLTF('models-3d/key.glb');

  const [rotationY, setRotationY] = useState(0); // Estado para la rotación en el eje Y

  const minRotation = -Math.PI / 0.5; // Rango mínimo de rotación
  const maxRotation = Math.PI / 200;  // Rango máximo de rotación

  useEffect(() => {
    // Función para manejar el evento de desplazamiento del mouse
    const handleWheel = (event) => {
      // Ajusta el valor de rotación según la dirección de desplazamiento
      setRotationY(prevRotationY => {
        // Calcula la nueva rotación
        const newRotationY = prevRotationY + event.deltaY * 0.0015;
        // Asegura que la rotación esté dentro del rango permitido
        return Math.max(minRotation, Math.min(maxRotation, newRotationY));
      });
    };

    // Agrega el evento al desplazar el mouse
    window.addEventListener('wheel', handleWheel);

    // Limpia el evento al desmontar el componente
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <group {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, rotationY, 0]}>
          <group
            name="9a5d16d7761b4d44a780ec5257c393effbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={4}>
            <group name="RootNode">
              <group name="Key9" rotation={[-1.858, -0.64, 0.105]}>
                <mesh
                  name="Key9_Key9_0"
                  geometry={nodes.Key9_Key9_0.geometry}
                  material={materials.Key9}
                  castShadow
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

export default Key;

useGLTF.preload('models-3d/key.glb');
