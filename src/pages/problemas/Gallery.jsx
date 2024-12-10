import React from "react";
import { Canvas } from "@react-three/fiber";
import { Center, Text3D, Text } from "@react-three/drei";
import Header from "../../components/header/Header";
import useStore from "../../stores/use-quiz-store";
import "./Gallery.css";

const Gallery = () => {
  const rewards = useStore((state) => state.rewards);

  return (
    <>
      <Header />
      <div className="inicio-container">
        <Canvas>
          <Center position={[0, 0, 0]}>

            {/* Luz para iluminar los textos */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />

          {/* Título en 3D */}
          <Text3D
            font="fonts/Farek.json" // Ruta a la fuente JSON
            size={0.5} // Tamaño del texto
            height={0.2} // Profundidad del texto
            curveSegments={12} // Suavidad de las curvas
            position={[0, 2, 0]} // Posición del texto
          >
            Recompensas Coleccionables
            <meshStandardMaterial color="orange" />
          </Text3D>

          {/* Lista de recompensas en 3D */}
          {rewards.map((reward, index) => (
            <Text
              key={index}
              position={[4.5, 1 - index * 0.5, 0]} // Distribuye verticalmente los textos
              fontSize={0.3}
              color="black"
              anchorX="center"
              anchorY="middle"
            >
              {reward}
            </Text>
          ))}
          </Center>
        </Canvas>
      </div>
    </>
  );
};

export default Gallery;