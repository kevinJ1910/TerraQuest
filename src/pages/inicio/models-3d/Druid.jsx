import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

const Druid = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("models-3d/druid.gltf");

  const { actions, mixer } = useAnimations(animations, group);

  useEffect(() => {
    // Verifica si la animación "PortalOpen" existe antes de reproducirla
    if (actions["PortalOpen"]) {
      actions["PortalOpen"].play();
      actions["PortalOpen"].reset();  // Restablece la animación si ya fue ejecutada previamente
    }
    
    // Ajusta la velocidad de la animación si es necesario
    mixer.timeScale = 1.8;

    return () => {
      // Limpia la animación cuando el componente se desmonte
      if (actions["PortalOpen"]) {
        actions["PortalOpen"].stop();
      }
    };
  }, [actions, mixer]);

  return (
    <group 
    ref={group} 
    {...props} 
    dispose={null}
    rotation={[0, Math.PI / 1, 0]}>
      <group scale={1.91}>
        <primitive object={nodes.root} />
        <skinnedMesh 
          geometry={nodes.druid.geometry} 
          material={materials.color_main} 
          skeleton={nodes.druid.skeleton} 
          castShadow
          receiveShadow
        />
      </group>
    </group>
  );
};

export default Druid;

useGLTF.preload("models-3d/druid.gltf");


