import { Html } from "@react-three/drei";

const SensDef = () => {
    return (
        <Html
            center
            transform
            position={[-1, 3, 14.8]}
            rotation={[0, 1.3, 0]}
            style={{
                fontSize: 9,
                color: 'beige',
                textShadow: '0px 1px 8px black',
                maxWidth: '280px',
                textAlign: 'justify'
            }}
        >
            <h2> ¿Sabías que la deforestación no solo elimina árboles, sino que afecta profundamente el clima y la biodiversidad?  </h2>
            <p
            style={{
                fontSize: 10,
                color: 'beige',            }}
            > Los bosques regulan el clima al capturar CO₂, albergan millones de especies y mantienen los suelos y las fuentes de agua estables. Sin ellos, el calentamiento global se acelera, la erosión del suelo aumenta y desaparecen hábitats vitales para muchas especies. Proteger y restaurar los bosques es clave para un futuro sostenible y saludable, ya que ellos juegan un papel fundamental en el equilibrio de nuestro planeta.</p>
        </Html>
    );
};

export default SensDef;