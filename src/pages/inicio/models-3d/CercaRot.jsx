import React, { useRef } from 'react'
import { useGLTF, } from '@react-three/drei'

const CercaRot = (props) => {
    const { nodes, materials } = useGLTF("models-3d/cerca.glb")
    return (
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.material_0}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={0.013}
        />
      </group>
  )
};

export default CercaRot;

useGLTF.preload("models-3d/cerca.glb")