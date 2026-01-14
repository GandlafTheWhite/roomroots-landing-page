import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import TreeCharacter from './TreeCharacter';

interface TreeSceneProps {
  emotion: 'idle' | 'greeting' | 'thinking' | 'happy' | 'presenting';
}

function Loader() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-950 to-slate-900">
      <div className="text-center">
        <div className="text-9xl mb-8 animate-bounce">🌿</div>
        <p className="text-white/40 text-sm">Загружаю дерево...</p>
      </div>
    </div>
  );
}

export default function TreeScene({ emotion }: TreeSceneProps) {
  return (
    <div className="w-full h-full" style={{ background: 'linear-gradient(to bottom right, #020617, #0f172a)' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        shadows
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={0.8}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-5, 5, -5]} intensity={0.3} color="#9dff9d" />
          
          <TreeCharacter emotion={emotion} />
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}