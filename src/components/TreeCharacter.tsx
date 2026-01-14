import { motion } from 'framer-motion';

interface TreeCharacterProps {
  emotion: 'idle' | 'greeting' | 'thinking' | 'happy' | 'presenting';
}

export default function TreeCharacter({ emotion }: TreeCharacterProps) {
  const getAnimationProps = () => {
    switch (emotion) {
      case 'greeting':
        return {
          rotate: [0, -3, 3, -2, 0],
          y: [0, -15, 0],
          transition: { duration: 1.5, repeat: 1 }
        };
      case 'thinking':
        return {
          rotate: [0, 2, -2, 0],
          y: [0, -5, 0],
          transition: { duration: 4, repeat: Infinity }
        };
      case 'happy':
        return {
          y: [0, -25, -15, 0],
          rotate: [0, -5, 5, 0],
          scale: [1, 1.08, 1.03, 1],
          transition: { duration: 1, repeat: 2 }
        };
      case 'presenting':
        return {
          rotate: [0, 5, -5, 0],
          y: [0, -8, 0],
          transition: { duration: 2 }
        };
      default:
        return {
          y: [0, -12, 0],
          rotate: [0, 2, -2, 0],
          transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
        };
    }
  };

  const getEyes = () => {
    switch (emotion) {
      case 'happy':
        return { shape: 'happy', glow: 1.0, size: 1.1 };
      case 'thinking':
        return { shape: 'normal', glow: 0.5, size: 0.9 };
      case 'greeting':
        return { shape: 'wide', glow: 1.0, size: 1.2 };
      default:
        return { shape: 'normal', glow: 0.8, size: 1.0 };
    }
  };

  const getMouth = () => {
    switch (emotion) {
      case 'happy':
        return 'M160 315 Q200 340 240 315';
      case 'thinking':
        return 'M170 315 Q200 325 230 315';
      case 'greeting':
        return 'M165 315 Q200 335 235 315';
      default:
        return 'M170 315 Q200 330 230 315';
    }
  };

  const eyes = getEyes();
  const mouthPath = getMouth();

  return (
    <motion.div
      className="relative w-full h-full flex items-center justify-center"
      {...getAnimationProps()}
    >
      <svg
        width="700"
        height="1000"
        viewBox="0 0 500 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-2xl"
      >
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

        {/* СВИСАЮЩИЕ КОРНИ (длинные, развевающиеся) */}
        <motion.g
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          {/* Центральные корни */}
          {[
            { x1: 245, y1: 600, x2: 250, y2: 750, thickness: 5, delay: 0 },
            { x1: 255, y1: 600, x2: 252, y2: 780, thickness: 4, delay: 0.1 },
            { x1: 240, y1: 605, x2: 235, y2: 770, thickness: 3.5, delay: 0.2 },
            { x1: 260, y1: 605, x2: 265, y2: 760, thickness: 3.5, delay: 0.15 },
            { x1: 250, y1: 610, x2: 248, y2: 790, thickness: 3, delay: 0.25 },
          ].map((root, i) => (
            <motion.g key={`root-center-${i}`}>
              <motion.path
                d={`M${root.x1} ${root.y1} Q${(root.x1 + root.x2) / 2 + (i % 2 ? 10 : -10)} ${(root.y1 + root.y2) / 2} ${root.x2} ${root.y2}`}
                stroke="#3d2817"
                strokeWidth={root.thickness}
                strokeLinecap="round"
                fill="none"
                opacity={0.7}
                animate={{
                  d: [
                    `M${root.x1} ${root.y1} Q${(root.x1 + root.x2) / 2 + (i % 2 ? 10 : -10)} ${(root.y1 + root.y2) / 2} ${root.x2} ${root.y2}`,
                    `M${root.x1} ${root.y1} Q${(root.x1 + root.x2) / 2 + (i % 2 ? -8 : 8)} ${(root.y1 + root.y2) / 2} ${root.x2 + (i % 2 ? 3 : -3)} ${root.y2}`,
                    `M${root.x1} ${root.y1} Q${(root.x1 + root.x2) / 2 + (i % 2 ? 10 : -10)} ${(root.y1 + root.y2) / 2} ${root.x2} ${root.y2}`,
                  ]
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: root.delay,
                  ease: 'easeInOut'
                }}
              />
              <motion.path
                d={`M${root.x2} ${root.y2} Q${root.x2 - 5} ${root.y2 + 10} ${root.x2 - 8} ${root.y2 + 15}`}
                stroke="#2d1810"
                strokeWidth={root.thickness * 0.6}
                strokeLinecap="round"
                fill="none"
                opacity={0.5}
                animate={{
                  d: [
                    `M${root.x2} ${root.y2} Q${root.x2 - 5} ${root.y2 + 10} ${root.x2 - 8} ${root.y2 + 15}`,
                    `M${root.x2} ${root.y2} Q${root.x2 + 4} ${root.y2 + 10} ${root.x2 + 6} ${root.y2 + 15}`,
                    `M${root.x2} ${root.y2} Q${root.x2 - 5} ${root.y2 + 10} ${root.x2 - 8} ${root.y2 + 15}`,
                  ]
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: root.delay + 0.2,
                  ease: 'easeInOut'
                }}
              />
            </motion.g>
          ))}

          {/* Боковые корни слева */}
          {[
            { x1: 220, y1: 590, x2: 180, y2: 730, thickness: 4, delay: 0.3 },
            { x1: 210, y1: 595, x2: 160, y2: 750, thickness: 3, delay: 0.35 },
            { x1: 225, y1: 600, x2: 190, y2: 720, thickness: 3.5, delay: 0.28 },
          ].map((root, i) => (
            <motion.path
              key={`root-left-${i}`}
              d={`M${root.x1} ${root.y1} Q${root.x1 - 20} ${(root.y1 + root.y2) / 2} ${root.x2} ${root.y2}`}
              stroke="#3d2817"
              strokeWidth={root.thickness}
              strokeLinecap="round"
              fill="none"
              opacity={0.6}
              animate={{
                d: [
                  `M${root.x1} ${root.y1} Q${root.x1 - 20} ${(root.y1 + root.y2) / 2} ${root.x2} ${root.y2}`,
                  `M${root.x1} ${root.y1} Q${root.x1 - 15} ${(root.y1 + root.y2) / 2} ${root.x2 + 5} ${root.y2}`,
                  `M${root.x1} ${root.y1} Q${root.x1 - 20} ${(root.y1 + root.y2) / 2} ${root.x2} ${root.y2}`,
                ]
              }}
              transition={{
                duration: 3.5 + i * 0.3,
                repeat: Infinity,
                delay: root.delay,
                ease: 'easeInOut'
              }}
            />
          ))}

          {/* Боковые корни справа */}
          {[
            { x1: 280, y1: 590, x2: 320, y2: 730, thickness: 4, delay: 0.32 },
            { x1: 290, y1: 595, x2: 340, y2: 750, thickness: 3, delay: 0.37 },
            { x1: 275, y1: 600, x2: 310, y2: 720, thickness: 3.5, delay: 0.3 },
          ].map((root, i) => (
            <motion.path
              key={`root-right-${i}`}
              d={`M${root.x1} ${root.y1} Q${root.x1 + 20} ${(root.y1 + root.y2) / 2} ${root.x2} ${root.y2}`}
              stroke="#3d2817"
              strokeWidth={root.thickness}
              strokeLinecap="round"
              fill="none"
              opacity={0.6}
              animate={{
                d: [
                  `M${root.x1} ${root.y1} Q${root.x1 + 20} ${(root.y1 + root.y2) / 2} ${root.x2} ${root.y2}`,
                  `M${root.x1} ${root.y1} Q${root.x1 + 15} ${(root.y1 + root.y2) / 2} ${root.x2 - 5} ${root.y2}`,
                  `M${root.x1} ${root.y1} Q${root.x1 + 20} ${(root.y1 + root.y2) / 2} ${root.x2} ${root.y2}`,
                ]
              }}
              transition={{
                duration: 3.5 + i * 0.3,
                repeat: Infinity,
                delay: root.delay,
                ease: 'easeInOut'
              }}
            />
          ))}
        </motion.g>

        {/* ТЕЛО (мшистое, текстурное) */}
        <motion.g
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Основа тела */}
          <ellipse cx="250" cy="480" rx="75" ry="100" fill="url(#mossGradient)" />
          <ellipse cx="250" cy="475" rx="70" ry="95" fill="#7ba428" opacity="0.9" />
          
          {/* Текстура мха на теле */}
          <rect x="180" y="380" width="140" height="190" fill="url(#mossTexture)" opacity="0.6" rx="70"/>
          
          {/* Детальные пучки мха */}
          {Array.from({ length: 40 }).map((_, i) => {
            const angle = (i / 40) * Math.PI * 2;
            const radius = 60 + Math.random() * 15;
            const x = 250 + Math.cos(angle) * radius;
            const y = 480 + Math.sin(angle) * (radius * 1.3);
            return (
              <motion.circle
                key={`body-moss-${i}`}
                cx={x}
                cy={y}
                r={2 + Math.random() * 3}
                fill={i % 3 === 0 ? '#9acd32' : i % 3 === 1 ? '#85a647' : '#6b8e23'}
                opacity={0.7}
                animate={{ 
                  scale: [1, 1.15, 1],
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

          {/* 3 РОЗОВЫХ ЦВЕТКА НА ГРУДИ */}
          {[
            { cx: 235, cy: 470, delay: 1.5 },
            { cx: 250, cy: 485, delay: 1.6 },
            { cx: 265, cy: 470, delay: 1.7 },
          ].map((flower, i) => (
            <motion.g 
              key={`flower-${i}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: flower.delay }}
            >
              {[0, 72, 144, 216, 288].map((angle, j) => (
                <ellipse
                  key={`petal-${i}-${j}`}
                  cx={flower.cx + Math.cos((angle * Math.PI) / 180) * 8}
                  cy={flower.cy + Math.sin((angle * Math.PI) / 180) * 8}
                  rx="6"
                  ry="9"
                  fill="#ff69b4"
                  opacity="0.95"
                  transform={`rotate(${angle} ${flower.cx + Math.cos((angle * Math.PI) / 180) * 8} ${flower.cy + Math.sin((angle * Math.PI) / 180) * 8})`}
                />
              ))}
              <circle cx={flower.cx} cy={flower.cy} r="4" fill="#ffd700" opacity="0.9" />
              <motion.circle
                cx={flower.cx}
                cy={flower.cy}
                r="3"
                fill="#ffed4e"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            </motion.g>
          ))}
        </motion.g>

        {/* РУКИ (короткие, толстые, с 5 пальцами) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {/* Левая рука */}
          <motion.g
            animate={{ 
              rotate: emotion === 'greeting' ? [0, -25, 0] : emotion === 'happy' ? [0, -15, 0] : [0, -8, 0],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{ transformOrigin: '185px 440px' }}
          >
            <ellipse cx="185" cy="450" rx="22" ry="38" fill="#7ba428" opacity="0.95" transform="rotate(-35 185 450)" />
            <ellipse cx="160" cy="490" rx="20" ry="35" fill="#6b8e23" transform="rotate(-25 160 490)" />
            <ellipse cx="145" cy="535" rx="25" ry="28" fill="#6b8e23" />
            
            {/* 5 пальцев */}
            {[-15, -7, 0, 7, 15].map((offset, i) => (
              <motion.ellipse
                key={`left-finger-${i}`}
                cx={145 + offset}
                cy={555}
                rx="6"
                ry="12"
                fill="#85a647"
                opacity="0.9"
                animate={{ 
                  ry: [12, 14, 12],
                  cy: [555, 557, 555]
                }}
                transition={{ 
                  duration: 2 + i * 0.2, 
                  repeat: Infinity, 
                  delay: i * 0.1 
                }}
              />
            ))}
            
            {/* Текстура мха на руке */}
            {Array.from({ length: 8 }).map((_, i) => (
              <circle
                key={`left-arm-moss-${i}`}
                cx={170 - i * 3}
                cy={470 + i * 8}
                r={2 + Math.random() * 2}
                fill="#9acd32"
                opacity={0.6}
              />
            ))}
          </motion.g>

          {/* Правая рука */}
          <motion.g
            animate={{ 
              rotate: emotion === 'greeting' ? [0, 25, 0] : emotion === 'happy' ? [0, 15, 0] : [0, 8, 0],
            }}
            transition={{ duration: 2.7, repeat: Infinity }}
            style={{ transformOrigin: '315px 440px' }}
          >
            <ellipse cx="315" cy="450" rx="22" ry="38" fill="#7ba428" opacity="0.95" transform="rotate(35 315 450)" />
            <ellipse cx="340" cy="490" rx="20" ry="35" fill="#6b8e23" transform="rotate(25 340 490)" />
            <ellipse cx="355" cy="535" rx="25" ry="28" fill="#6b8e23" />
            
            {/* 5 пальцев */}
            {[-15, -7, 0, 7, 15].map((offset, i) => (
              <motion.ellipse
                key={`right-finger-${i}`}
                cx={355 + offset}
                cy={555}
                rx="6"
                ry="12"
                fill="#85a647"
                opacity="0.9"
                animate={{ 
                  ry: [12, 14, 12],
                  cy: [555, 557, 555]
                }}
                transition={{ 
                  duration: 2 + i * 0.2, 
                  repeat: Infinity, 
                  delay: i * 0.1 
                }}
              />
            ))}
            
            {/* Текстура мха на руке */}
            {Array.from({ length: 8 }).map((_, i) => (
              <circle
                key={`right-arm-moss-${i}`}
                cx={330 + i * 3}
                cy={470 + i * 8}
                r={2 + Math.random() * 2}
                fill="#9acd32"
                opacity={0.6}
              />
            ))}
          </motion.g>
        </motion.g>

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

          {/* ШИРОКАЯ УЛЫБКА */}
          <motion.path
            d={mouthPath}
            stroke="#1a1a1a"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
            animate={{
              d: emotion === 'happy' 
                ? ['M160 315 Q200 340 240 315', 'M160 315 Q200 345 240 315', 'M160 315 Q200 340 240 315']
                : [mouthPath]
            }}
            transition={{ duration: 0.6 }}
          />
        </motion.g>

        {/* КРОНА ИЗ ЛИШАЙНИКА (пышная, ветвистая) */}
        <motion.g
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ 
            opacity: 1, 
            scale: emotion === 'happy' ? [1, 1.15, 1] : [1, 1.05, 1],
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

        {/* СВЕТЯЩИЕСЯ СПОРЫ ВОКРУГ */}
        {emotion !== 'thinking' && Array.from({ length: 25 }).map((_, i) => {
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
      </svg>
    </motion.div>
  );
}
