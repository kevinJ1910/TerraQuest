import React, { useRef } from 'react'
import { useGLTF, } from '@react-three/drei'

const LampPost = (props) => {
    const group = useRef();
    const { nodes, materials } = useGLTF("models-3d/Lamp_Post.gltf");
  
    return (
      <group ref={group} {...props} dispose={null} >
        <mesh
          geometry={nodes.Cylinder096.geometry}
          material={materials["Black.012"]}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.Cylinder096_1.geometry}
          material={materials["Yellow.007"]}
          castShadow
          receiveShadow
        />
      </group>
  )
};

export default LampPost;

useGLTF.preload("models-3d/Lamp_Post.gltf")