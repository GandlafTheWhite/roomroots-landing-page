import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import TreeCharacter from './TreeCharacter';

interface TreeSceneProps {
  emotion: 'idle' | 'greeting' | 'thinking' | 'happy' | 'presenting';
}

export default function TreeScene({ emotion }: TreeSceneProps) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#0a0e0d' }}>
      <Canvas
        camera={{ position: [0, 1, 3], fov: 50 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#0a0e0d']} />
        
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <pointLight position={[-3, 2, -3]} intensity={0.3} color="#ff9d5c" />
        
        <Suspense fallback={null}>
          <TreeCharacter emotion={emotion} />
          
          <ContactShadows
            position={[0, -0.5, 0]}
            opacity={0.4}
            scale={3}
            blur={2}
            far={1}
          />
        </Suspense>
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}