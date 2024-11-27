import React, { useRef } from 'react'
import { useGLTF, } from '@react-three/drei'

const Composta = (props) => {
    const group = useRef()
    const { nodes, materials } = useGLTF("models-3d/composta.gltf")
    return (
      <group ref={group} {...props} dispose={null}>
    <mesh 
    geometry={nodes.bagFlat.geometry} 
    material={materials.brownLight} 
    castShadow
    receiveShadow
    />

      </group>
  )
};

export default Composta;

useGLTF.preload("models-3d/composta.gltf")
