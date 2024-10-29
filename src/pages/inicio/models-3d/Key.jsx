import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const  Key = (props) => {
  const { nodes, materials } = useGLTF('models-3d/key.glb')
  return (
    <group {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="9a5d16d7761b4d44a780ec5257c393effbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.025}>
            <group name="RootNode">
              <group name="Key9" rotation={[-1.858, -0.64, 0.105]}>
                <mesh
                  name="Key9_Key9_0"
                  geometry={nodes.Key9_Key9_0.geometry}
                  material={materials.Key9}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

export default Key;

useGLTF.preload('models-3d/key.glb')