import React, { useRef } from 'react'
import { useGLTF, } from '@react-three/drei'

const Tree = (props) => {
  const group = useRef()
  const { nodes, materials } = useGLTF("models-3d/tree.gltf")
  
  return (
    <group ref={group} {...props} dispose={null} >
        <mesh 
        geometry={nodes['tree-spruce'].geometry} 
        material={materials.color_main}
        castShadow
        receiveShadow
        />
    </group>
  )
};

export default Tree;

useGLTF.preload("models-3d/tree.gltf")