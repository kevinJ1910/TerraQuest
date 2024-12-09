import { Html } from "@react-three/drei";

const QuizExpl = () => {
    return (
        <Html
            center
            transform
            position={[110, 3, 0]}
            rotation={[0, -1.56, 0]}
            style={{
                fontSize: 30,
                color: 'beige',
                textShadow: '0px 1px 8px black',
                maxWidth: '1000px',
                textAlign: 'justify',
            }}
        >
            <h2>
                ¡Bienvenido al Quiz Interactivo de Conservación del Bosque! 🌳

            </h2>
            <p
                style={{
                    fontSize: 30,
                    color: 'beige',
                }}
            >
                En este quiz, participarás en dos importantes misiones para salvar y preservar un bosque en peligro. Cada misión tiene un objetivo específico y requiere tu interacción para resolver problemas ambientales reales.
            </p>

            <h3>
            ¿Cómo Navegar?
            </h3>

            <div
            style={{
                fontSize: 30,
                color: 'beige',
            }}>
                <p>Usa las teclas "W" o "↑" para avanzar a la siguiente misión.</p>
                <p>Usa las teclas "S" o "↓" para regresar a la misión anterior.</p>
            </div>

            <h3>
            ¡Consejos!
            </h3>

            <div
            style={{
                fontSize: 30,
                color: 'beige',
            }}>
                <p>Completa cada misión a tu propio ritmo, pero recuerda: algunas tareas tienen un tiempo límite.</p>
                <p>Cada acción que realices contribuye al cuidado del medio ambiente virtual, ¡y tus éxitos serán recompensados!</p>
            </div>

        </Html>
    );
};

export default QuizExpl;