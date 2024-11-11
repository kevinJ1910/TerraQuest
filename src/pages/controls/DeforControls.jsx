import { OrbitControls } from "@react-three/drei";

const DeforControls = () => {
    return (
        <OrbitControls
        rotateSpeed={1} // Ajusta la velocidad de rotación
        panSpeed={1} // Ajusta la velocidad del paneo
        enableZoom={true}
        />
    );
};

export default DeforControls;