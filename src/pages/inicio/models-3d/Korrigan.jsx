import React, { useEffect, useRef } from 'react'
import { useGLTF, } from '@react-three/drei'
import { useAnimations } from '@react-three/drei';

const Korrigan = (props) => {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF("models-3d/YoungKorrigan.gltf")
    const { actions, mixer } = useAnimations(animations, group)

    useEffect(() => {
        actions["course_jeune"].play();
        mixer.timeScale = 1.8;
    }, []);

    return (
      <group ref={group} {...props} dispose={null}>
          <group rotation={[0, 0.03, 0,]} scale={0.15} >
              <primitive object={nodes.root} />
              <skinnedMesh 
              geometry={nodes.Jeune.geometry} 
              material={materials['color_main.003']} 
              skeleton={nodes.Jeune.skeleton} 
              castShadow
              receiveShadow/>
          </group>
      </group>
    )
};

export default Korrigan;

useGLTF.preload("models-3d/YoungKorrigan.gltf")
