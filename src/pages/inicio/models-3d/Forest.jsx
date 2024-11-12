import { useGLTF } from "@react-three/drei";
import React, { useState, useEffect } from 'react';

const Tree = (props) => {
  const { nodes, materials } = useGLTF("models-3d/the_orange_tree.glb");
  
  const [rotationY, setRotationY] = useState(0); // Estado para la rotación en el eje Y

  const minRotation = -Math.PI / 0.8; // Rango mínimo de rotación
  const maxRotation = Math.PI / 200;  // Rango máximo de rotación

  useEffect(() => {
    // Función para manejar el evento de desplazamiento del mouse
    const handleWheel = (event) => {
      // Ajusta el valor de rotación según la dirección de desplazamiento
      setRotationY(prevRotationY => {
        // Limita la rotación en el eje Y
        const newRotationY = prevRotationY + event.deltaY * 0.0009;
        // Asegura que el valor de rotación esté dentro del rango permitido
        return Math.max(minRotation, Math.min(maxRotation, newRotationY));
      });
    };

    // Agrega el evento al desplazar el mouse
    window.addEventListener('wheel', handleWheel);

    // Limpia el evento al desmontar el componente
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  
 return (
    <group {...props} dispose={null}>
    <group rotation={[-Math.PI / 2, 0, 0]} scale={0.022}>
      <group 
      name="Tree" 
      rotation={[Math.PI / 2, rotationY, 0]} 
      scale={1}
      >
        <group
          position={[-140.188, -270.245, -184.251]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Grass_Material007_0.geometry}
            material={materials['Material.007']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Grass_Material007_0_1.geometry}
            material={materials['Material.007']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Grass_Material007_0_2.geometry}
            material={materials['Material.007']}
          />
        </group>
        <group position={[-119.73, -55.157, 175.091]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Tree_Material009_0.geometry}
            material={materials['Material.009']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Tree_Material009_0_1.geometry}
            material={materials['Material.009']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Tree_Material009_0_2.geometry}
            material={materials['Material.009']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Tree_Material009_0_3.geometry}
            material={materials['Material.009']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Tree_Material009_0_4.geometry}
            material={materials['Material.009']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Tree_Material009_0_5.geometry}
            material={materials['Material.009']}
          />
        </group>
        <group
          position={[-140.188, -270.245, -184.251]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.GrassRefelection_Material007_0.geometry}
            material={materials['Material.007']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.GrassRefelection_Material007_0_1.geometry}
            material={materials['Material.007']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.GrassRefelection_Material007_0_2.geometry}
            material={materials['Material.007']}
          />
        </group>
        <group
          position={[-119.73, -402.436, 175.091]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.TreeRefelection_Material009_0.geometry}
            material={materials['Material.009']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.TreeRefelection_Material009_0_1.geometry}
            material={materials['Material.009']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.TreeRefelection_Material009_0_2.geometry}
            material={materials['Material.009']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.TreeRefelection_Material009_0_3.geometry}
            material={materials['Material.009']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.TreeRefelection_Material009_0_4.geometry}
            material={materials['Material.009']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.TreeRefelection_Material009_0_5.geometry}
            material={materials['Material.009']}
          />
        </group>
        
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.WAves_Waves_0.geometry}
          material={materials.Waves}
          position={[-140.188, -270.245, -184.251]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={107.689}
        />
        
      </group>
      <group
          position={[-432.561, -59.101, 113.461]}
          rotation={[0, 0, 0]}
          scale={21735.025}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Skybox_Material012_0.geometry}
            material={materials.SkyRight}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Skybox_SkyRight_0.geometry}
            material={materials['Material.012']}
          />
          
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Moon_Moon_0.geometry}
          material={materials.Moon}
          position={[3000, 20000, 3000]}
          rotation={[Math.PI / 2, 0, Math.PI / -2]}
          scale={338.065}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sun004_Sun_0.geometry}
          material={materials.material}
          position={[19801.924, 2074.146, 3000]}
          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          scale={410.54}
        />
    </group>
  </group>
 )
};

export default Tree;

useGLTF.preload("models-3d/the_orange_tree.glb");