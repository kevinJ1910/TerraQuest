import { Html } from "@react-three/drei";

const IntroDefor = () => {
    return (
        <Html
            center
            transform
            position={[0, 5, 27]}
            style={{
                fontSize: 13,
                color: 'beige',
                textShadow: '0px 1px 8px black',
                maxWidth: '400px',
                textAlign: 'justify'
            }}
        >
            <h2> La deforestación es la acción de la tala masiva de árboles en un territorio con alta masa de estos, con el objetivo de cambiar el propósito al que se va a dedicar dicho suelo. Esta acción trae consecuencias adversas que son dañinas para el propio ecosistema y que, a la larga termina perjudicando más el bienestar de la humanidad. </h2>
            
        </Html>
    );
};

export default IntroDefor;
