import { usePlane } from "@react-three/cannon";

const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -1.12, 0],
    
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[200, 130]} />
      <meshStandardMaterial color="#2da551" />
    </mesh>
  );
};

export default Ground;