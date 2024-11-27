import React, { useRef } from 'react'
import { useGLTF, } from '@react-three/drei'

const Planta = (props) => {
    const group = useRef()
    const { nodes, materials } = useGLTF("models-3d/planta.gltf")
    return (
      <group ref={group} {...props} dispose={null}>
            <mesh 
            geometry={nodes.Mesh_cabbage.geometry} 
            material={materials.green} 
            castShadow
            receiveShadow/>
            <mesh 
            geometry={nodes.Mesh_cabbage_1.geometry} 
            material={materials._defaultMat}
            castShadow
            receiveShadow />
            
      </group>
  )
};

export default Planta;

useGLTF.preload("models-3d/planta.gltf")
