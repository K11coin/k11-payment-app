import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { useRef } from "react";

function CoinModel() {
  const ref = useRef();
  const { scene } = useGLTF("/src/assets/coin_animation.glb");

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={1.1}
      position={[0, 0, 0]}
    />
  );
}

export default function K11Coin() {
  return (
    <div className="w-full h-[180px]">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <CoinModel />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
