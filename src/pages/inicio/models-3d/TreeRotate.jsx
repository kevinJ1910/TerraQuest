import React, { useRef } from 'react'
import { useGLTF, } from '@react-three/drei'
import { useAnimations } from '@react-three/drei';
const TreeRotate = (props) => {
  const group = useRef()
  const { nodes, materials } = useGLTF("models-3d/tree.gltf")
  
  return (
    <group ref={group} {...props} dispose={null} >
        <mesh 
        geometry={nodes['tree-spruce'].geometry} 
        material={materials.color_main}
        rotation={[1.3, 0, 1]}
        castShadow
        receiveShadow
        />
    </group>
  )
};

export default TreeRotate;

useGLTF.preload("models-3d/tree.gltf")