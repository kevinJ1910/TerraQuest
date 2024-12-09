import React, { useRef } from 'react';
import { useGLTF, } from '@react-three/drei';

const Botella = (props) => {
    const group = useRef()
    const { nodes, materials } = useGLTF("models-3d/botella.gltf")
  
  return (
    <group ref={group} {...props} dispose={null} scale={3}>
        <mesh 
        geometry={nodes.Mesh_wineRed.geometry} 
        material={materials.brownDarkest}
        castShadow
        receiveShadow />
        <mesh 
        geometry={nodes.Mesh_wineRed_1.geometry} 
        material={materials.brownLight}
        castShadow
        receiveShadow />
        <mesh 
        geometry={nodes.Mesh_wineRed_2.geometry} 
        material={materials.brown} 
        castShadow
        receiveShadow/>
        <mesh 
        geometry={nodes.Mesh_wineRed_3.geometry} 
        material={materials.red} 
        castShadow
        receiveShadow/>
    </group>
  )
};

export default Botella;

useGLTF.preload("models-3d/botella.gltf")