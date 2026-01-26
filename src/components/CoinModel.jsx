import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'

function Coin() {
  const { scene } = useGLTF('/models/coin_animation.glb')
  return <primitive object={scene} scale={1.2} />
}

export default function CoinModel() {
  return (
    <div className="w-40 h-40 mx-auto">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <Coin />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  )
}
