import { Html } from "@react-three/drei";

const SoluDef = () => {
    return (
        <Html
            center
            transform
            position={[0, 7, 0]}
            rotation={[0, -0.3, 0]}
            style={{
                fontSize: 9,
                color: 'beige',
                textShadow: '0px 1px 8px black',
                maxWidth: '280px',
                textAlign: 'justify'
            }}
        >
            <h2> Soluciones </h2>
           </Html>
    );
};

export default SoluDef;