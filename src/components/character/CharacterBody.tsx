import { motion } from 'framer-motion';

interface CharacterBodyProps {
  emotion: 'idle' | 'greeting' | 'thinking' | 'happy' | 'presenting' | 'surprised' | 'sad' | 'excited';
}

export default function CharacterBody({ emotion }: CharacterBodyProps) {
  return (
    <>
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
            rotate: emotion === 'greeting' ? [0, -25, 0] : emotion === 'happy' ? [0, -15, 0] : emotion === 'excited' ? [0, -18, 0] : emotion === 'surprised' ? [0, -12, 0] : emotion === 'sad' ? [0, -5, 0] : [0, -8, 0],
          }}
          transition={{ duration: emotion === 'excited' ? 1.5 : 2.5, repeat: Infinity }}
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
            rotate: emotion === 'greeting' ? [0, 25, 0] : emotion === 'happy' ? [0, 15, 0] : emotion === 'excited' ? [0, 18, 0] : emotion === 'surprised' ? [0, 12, 0] : emotion === 'sad' ? [0, 5, 0] : [0, 8, 0],
          }}
          transition={{ duration: emotion === 'excited' ? 1.5 : 2.7, repeat: Infinity }}
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
    </>
  );
}