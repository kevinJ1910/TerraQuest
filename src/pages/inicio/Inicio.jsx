import Header from "../../components/header/Header";
import "./Inicio.css";
import { Canvas } from "@react-three/fiber";
import Forest from "./models-3d/Forest";
import Controls from "../controls/Controls";
import { Center, Text, Text3D } from "@react-three/drei";

const Inicio = () => {

  const cameraSettings = {
    position: [-1.05, 0, 1],
    fov: 90,
  }
  return (
    <>
    <Header />
    <div className="inicio-container">
      <Canvas camera={cameraSettings}>
        <Controls />
        <ambientLight />
        <directionalLight position={[10, 10, 10]} intensity={5} />
        <Text
          font = "/fonts/retroica.ttf"
          fontSize={0.09}
          lineHeight={1.5}
          color="#CD3A00"
          position={[-1.6, 0, -1.5]}
          >
          {`La Tierra ha estado viva apróximadamente 4600 millones de años y, \n a través del tiempo sus ecosistemas se han conservado casi  \n a la perfección por sus capacidades de evolución, adaptación y \n perduración a través del tiempo. No obstante, la intervención humana \n es tan impactante en el medio ambiente que su capacidad de \n resilencia se ve fuertemente afectada,ocasionando distintos \n problemas serios en este que deben ser tratados con prioridad \n por el ser humano para reducir el daño que pueden realizar \n al planeta al corto y largo plazo.`}
        </Text>
        <Forest />
        <Text
          font = "/fonts/retroica.ttf"
          fontSize={0.09}
          lineHeight={1.5}
          color="#CC7927"
          position={[1.5, 0, 2.4]}
          rotation={[Math.PI*0.5,Math.PI*1.5,Math.PI*0.5]}
          
          >
          {`El propósito de este sitio web es concientizar a fondo sobre dos de estos \n problemas medioambientales en específico, en este caso son la  \n Deforestación y la \n Erosión del suelo. \n Cada uno tiene su sección dedicada donde se trata el impacto de estos \n problemas y proponemos una posible solución a ellos.`}
        </Text>
      </Canvas>
    </div>
    </>
    
  );
};


export default Inicio;