import React, { useRef } from 'react'
import { useGLTF, } from '@react-three/drei'

const TrashCan = (props) => {
    const { nodes, materials } = useGLTF("models-3d/trash_can.glb")
  return (
    <group {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="c27265049c8c4b8ca4d9acb073e08710fbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="RootNode">
              <group
                name="TrashCan_Grey"
                position={[0, 0, -101.89]}
                rotation={[-Math.PI / 2, 0, 0]}>
                <mesh
                  name="TrashCan_Grey_TrashCan(Grey)_0"
                  castShadow
                  receiveShadow
                  geometry={nodes['TrashCan_Grey_TrashCan(Grey)_0'].geometry}
                  material={materials.TrashCanGrey}
                />
              </group>
              <group
                name="TrashCan_Black"
                position={[0, 0, -33.963]}
                rotation={[-Math.PI / 2, 0, 0]}>
                <mesh
                  name="TrashCan_Black_TrashCan(Black)_0"
                  castShadow
                  receiveShadow
                  geometry={nodes['TrashCan_Black_TrashCan(Black)_0'].geometry}
                  material={materials.TrashCanBlack}
                />
              </group>
              <group name="TrashCan_Blue" position={[0, 0, 33.963]} rotation={[-Math.PI / 2, 0, 0]}>
                <mesh
                  name="TrashCan_Blue_TrashCan(Blue)_0"
                  castShadow
                  receiveShadow
                  geometry={nodes['TrashCan_Blue_TrashCan(Blue)_0'].geometry}
                  material={materials.TrashCanBlue}
                />
              </group>
              <group
                name="TrashCan_Green"
                position={[0, 0, 101.89]}
                rotation={[-Math.PI / 2, 0, 0]}>
                <mesh
                  name="TrashCan_Green_TrashCan(Green)_0"
                  castShadow
                  receiveShadow
                  geometry={nodes['TrashCan_Green_TrashCan(Green)_0'].geometry}
                  material={materials.TrashCanGreen}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
};

export default TrashCan;

useGLTF.preload("models-3d/trash_can.glb")