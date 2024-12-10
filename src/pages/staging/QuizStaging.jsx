import { Cloud, Environment, Sky, Sparkles, Stars } from "@react-three/drei";

const QuizStaging = () => {
    return (
        <>
            <Sky 
                sunPosition={[0, 0, -1]}
                inclination={0.2}
                azimuth={180}
                mieCoefficient={0.005}
                elevation={5}
                rayleigh={2}
                turbidity={20}
            />
            
            <Cloud
                seed={7}
                scale={2}
                volume={5}
                fade={100}
                segments={90}
                bounds={[45, 2, 20]}
                position={[0, 37, -20]}
                opacity={1}
                growth={17}
                speed={0.5}
                concentrate={"inside"}
            />
            <Cloud
                seed={7}
                scale={1.5}
                volume={20}
                fade={10}
                segments={90}
                bounds={[10, 10, 80]}
                position={[115, 6, 0]}
                opacity={1}
                growth={17}
                speed={0.5}
                concentrate={"inside"}
            />

            <Cloud
                seed={7}
                scale={1.5}
                volume={15}
                fade={5}
                segments={90}
                bounds={[10, 10, 40]}
                position={[-80, 8, 0]}
                opacity={1}
                growth={17}
                speed={0.5}
                concentrate={"inside"}
                color="red"
            />

            <Cloud
                seed={7}
                scale={1.5}
                volume={15}
                fade={5}
                segments={90}
                bounds={[9, 10, 1]}
                position={[-60, 8, 30]}
                opacity={1}
                growth={17}
                speed={0.5}
                concentrate={"inside"}
                color="red"
            />

            <Stars 
                radius={100}
                depth={600}
                factor={1}
                saturation={0}
                fade={1}
                speed={1}
            />
        </>
    );
};

export default QuizStaging;