const LightsInic = () => {

    return (
        <>
            <ambientLight color={"yellow"} intensity={20} />
            <directionalLight 
            color={"yellow"} 
            position={[0, 20, 5]} 
            intensity={80}
            shadow-mapSize={[1024, 1024]}
            shadow-camera-far={50}
            shadow-camera-left={-1}
            shadow-camera-right={1}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
            castShadow
            />
            <pointLight
                color={"yellow"}
                position={[2, 10, 1]}
                intensity={70}
                castShadow
            />

        
        </>
    );
};

export default LightsInic;