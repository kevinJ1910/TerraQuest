import { Html } from "@react-three/drei";

const PropInic = ({ closeProp }) => {
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
            <h2>El propósito de este sitio web es concientizar a fondo sobre dos de estos problemas medioambientales en específico, en este caso son la Deforestación y la Erosión del suelo. La deforestación es la eliminación o destrucción de áreas boscosas, generalmente causada por actividades humanas como la agricultura, la urbanización, la minería y la tala. La erosión es el desgaste y la pérdida del suelo debido a la acción del agua, el viento o actividades humanas, lo que reduce su fertilidad y capacidad para sustentar vida. Cada uno tiene su sección dedicada donde se trata el impacto de estos problemas y proponemos una posible solución a ellos.</h2>
            
            {/* Botón para cerrar el texto */}
            <button 
                onClick={closeProp}
                style={{
                    position: "fixed", 
                    top: "330px", 
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

export default PropInic;

