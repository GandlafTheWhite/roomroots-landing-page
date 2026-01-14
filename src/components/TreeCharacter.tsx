import { motion } from 'framer-motion';

interface TreeCharacterProps {
  emotion: 'idle' | 'greeting' | 'thinking' | 'happy' | 'presenting';
}

export default function TreeCharacter({ emotion }: TreeCharacterProps) {
  const getAnimationProps = () => {
    switch (emotion) {
      case 'greeting':
        return {
          rotate: [0, -5, 5, -3, 0],
          y: [0, -10, 0],
          transition: { duration: 1.2, repeat: 1 }
        };
      case 'thinking':
        return {
          rotate: [0, 3, -3, 0],
          transition: { duration: 3, repeat: Infinity }
        };
      case 'happy':
        return {
          y: [0, -15, 0],
          scale: [1, 1.03, 1],
          transition: { duration: 0.6, repeat: 2 }
        };
      case 'presenting':
        return {
          rotate: [0, 8, -8, 0],
          y: [0, -5, 0],
          transition: { duration: 1.8 }
        };
      default:
        return {
          y: [0, -8, 0],
          rotate: [0, 1, -1, 0],
          transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' }
        };
    }
  };

  const getEyes = () => {
    switch (emotion) {
      case 'happy':
        return { glow: 0.9, size: 1.2 };
      case 'thinking':
        return { glow: 0.3, size: 0.8 };
      case 'greeting':
        return { glow: 0.7, size: 1.1 };
      default:
        return { glow: 0.5, size: 1 };
    }
  };

  const getMossState = () => {
    switch (emotion) {
      case 'happy':
        return { scale: 1.1, brightness: 1.2 };
      case 'thinking':
        return { scale: 0.95, brightness: 0.9 };
      default:
        return { scale: 1, brightness: 1 };
    }
  };

  const eyes = getEyes();
  const moss = getMossState();

  return (
    <motion.div
      className="relative w-full h-full flex items-center justify-center"
      {...getAnimationProps()}
    >
      <svg
        width="600"
        height="900"
        viewBox="0 0 400 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-2xl"
      >
        {/* КОРНИ-НОГИ (внизу, уходят в землю) */}
        <motion.g
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          {/* Основные корни */}
          <motion.path
            d="M180 650 Q170 680 150 695 L145 700"
            stroke="#d4c5a9"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
            animate={{ pathLength: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.path
            d="M220 650 Q230 680 250 695 L255 700"
            stroke="#d4c5a9"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
            animate={{ pathLength: [1, 1.02, 1] }}
            transition={{ duration: 4.5, repeat: Infinity }}
          />
          {/* Боковые отростки корней */}
          <path d="M160 670 Q145 675 135 680" stroke="#b8a88f" strokeWidth="5" strokeLinecap="round" />
          <path d="M240 670 Q255 675 265 680" stroke="#b8a88f" strokeWidth="5" strokeLinecap="round" />
          <path d="M150 685 Q140 690 130 695" stroke="#b8a88f" strokeWidth="4" strokeLinecap="round" />
          <path d="M250 685 Q260 690 270 695" stroke="#b8a88f" strokeWidth="4" strokeLinecap="round" />
          
          {/* Драконий камень на ногах-корнях */}
          <ellipse cx="165" cy="675" rx="12" ry="18" fill="#9a8c7a" opacity="0.6" />
          <ellipse cx="235" cy="675" rx="12" ry="18" fill="#9a8c7a" opacity="0.6" />
          {/* Текстура камня */}
          <circle cx="165" cy="670" r="3" fill="#726657" opacity="0.4" />
          <circle cx="170" cy="678" r="2" fill="#726657" opacity="0.4" />
          <circle cx="235" cy="670" r="3" fill="#726657" opacity="0.4" />
          <circle cx="230" cy="678" r="2" fill="#726657" opacity="0.4" />
        </motion.g>

        {/* МОХ-ОДЕЖДА (нижняя часть, от пояса) */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: [moss.scale * 0.98, moss.scale * 1.02, moss.scale * 0.98],
          }}
          transition={{ 
            opacity: { duration: 1, delay: 0.5 },
            scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          {/* Бархатистый зелёный мох как плащ/юбка */}
          <ellipse cx="200" cy="550" rx="70" ry="110" fill="#2d5016" opacity="0.9" />
          <ellipse cx="200" cy="540" rx="65" ry="100" fill="#4a7c59" opacity="0.85" />
          <ellipse cx="200" cy="530" rx="60" ry="90" fill="#5c8a4d" opacity="0.9" />
          
          {/* Неровные клочья мха */}
          <path d="M140 550 Q130 580 125 610" stroke="#4a7c59" strokeWidth="20" strokeLinecap="round" opacity="0.7" />
          <path d="M260 550 Q270 580 275 610" stroke="#4a7c59" strokeWidth="20" strokeLinecap="round" opacity="0.7" />
          <path d="M150 580 Q145 600 142 620" stroke="#5c8a4d" strokeWidth="15" strokeLinecap="round" opacity="0.8" />
          <path d="M250 580 Q255 600 258 620" stroke="#5c8a4d" strokeWidth="15" strokeLinecap="round" opacity="0.8" />
          
          {/* Более тёмные участки мха */}
          <ellipse cx="180" cy="580" rx="15" ry="25" fill="#3d4a2f" opacity="0.6" />
          <ellipse cx="220" cy="590" rx="18" ry="30" fill="#3d4a2f" opacity="0.6" />
          
          {/* Драконий камень на нижней части */}
          <ellipse cx="150" cy="580" rx="15" ry="22" fill="#9a8c7a" opacity="0.5" />
          <ellipse cx="250" cy="580" rx="15" ry="22" fill="#9a8c7a" opacity="0.5" />
        </motion.g>

        {/* ТУЛОВИЩЕ (корень азалии) */}
        <motion.g
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          {/* Основной ствол-торс */}
          <ellipse cx="200" cy="400" rx="45" ry="80" fill="#e8dcc8" opacity="0.95" />
          
          {/* Текстура древесины - изгибы и узлы */}
          <path d="M170 350 Q200 355 230 350" stroke="#c9b89f" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M175 380 Q200 385 225 380" stroke="#c9b89f" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M170 410 Q200 415 230 410" stroke="#c9b89f" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M175 440 Q200 445 225 440" stroke="#c9b89f" strokeWidth="2" fill="none" opacity="0.6" />
          
          {/* Вертикальные волокна */}
          <line x1="190" y1="340" x2="188" y2="480" stroke="#d4c5a9" strokeWidth="1.5" opacity="0.4" />
          <line x1="210" y1="340" x2="212" y2="480" stroke="#d4c5a9" strokeWidth="1.5" opacity="0.4" />
          
          {/* Узлы и трещины */}
          <circle cx="185" cy="370" r="8" fill="#b8a88f" opacity="0.5" />
          <circle cx="215" cy="420" r="6" fill="#b8a88f" opacity="0.5" />
          <ellipse cx="200" cy="390" rx="12" ry="4" fill="#a89678" opacity="0.4" />
          
          {/* Сращение корней (рёбра/ключицы) */}
          <path d="M180 340 Q200 335 220 340" stroke="#b8a88f" strokeWidth="4" fill="none" opacity="0.6" />
          <path d="M175 355 Q200 350 225 355" stroke="#b8a88f" strokeWidth="3" fill="none" opacity="0.5" />
        </motion.g>

        {/* РУКИ (длинные корни с отростками-пальцами) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {/* Левая рука */}
          <motion.g
            animate={{ 
              rotate: emotion === 'greeting' ? [0, -15, 0] : [0, -3, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ transformOrigin: '160px 360px' }}
          >
            <path d="M160 360 Q130 380 100 420" stroke="#d4c5a9" strokeWidth="10" strokeLinecap="round" fill="none" />
            {/* Отростки-пальцы */}
            <path d="M100 420 Q85 430 75 445" stroke="#c9b89f" strokeWidth="4" strokeLinecap="round" />
            <path d="M100 420 Q90 435 82 450" stroke="#c9b89f" strokeWidth="4" strokeLinecap="round" />
            <path d="M100 420 Q95 438 90 455" stroke="#c9b89f" strokeWidth="3" strokeLinecap="round" />
            <path d="M100 420 Q100 440 98 458" stroke="#c9b89f" strokeWidth="3" strokeLinecap="round" />
            {/* Боковые веточки на руке */}
            <path d="M130 390 Q115 395 105 400" stroke="#b8a88f" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
            <path d="M115 405 Q105 410 98 415" stroke="#b8a88f" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          </motion.g>

          {/* Правая рука */}
          <motion.g
            animate={{ 
              rotate: emotion === 'greeting' ? [0, 15, 0] : [0, 3, 0],
            }}
            transition={{ duration: 2.2, repeat: Infinity }}
            style={{ transformOrigin: '240px 360px' }}
          >
            <path d="M240 360 Q270 380 300 420" stroke="#d4c5a9" strokeWidth="10" strokeLinecap="round" fill="none" />
            {/* Отростки-пальцы */}
            <path d="M300 420 Q315 430 325 445" stroke="#c9b89f" strokeWidth="4" strokeLinecap="round" />
            <path d="M300 420 Q310 435 318 450" stroke="#c9b89f" strokeWidth="4" strokeLinecap="round" />
            <path d="M300 420 Q305 438 310 455" stroke="#c9b89f" strokeWidth="3" strokeLinecap="round" />
            <path d="M300 420 Q300 440 302 458" stroke="#c9b89f" strokeWidth="3" strokeLinecap="round" />
            {/* Боковые веточки на руке */}
            <path d="M270 390 Q285 395 295 400" stroke="#b8a88f" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
            <path d="M285 405 Q295 410 302 415" stroke="#b8a88f" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          </motion.g>
        </motion.g>

        {/* ГОЛОВА (гладкий участок корня с глазницами-трещинами) */}
        <motion.g
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {/* Основа головы */}
          <ellipse cx="200" cy="280" rx="55" ry="65" fill="#e8dcc8" opacity="0.95" />
          
          {/* Текстура древесины на лице */}
          <path d="M170 260 Q200 258 230 260" stroke="#c9b89f" strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M175 290 Q200 288 225 290" stroke="#c9b89f" strokeWidth="1.5" fill="none" opacity="0.5" />
          
          {/* Глазницы-трещины */}
          <motion.g
            animate={{ 
              opacity: emotion === 'thinking' ? [1, 0.3, 1] : 1,
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {/* Левый глаз */}
            <ellipse cx="180" cy="275" rx="12" ry="18" fill="#2d1810" opacity="0.9" />
            <path d="M172 268 Q180 260 188 268" stroke="#1a0f08" strokeWidth="2" fill="none" />
            <path d="M172 282 Q180 290 188 282" stroke="#1a0f08" strokeWidth="2" fill="none" />
            {/* Свечение в глазу */}
            <motion.circle 
              cx="180" 
              cy="275" 
              r="4" 
              fill="#9dff9d"
              animate={{ 
                opacity: [eyes.glow * 0.4, eyes.glow, eyes.glow * 0.4],
                scale: [eyes.size * 0.9, eyes.size * 1.1, eyes.size * 0.9]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Правый глаз */}
            <ellipse cx="220" cy="275" rx="12" ry="18" fill="#2d1810" opacity="0.9" />
            <path d="M212 268 Q220 260 228 268" stroke="#1a0f08" strokeWidth="2" fill="none" />
            <path d="M212 282 Q220 290 228 282" stroke="#1a0f08" strokeWidth="2" fill="none" />
            {/* Свечение в глазу */}
            <motion.circle 
              cx="220" 
              cy="275" 
              r="4" 
              fill="#9dff9d"
              animate={{ 
                opacity: [eyes.glow * 0.4, eyes.glow, eyes.glow * 0.4],
                scale: [eyes.size * 0.9, eyes.size * 1.1, eyes.size * 0.9]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
          </motion.g>
        </motion.g>

        {/* КРОНА ИЗ ИСЛАНДСКОГО МХА (вместо волос) */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 1, 
            scale: [moss.scale, moss.scale * 1.05, moss.scale],
          }}
          transition={{ 
            opacity: { duration: 1.5, delay: 1 },
            scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          {/* Хаотичная масса лишайника */}
          <g opacity="0.95">
            {/* Центральная масса */}
            <ellipse cx="200" cy="210" rx="75" ry="50" fill="#b8b89f" />
            <ellipse cx="195" cy="200" rx="70" ry="45" fill="#c9c9a8" />
            <ellipse cx="205" cy="190" rx="65" ry="40" fill="#9fa88a" />
            
            {/* Фрильчатые лопасти мха */}
            {Array.from({ length: 30 }).map((_, i) => {
              const angle = (i / 30) * Math.PI * 2;
              const radius = 60 + Math.random() * 25;
              const x = 200 + Math.cos(angle) * radius;
              const y = 200 + Math.sin(angle) * (radius * 0.6);
              const size = 6 + Math.random() * 8;
              const colors = ['#b8b89f', '#9fa88a', '#8a9177', '#7a7d6a'];
              const color = colors[Math.floor(Math.random() * colors.length)];
              
              return (
                <motion.ellipse
                  key={i}
                  cx={x}
                  cy={y}
                  rx={size}
                  ry={size * 1.5}
                  fill={color}
                  opacity={0.7 + Math.random() * 0.3}
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                  style={{ transformOrigin: `${x}px ${y}px` }}
                />
              );
            })}
            
            {/* Более тёмные кончики (обгоревшие) */}
            <ellipse cx="160" cy="180" rx="15" ry="20" fill="#6a5d4a" opacity="0.6" />
            <ellipse cx="240" cy="185" rx="18" ry="22" fill="#6a5d4a" opacity="0.6" />
            <ellipse cx="200" cy="165" rx="20" ry="18" fill="#6a5d4a" opacity="0.6" />
            
            {/* Перфорированная текстура */}
            {Array.from({ length: 15 }).map((_, i) => {
              const x = 160 + Math.random() * 80;
              const y = 170 + Math.random() * 50;
              return (
                <circle
                  key={`hole-${i}`}
                  cx={x}
                  cy={y}
                  r={1 + Math.random() * 2}
                  fill="#3d2817"
                  opacity={0.3}
                />
              );
            })}
          </g>
        </motion.g>

        {/* Осыпающиеся частички лишайника */}
        {emotion !== 'idle' && Array.from({ length: 5 }).map((_, i) => (
          <motion.circle
            key={`particle-${i}`}
            cx={200 + (Math.random() - 0.5) * 100}
            cy={200}
            r={1 + Math.random()}
            fill="#9fa88a"
            initial={{ opacity: 0, y: 0 }}
            animate={{ 
              opacity: [0, 0.6, 0],
              y: [0, 50 + Math.random() * 30, 80]
            }}
            transition={{ 
              duration: 2 + Math.random(),
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
}
