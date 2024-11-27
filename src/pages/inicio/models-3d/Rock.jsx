import React, { useRef } from 'react'
import { useGLTF, } from '@react-three/drei'

const Rock = (props) => {
    const group = useRef();
    const { nodes, materials } = useGLTF("models-3d/Rock.gltf");

    return (
      <group ref={group} {...props} dispose={null} >
        <mesh
          geometry={nodes.menhir_mini.geometry}
          material={materials["color_main.001"]}
          castShadow
          receiveShadow
        />
      </group>
    )
};

export default Rock;

useGLTF.preload("models-3d/Rock.gltf")