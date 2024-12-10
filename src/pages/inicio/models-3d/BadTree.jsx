import React, { useRef } from 'react'
import { useGLTF, } from '@react-three/drei'

const BadTree = (props) => {
    const group = useRef()
    const { nodes, materials } = useGLTF("models-3d/badtree.gltf")
  
  return (
    <group ref={group} {...props} dispose={null}>
        <mesh 
        geometry={nodes.treeD_graveyard.geometry} 
        material={materials['DarkWood.015']} 
        castShadow
        receiveShadow/>
    </group>
  )
};

export default BadTree;

useGLTF.preload("models-3d/badtree.gltf")