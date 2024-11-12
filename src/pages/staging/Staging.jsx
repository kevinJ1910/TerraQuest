import { Cloud, Environment, Sky, Sparkles, Stars } from "@react-three/drei";

const Staging = () => {
    return (
        <>
            {/*<Environment
                ground={{
                    height: 1,
                    radius: 50,
                    scale: 100,
                }}
                files={"/hdris/sky/sky_2k.hdr"}
            /> */}
            <Sky 
                sunPosition={[0, 0, -1]}
                inclination={0.2}
                azimuth={180}
                mieCoefficient={0.005}
                elevation={5}
                rayleigh={2}
                turbidity={20}
            />
            <Sparkles 
                position={[0, 1, 20]}
                color="yellow"
                count={500}
                size={10}
                fade={false}
                speed={1.5}
                scale={20}
            />
            <Cloud
                seed={7}
                scale={2}
                volume={5}
                fade={100}
                segments={90}
                bounds={[45, 2, 2]}
                position={[0, 37, -20]}
                opacity={1}
                growth={17}
                speed={0.5}
                concentrate={"inside"}
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

export default Staging;