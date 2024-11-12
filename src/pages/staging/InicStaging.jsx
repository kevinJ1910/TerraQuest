import { Environment} from "@react-three/drei";

const InicStaging = () => {
    return (
        <>
            <Environment
                files={"/hdris/sky/sky_2k.hdr"}
                background={true}
            />
        </> 
    );
};

export default InicStaging;