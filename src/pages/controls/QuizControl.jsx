import { OrbitControls } from "@react-three/drei";

const QuizControl = () => {
    return (
        <OrbitControls
        enableZoom={false}
        enableRotate={false}
        />
    );
};

export default QuizControl;