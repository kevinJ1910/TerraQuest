import { Html } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

const SoluDef = () => {

    const navigate = useNavigate();

    const goToSection = () => {
        navigate("/Sensibilidad");
    };
    return (
        <Html
            center
            transform
            position={[0, 7, 0]}
            rotation={[0, -0.3, 0]}
            style={{
                fontSize: 8,
                color: 'beige',
                textShadow: '0px 1px 8px black',
                maxWidth: '200px',
                textAlign: 'center'
            }}
        >
            <h2> Soluciones </h2>
            <h2
            style={{
                fontSize: 10,
                color: 'beige',
            }}
            > Aprende más sobre las soluciones para combatir estos desafíos presionando el botón a continuación</h2>
            <button
                onClick={goToSection}
                style={{
                    marginTop: '5px',
                    padding: '5px 8px',
                    background: 'darkgreen',
                    color: 'beige',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '11px',
                }}
            >
                Aprende más
            </button>
           </Html>
    );
};

export default SoluDef;