import React, { useRef } from 'react'
import { useGLTF, } from '@react-three/drei'

const Paper = (props) => {
    const { nodes, materials } = useGLTF("models-3d/paper.glb")
    return (
      <group {...props} dispose={null}>
        <group name="Sketchfab_Scene">
          <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
            <group name="Collada_visual_scene_group" rotation={[Math.PI / 2, 0, 0]}>
              <group
                name="SM_A4_paper_fold_2"
                position={[0.142, 0.372, 28.678]}
                rotation={[-Math.PI / 2, 0.96, 0]}
                scale={100}>
                <mesh
                  name="defaultMaterial"
                  castShadow
                  receiveShadow
                  geometry={nodes.defaultMaterial.geometry}
                  material={materials.T_paper_1001}
                />
              </group>
              <group
                name="SM_A4_paper_crumbled"
                position={[-0.121, 4.017, -54.602]}
                rotation={[-0.96, 0, Math.PI / 9]}
                scale={100}>
                <mesh
                  name="defaultMaterial_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.defaultMaterial_1.geometry}
                  material={materials.T_paper_1001}
                />
              </group>
              <group
                name="SM_A4_paper_fold_1"
                position={[-1.058, 3.082, -1.413]}
                rotation={[-Math.PI / 2, 0, -0.262]}
                scale={100}>
                <mesh
                  name="defaultMaterial_2"
                  castShadow
                  receiveShadow
                  geometry={nodes.defaultMaterial_2.geometry}
                  material={materials.T_paper_1001}
                />
              </group>
              <group
                name="SM_A4_paper_pile"
                position={[0, 2.321, -27.447]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}>
                <mesh
                  name="defaultMaterial_3"
                  castShadow
                  receiveShadow
                  geometry={nodes.defaultMaterial_3.geometry}
                  material={materials.T_paper_1001}
                />
              </group>
              <group
                name="SM_A4_paper"
                position={[0, 0, 58.911]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}>
                <mesh
                  name="defaultMaterial_4"
                  castShadow
                  receiveShadow
                  geometry={nodes.defaultMaterial_4.geometry}
                  material={materials.T_paper_1001}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
  )
};

export default Paper;

useGLTF.preload("models-3d/paper.glb")