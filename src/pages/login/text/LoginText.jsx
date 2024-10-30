import { Center, Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const LoginText = () => {
    const textRef = useRef(); // Referencia para el texto

    // Animación en cada frame
    useFrame((state) => {
        if (textRef.current) {
            // Movimiento de arriba a abajo
            textRef.current.position.y = 213 + Math.sin(state.clock.getElapsedTime() * 2) * 5; // Mueve el texto arriba y abajo
            }
    });

    return (
        <Center position={[0, -5, 0]}>
            <Text3D
                ref={textRef} // Asigna la referencia al texto
                font="fonts/Farek.json"
                bevelEnabled
                bevelSize={1}
                bevelThickness={0.01}
                height={20}
                lineHeight={0.75}
                letterSpacing={0.05}
                size={40}
            >
                {`TerraQuest`}
                <meshStandardMaterial color="brown" />
            </Text3D>
        </Center>
    );
};

export default LoginText;
