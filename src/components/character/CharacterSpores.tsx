import { motion } from 'framer-motion';

interface CharacterSporesProps {
  emotion: 'idle' | 'greeting' | 'thinking' | 'happy' | 'presenting' | 'surprised' | 'sad' | 'excited';
}

export function SVGDefinitions() {
  return (
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <radialGradient id="mossGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#9acd32" />
        <stop offset="50%" stopColor="#6b8e23" />
        <stop offset="100%" stopColor="#4a7c59" />
      </radialGradient>
      <pattern id="mossTexture" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="5" cy="5" r="2" fill="#85a647" opacity="0.6"/>
        <circle cx="15" cy="10" r="1.5" fill="#9acd32" opacity="0.5"/>
        <circle cx="10" cy="15" r="2.5" fill="#6b8e23" opacity="0.4"/>
      </pattern>
    </defs>
  );
}

export default function CharacterSpores({ emotion }: CharacterSporesProps) {
  if (emotion === 'thinking' || emotion === 'sad') {
    return null;
  }

  return (
    <>
      {/* СВЕТЯЩИЕСЯ СПОРЫ ВОКРУГ */}
      {Array.from({ length: 25 }).map((_, i) => {
        const angle = (i / 25) * Math.PI * 2;
        const distance = 150 + Math.random() * 80;
        const x = 250 + Math.cos(angle) * distance;
        const y = 400;
        return (
          <motion.circle
            key={`spore-${i}`}
            cx={x}
            cy={y}
            r={2.5 + Math.random() * 2.5}
            fill="#7fff00"
            filter="url(#glow)"
            initial={{ opacity: 0, y: 0 }}
            animate={{ 
              opacity: [0, 0.9, 0],
              y: [0, -60 - Math.random() * 40, -100],
              x: [0, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 50]
            }}
            transition={{ 
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeOut'
            }}
          />
        );
      })}
    </>
  );
}