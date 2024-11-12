import { Html } from "@react-three/drei";

const IntroInic = ({ closeIntro }) => {
    return (
        <Html
            center
            transform
            position={[-13, 0, 15]}
            rotation={[Math.PI / -3, -0.5, -0.68]} 
            style={{
                fontSize: 19,
                color: 'beige',
                textShadow: '0px 1px 8px black',
                textAlign: 'justify',
                maxWidth: '800px'
            }}
        >
            <h2>La Tierra ha estado viva apróximadamente 4600 millones de años y, a través del tiempo sus ecosistemas se han conservado casi a la perfección por sus capacidades de evolución, adaptación y perduración a través del tiempo. No obstante, la intervención humana es tan impactante en el medio ambiente que su capacidad de resilencia se ve fuertemente afectada, ocasionando distintos problemas serios en este que deben ser tratados con prioridad por el ser humano para reducir el daño que pueden realizar al planeta al corto y largo plazo.</h2>
            
            {/* Botón para cerrar el texto */}
            <button 
                onClick={closeIntro}
                style={{
                    position: "fixed", 
                    top: "270px", 
                    left: "600px", 
                    backgroundColor: "#1e6f57", 
                    color: "white", 
                    border: "none", 
                    padding: "10px",
                    cursor: "pointer",
                    width: "150px",
                    letterSpacing: "2px",
                }}
            >
                Cerrar
            </button>
        </Html>
    );
};

export default IntroInic;

