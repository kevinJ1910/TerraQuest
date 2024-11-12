import { useGLTF } from "@react-three/drei";


const Swamp = (props) => {
  const { nodes, materials } = useGLTF("models-3d/swamp.glb");
  

 return (
  <group {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="map_1objcleaner">
            <mesh
              name="Object_2"
              castShadow
              receiveShadow
              geometry={nodes.Object_2.geometry}
              material={materials.map_1blinn6SG}
            />
            <mesh
              name="Object_3"
              castShadow
              receiveShadow
              geometry={nodes.Object_3.geometry}
              material={materials.map_1lambert4SG}
            />
            <mesh
              name="Object_4"
              castShadow
              receiveShadow
              geometry={nodes.Object_4.geometry}
              material={materials.map_1object}
            />
            <mesh
              name="Object_5"
              castShadow
              receiveShadow
              geometry={nodes.Object_5.geometry}
              material={materials.map_1object}
            />
            <mesh
              name="Object_6"
              castShadow
              receiveShadow
              geometry={nodes.Object_6.geometry}
              material={materials.map_1lambert5SG}
            />
          </group>
        </group>
      </group>
    </group>
 )
};

export default Swamp;

useGLTF.preload("models-3d/swamp.glb");