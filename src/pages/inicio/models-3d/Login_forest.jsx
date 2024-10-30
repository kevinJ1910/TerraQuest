import { useGLTF } from "@react-three/drei";

const LoginForest = (props) => {
  const { nodes, materials } = useGLTF("models-3d/forest-scene.glb");

 return (
    <group {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="ForestSceneobjcleaner">
            <mesh
              name="Object_2"
              castShadow
              receiveShadow
              geometry={nodes.Object_2.geometry}
              material={materials.Material__24}
            />
            <mesh
              name="Object_3"
              castShadow
              receiveShadow
              geometry={nodes.Object_3.geometry}
              material={materials.Material__45}
            />
            <mesh
              name="Object_4"
              castShadow
              receiveShadow
              geometry={nodes.Object_4.geometry}
              material={materials.Material__1}
            />
            <mesh
              name="Object_5"
              castShadow
              receiveShadow
              geometry={nodes.Object_5.geometry}
              material={materials.Material__20}
            />
            <mesh
              name="Object_6"
              castShadow
              receiveShadow
              geometry={nodes.Object_6.geometry}
              material={materials.Material__21}
            />
            <mesh
              name="Object_7"
              castShadow
              receiveShadow
              geometry={nodes.Object_7.geometry}
              material={materials.Material__22}
            />
            <mesh
              name="Object_8"
              castShadow
              receiveShadow
              geometry={nodes.Object_8.geometry}
              material={materials.Material__23}
            />
            <mesh
              name="Object_9"
              castShadow
              receiveShadow
              geometry={nodes.Object_9.geometry}
              material={materials.Material__43}
            />
          </group>
        </group>
      </group>
    </group>
 )
};

export default LoginForest;

useGLTF.preload("models-3d/the_orange_tree.glb");