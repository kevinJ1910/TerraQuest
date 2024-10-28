import Header from "../../components/header/header";
import "./Inicio.css";
import { Canvas } from "@react-three/fiber";
import Forest from "./models-3d/Forest";
import { OrbitControls } from "@react-three/drei";

const Inicio = () => {
  return (
    <>
    <Header />
    <div className="inicio-container">
      <Canvas>
        <OrbitControls />
        <ambientLight />
        <directionalLight position={[10, 10, 10]} intensity={5} />
        <Forest />
      </Canvas>
    </div>
    </>
    
  );
};


export default Inicio;