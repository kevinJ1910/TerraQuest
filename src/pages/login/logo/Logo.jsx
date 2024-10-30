import { Circle } from "@react-three/drei";
import * as THREE from "three";
import {useRef} from "react";
import { useFrame } from "@react-three/fiber";

/**
 * Componente Logo
 * Renderiza un logotipo en 3D en forma de círculo que flota en un movimiento suave.
 */
const Logo = () => {
    // Cargar la textura del logo desde una ruta local.
    const texture = new THREE.TextureLoader().load("src/assets/images/logo.png");

    // Crear una referencia para el logo que se usará para aplicar animaciones.
    const logoRef = useRef();

    // Aplica un movimiento vertical oscilante al logo, usando el tiempo de reloj para una animación suave.
    useFrame((state) => {
        if (logoRef.current) {
            // Mueve el logo en el eje Y en función del tiempo transcurrido.
            logoRef.current.position.y = 213 + Math.sin(state.clock.getElapsedTime() * 2) * 5;
        }
    });

    return (
        <Circle
            ref={logoRef} // Asigna la referencia para poder manipular la posición del logo.
            args={[39, 32]} // Configura el tamaño: radio de 39 y 32 segmentos.
            position={[-200, 213, 0]} // Posiciona el logo en el espacio 3D.
        >
            {/* Aplica la textura del logo a la superficie del círculo. */}
            <meshBasicMaterial attach="material" map={texture} />
        </Circle>
    );
};

export default Logo;