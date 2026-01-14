import { motion } from 'framer-motion';

interface CharacterHeadProps {
  emotion: 'idle' | 'greeting' | 'thinking' | 'happy' | 'presenting' | 'surprised' | 'sad' | 'excited';
  eyes: { shape: string; glow: number; size: number };
  mouthPath: string;
  isTalking?: boolean;
}

export default function CharacterHead({ emotion, eyes, mouthPath, isTalking = false }: CharacterHeadProps) {
  const getTalkingMouthPath = () => {
    if (emotion === 'happy') return mouthPath;
    const baseY = 345;
    return `M210 ${baseY} Q230 ${baseY + 8} 250 ${baseY}`;
  };
  
  const talkingMouth = getTalkingMouthPath();
  return (
    <>
      {/* ГОЛОВА (круглая, мшистая) */}
      <motion.g
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1 }}
      >
        <ellipse cx="250" cy="300" rx="80" ry="85" fill="url(#mossGradient)" />
        <ellipse cx="250" cy="295" rx="75" ry="80" fill="#7ba428" opacity="0.95" />
        
        {/* Текстура мха на голове */}
        <rect x="175" y="215" width="150" height="160" fill="url(#mossTexture)" opacity="0.7" rx="75"/>
        
        {/* Детальные точки мха */}
        {Array.from({ length: 60 }).map((_, i) => {
          const angle = (i / 60) * Math.PI * 2;
          const radius = 65 + Math.random() * 12;
          const x = 250 + Math.cos(angle) * radius;
          const y = 295 + Math.sin(angle) * (radius * 1.05);
          return (
            <circle
              key={`head-moss-${i}`}
              cx={x}
              cy={y}
              r={1.5 + Math.random() * 2.5}
              fill={i % 3 === 0 ? '#9acd32' : i % 3 === 1 ? '#85a647' : '#6b8e23'}
              opacity={0.7}
            />
          );
        })}

        {/* ОГРОМНЫЕ ГЛАЗА */}
        <motion.g
          animate={{ 
            scaleY: emotion === 'thinking' ? [1, 0.4, 1] : [1, 0.15, 1],
          }}
          transition={{ duration: 5, repeat: Infinity, times: [0, 0.48, 0.52] }}
        >
          {eyes.shape === 'happy' ? (
            <>
              <motion.path
                d="M195 285 Q215 300 235 285"
                stroke="#1a1a1a"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
              <motion.path
                d="M265 285 Q285 300 305 285"
                stroke="#1a1a1a"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : (
            <>
              {/* Левый глаз */}
              <g>
                <ellipse 
                  cx="215" 
                  cy="285" 
                  rx={30 * eyes.size} 
                  ry={35 * eyes.size} 
                  fill="#1a5f1a" 
                  opacity="0.95" 
                />
                <ellipse 
                  cx="215" 
                  cy="283" 
                  rx={25 * eyes.size} 
                  ry={30 * eyes.size} 
                  fill="#228b22" 
                  opacity="0.95" 
                />
                <motion.ellipse 
                  cx="215" 
                  cy="280" 
                  rx={18 * eyes.size} 
                  ry={22 * eyes.size} 
                  fill="#32cd32"
                  filter="url(#glow)"
                  animate={{ 
                    opacity: [eyes.glow * 0.7, eyes.glow, eyes.glow * 0.7],
                    fill: ['#32cd32', '#7fff00', '#32cd32']
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
                <circle cx="212" cy="273" r="4" fill="#1a1a1a" opacity="0.8" />
                <ellipse cx="222" cy="268" rx="6" ry="8" fill="#e8ffe8" opacity="0.95" />
              </g>
              
              {/* Правый глаз */}
              <g>
                <ellipse 
                  cx="285" 
                  cy="285" 
                  rx={30 * eyes.size} 
                  ry={35 * eyes.size} 
                  fill="#1a5f1a" 
                  opacity="0.95" 
                />
                <ellipse 
                  cx="285" 
                  cy="283" 
                  rx={25 * eyes.size} 
                  ry={30 * eyes.size} 
                  fill="#228b22" 
                  opacity="0.95" 
                />
                <motion.ellipse 
                  cx="285" 
                  cy="280" 
                  rx={18 * eyes.size} 
                  ry={22 * eyes.size} 
                  fill="#32cd32"
                  filter="url(#glow)"
                  animate={{ 
                    opacity: [eyes.glow * 0.7, eyes.glow, eyes.glow * 0.7],
                    fill: ['#32cd32', '#7fff00', '#32cd32']
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }}
                />
                <circle cx="282" cy="273" r="4" fill="#1a1a1a" opacity="0.8" />
                <ellipse cx="292" cy="268" rx="6" ry="8" fill="#e8ffe8" opacity="0.95" />
              </g>
            </>
          )}
        </motion.g>

        {/* УЛЫБКА */}
        <motion.path
          d={mouthPath}
          stroke="#1a1a1a"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
          animate={{
            d: isTalking
              ? [mouthPath, talkingMouth, mouthPath]
              : emotion === 'happy' 
                ? ['M190 345 Q230 370 270 345', 'M190 345 Q230 375 270 345', 'M190 345 Q230 370 270 345']
                : [mouthPath]
          }}
          transition={{ 
            duration: isTalking ? 0.3 : 0.6,
            repeat: isTalking ? Infinity : emotion === 'happy' ? Infinity : 0,
            ease: 'easeInOut'
          }}
        />
      </motion.g>

      {/* КРОНА ИЗ ЛИШАЙНИКА (пышная, ветвистая) */}
      <motion.g
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ 
          opacity: 1, 
          scale: emotion === 'happy' ? [1, 1.15, 1] : emotion === 'excited' ? [1, 1.12, 1] : emotion === 'sad' ? [1, 1.02, 1] : [1, 1.05, 1],
        }}
        transition={{ 
          opacity: { duration: 2, delay: 1.2 },
          scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        {/* Ветвистая структура лишайника */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const startX = 250 + Math.cos(angle) * 40;
          const startY = 210 + Math.sin(angle) * 30;
          return (
            <motion.g key={`branch-${i}`}>
              {/* Основная ветка */}
              <motion.path
                d={`M${startX} ${startY} Q${startX + Math.cos(angle) * 60} ${startY + Math.sin(angle) * 50 - 20} ${startX + Math.cos(angle) * 90} ${startY + Math.sin(angle) * 70 - 30}`}
                stroke="#b8b89f"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                opacity="0.85"
                animate={{ 
                  d: [
                    `M${startX} ${startY} Q${startX + Math.cos(angle) * 60} ${startY + Math.sin(angle) * 50 - 20} ${startX + Math.cos(angle) * 90} ${startY + Math.sin(angle) * 70 - 30}`,
                    `M${startX} ${startY} Q${startX + Math.cos(angle) * 55} ${startY + Math.sin(angle) * 45 - 25} ${startX + Math.cos(angle) * 85} ${startY + Math.sin(angle) * 65 - 35}`,
                    `M${startX} ${startY} Q${startX + Math.cos(angle) * 60} ${startY + Math.sin(angle) * 50 - 20} ${startX + Math.cos(angle) * 90} ${startY + Math.sin(angle) * 70 - 30}`,
                  ]
                }}
                transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
              />
              
              {/* Ответвления */}
              {[0.3, 0.6, 0.8].map((t, j) => {
                const branchX = startX + Math.cos(angle) * 90 * t;
                const branchY = startY + Math.sin(angle) * 70 * t - 30 * t;
                const sideAngle = angle + (j % 2 ? 0.5 : -0.5);
                return (
                  <motion.path
                    key={`sub-branch-${i}-${j}`}
                    d={`M${branchX} ${branchY} Q${branchX + Math.cos(sideAngle) * 20} ${branchY + Math.sin(sideAngle) * 15} ${branchX + Math.cos(sideAngle) * 35} ${branchY + Math.sin(sideAngle) * 25}`}
                    stroke="#c9c9a8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.75"
                    animate={{
                      d: [
                        `M${branchX} ${branchY} Q${branchX + Math.cos(sideAngle) * 20} ${branchY + Math.sin(sideAngle) * 15} ${branchX + Math.cos(sideAngle) * 35} ${branchY + Math.sin(sideAngle) * 25}`,
                        `M${branchX} ${branchY} Q${branchX + Math.cos(sideAngle) * 18} ${branchY + Math.sin(sideAngle) * 12} ${branchX + Math.cos(sideAngle) * 32} ${branchY + Math.sin(sideAngle) * 22}`,
                        `M${branchX} ${branchY} Q${branchX + Math.cos(sideAngle) * 20} ${branchY + Math.sin(sideAngle) * 15} ${branchX + Math.cos(sideAngle) * 35} ${branchY + Math.sin(sideAngle) * 25}`,
                      ]
                    }}
                    transition={{ duration: 2.5 + j * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 + j * 0.1 }}
                  />
                );
              })}
            </motion.g>
          );
        })}

        {/* Центральная масса лишайника */}
        <ellipse cx="250" cy="200" rx="60" ry="50" fill="#9fa88a" opacity="0.9" />
        <ellipse cx="245" cy="190" rx="65" ry="48" fill="#b8b89f" opacity="0.85" />
        <ellipse cx="255" cy="180" rx="58" ry="42" fill="#c9c9a8" opacity="0.8" />
        
        {/* Пушистые детали */}
        {Array.from({ length: 30 }).map((_, i) => {
          const angle = (i / 30) * Math.PI * 2;
          const radius = 50 + Math.random() * 15;
          const x = 250 + Math.cos(angle) * radius;
          const y = 190 + Math.sin(angle) * (radius * 0.7);
          return (
            <motion.circle
              key={`crown-detail-${i}`}
              cx={x}
              cy={y}
              r={3 + Math.random() * 4}
              fill={i % 3 === 0 ? '#9fa88a' : i % 3 === 1 ? '#b8b89f' : '#c9c9a8'}
              opacity={0.7}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 0.9, 0.7]
              }}
              transition={{ 
                duration: 2 + Math.random() * 2, 
                repeat: Infinity, 
                delay: Math.random() * 2 
              }}
            />
          );
        })}
      </motion.g>
    </>
  );
}