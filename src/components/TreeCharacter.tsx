import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TreeCharacterProps {
  emotion: 'idle' | 'greeting' | 'thinking' | 'happy' | 'presenting';
}

export default function TreeCharacter({ emotion }: TreeCharacterProps) {
  const treeGroupRef = useRef<THREE.Group>(null);
  const mossRef = useRef<THREE.Mesh>(null);
  const leavesRefs = useRef<THREE.Mesh[]>([]);

  const branches = useMemo(() => {
    const branchData = [];
    const branchCount = 8;
    
    for (let i = 0; i < branchCount; i++) {
      const angle = (i / branchCount) * Math.PI * 2;
      const height = 0.8 + Math.random() * 0.4;
      const radius = 0.3 + Math.random() * 0.2;
      
      branchData.push({
        angle,
        height,
        radius,
        twist: Math.random() * 0.5,
      });
    }
    return branchData;
  }, []);

  const leaves = useMemo(() => {
    const leafData = [];
    const leafCount = 30;
    
    for (let i = 0; i < leafCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 0.3 + Math.random() * 0.5;
      const height = 1.2 + Math.random() * 0.8;
      
      leafData.push({
        position: [
          Math.cos(angle) * distance,
          height,
          Math.sin(angle) * distance,
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI,
        ] as [number, number, number],
        scale: 0.08 + Math.random() * 0.06,
      });
    }
    return leafData;
  }, []);

  useFrame((state) => {
    if (!treeGroupRef.current) return;

    const time = state.clock.getElapsedTime();

    switch (emotion) {
      case 'idle':
        treeGroupRef.current.rotation.y = Math.sin(time * 0.3) * 0.05;
        treeGroupRef.current.position.y = Math.sin(time * 0.5) * 0.02;
        break;

      case 'greeting':
        treeGroupRef.current.rotation.z = Math.sin(time * 3) * 0.15;
        treeGroupRef.current.position.y = 0.1 + Math.sin(time * 4) * 0.05;
        break;

      case 'thinking':
        treeGroupRef.current.rotation.y = Math.sin(time * 0.8) * 0.2;
        break;

      case 'happy':
        treeGroupRef.current.position.y = Math.abs(Math.sin(time * 2)) * 0.15;
        treeGroupRef.current.scale.setScalar(1 + Math.sin(time * 4) * 0.03);
        break;

      case 'presenting':
        treeGroupRef.current.rotation.x = Math.sin(time * 5) * 0.1;
        treeGroupRef.current.rotation.z = Math.cos(time * 5) * 0.1;
        break;
    }

    leavesRefs.current.forEach((leaf, i) => {
      if (leaf) {
        leaf.rotation.z = Math.sin(time * 0.5 + i) * 0.1;
        leaf.position.y += Math.sin(time * 2 + i * 0.5) * 0.001;
      }
    });
  });

  return (
    <group ref={treeGroupRef} position={[0, -0.5, 0]}>
      <mesh position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial
          color="#2d5016"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      <mesh ref={mossRef} position={[0, 0, 0]}>
        <dodecahedronGeometry args={[0.45, 1]} />
        <meshStandardMaterial
          color="#4a7c59"
          roughness={1}
          metalness={0}
        />
      </mesh>

      {branches.map((branch, i) => {
        const x = Math.cos(branch.angle) * branch.radius;
        const z = Math.sin(branch.angle) * branch.radius;
        
        return (
          <group key={i} position={[x, 0.3, z]}>
            <mesh rotation={[branch.twist, branch.angle, 0]}>
              <cylinderGeometry args={[0.02, 0.04, branch.height, 6]} />
              <meshStandardMaterial color="#3d2817" roughness={0.8} />
            </mesh>
          </group>
        );
      })}

      {leaves.map((leaf, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) leavesRefs.current[i] = el;
          }}
          position={leaf.position}
          rotation={leaf.rotation}
          scale={leaf.scale}
        >
          <sphereGeometry args={[1, 6, 6]} />
          <meshStandardMaterial
            color="#5c8a4d"
            roughness={0.7}
            metalness={0.1}
          />
        </mesh>
      ))}

      <pointLight position={[0, 1.5, 0]} intensity={0.3} color="#9dff9d" />
    </group>
  );
}