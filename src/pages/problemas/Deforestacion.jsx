import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import Header from "../../components/header/Header";
import Swamp from "../inicio/models-3d/Swamp";
import DeforControls from "../controls/DeforControls";
import "./Deforestacion.css";
import Lights from "../lights/Lights";
import Staging from "../staging/Staging";
import IntroDefor from "../texts/IntroDefor";

const Deforestacion = () => {

    return (
        <>
            <Header />
            <div className="container-defor">
                <Canvas camera={{ position: [0, 5, 33], fov: 90 }}>
                    <Lights />
                    <DeforControls />
                    <Swamp/>
                    <primitive object={new THREE.AxesHelper(100)} /> {/* Tamaño de los ejes */}
                    <Staging />
                    <IntroDefor />
                </Canvas>
            </div>
        </>
    );
};

export default Deforestacion;
