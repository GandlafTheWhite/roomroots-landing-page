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
          y: [0, -20, -10, 0],
          scale: [1, 1.05, 1.02, 1],
          transition: { duration: 0.8, repeat: 2 }
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
          rotate: [0, 1.5, -1.5, 0],
          transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' }
        };
    }
  };

  const getEyes = () => {
    switch (emotion) {
      case 'happy':
        return { shape: 'happy', glow: 1.0 };
      case 'thinking':
        return { shape: 'thoughtful', glow: 0.6 };
      case 'greeting':
        return { shape: 'wide', glow: 0.9 };
      default:
        return { shape: 'normal', glow: 0.7 };
    }
  };

  const getMouth = () => {
    switch (emotion) {
      case 'happy':
        return 'M170 310 Q200 325 230 310';
      case 'thinking':
        return 'M180 310 Q200 308 220 310';
      case 'greeting':
        return 'M175 310 Q200 320 225 310';
      default:
        return 'M180 310 Q200 315 220 310';
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
        width="600"
        height="900"
        viewBox="0 0 400 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-2xl"
      >
        {/* КОРНИ-НОГИ (более округлые и милые) */}
        <motion.g
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          {/* Левая нога */}
          <ellipse cx="170" cy="660" rx="35" ry="45" fill="#c9b89f" opacity="0.9" />
          <ellipse cx="170" cy="650" rx="30" ry="40" fill="#d4c5a9" />
          <motion.path
            d="M170 680 Q160 690 155 695 M170 680 Q175 690 180 695 M165 690 Q160 695 158 698"
            stroke="#b8a88f"
            strokeWidth="6"
            strokeLinecap="round"
            animate={{ pathLength: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          {/* Правая нога */}
          <ellipse cx="230" cy="660" rx="35" ry="45" fill="#c9b89f" opacity="0.9" />
          <ellipse cx="230" cy="650" rx="30" ry="40" fill="#d4c5a9" />
          <motion.path
            d="M230 680 Q240 690 245 695 M230 680 Q225 690 220 695 M235 690 Q240 695 242 698"
            stroke="#b8a88f"
            strokeWidth="6"
            strokeLinecap="round"
            animate={{ pathLength: [1, 1.02, 1] }}
            transition={{ duration: 4.5, repeat: Infinity }}
          />
          
          {/* Текстура коры на ногах */}
          <path d="M155 650 Q160 655 165 650" stroke="#a89678" strokeWidth="2" opacity="0.4" />
          <path d="M175 655 Q180 660 185 655" stroke="#a89678" strokeWidth="2" opacity="0.4" />
          <path d="M215 655 Q220 660 225 655" stroke="#a89678" strokeWidth="2" opacity="0.4" />
          <path d="M235 650 Q240 655 245 650" stroke="#a89678" strokeWidth="2" opacity="0.4" />
        </motion.g>

        {/* ТЕЛО С МХОМ (округлое, как у Грута) */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          {/* Нижняя часть тела с мхом */}
          <ellipse cx="200" cy="550" rx="60" ry="90" fill="#4a7c59" opacity="0.9" />
          <ellipse cx="200" cy="545" rx="55" ry="85" fill="#5c8a4d" opacity="0.85" />
          
          {/* Текстура мха */}
          {Array.from({ length: 15 }).map((_, i) => {
            const angle = (i / 15) * Math.PI * 2;
            const x = 200 + Math.cos(angle) * (50 + Math.random() * 10);
            const y = 545 + Math.sin(angle) * (80 + Math.random() * 10);
            return (
              <motion.circle
                key={`moss-${i}`}
                cx={x}
                cy={y}
                r={4 + Math.random() * 3}
                fill="#6fa05b"
                opacity={0.6}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: Math.random() }}
              />
            );
          })}
          
          {/* Верхняя часть тела (торс) */}
          <ellipse cx="200" cy="420" rx="55" ry="75" fill="#d4c5a9" />
          <ellipse cx="200" cy="415" rx="50" ry="70" fill="#e8dcc8" opacity="0.95" />
          
          {/* Текстура древесины на торсе */}
          <path d="M165 380 Q200 375 235 380" stroke="#c9b89f" strokeWidth="2.5" opacity="0.5" />
          <path d="M170 410 Q200 405 230 410" stroke="#c9b89f" strokeWidth="2.5" opacity="0.5" />
          <path d="M165 440 Q200 435 235 440" stroke="#c9b89f" strokeWidth="2.5" opacity="0.5" />
          <path d="M170 470 Q200 465 230 470" stroke="#c9b89f" strokeWidth="2.5" opacity="0.5" />
          
          {/* Милые узлы-детали */}
          <circle cx="180" cy="400" r="8" fill="#b8a88f" opacity="0.5" />
          <circle cx="220" cy="430" r="6" fill="#b8a88f" opacity="0.5" />
          <circle cx="200" cy="460" r="7" fill="#b8a88f" opacity="0.5" />
        </motion.g>

        {/* РУКИ (более короткие и округлые, как у Грута) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {/* Левая рука */}
          <motion.g
            animate={{ 
              rotate: emotion === 'greeting' ? [0, -20, 0] : emotion === 'happy' ? [0, -10, 0] : [0, -5, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ transformOrigin: '150px 390px' }}
          >
            {/* Плечо */}
            <ellipse cx="155" cy="400" rx="18" ry="35" fill="#d4c5a9" opacity="0.95" transform="rotate(-25 155 400)" />
            {/* Предплечье */}
            <ellipse cx="125" cy="450" rx="15" ry="40" fill="#d4c5a9" transform="rotate(-15 125 450)" />
            {/* Кисть */}
            <ellipse cx="110" cy="505" rx="18" ry="22" fill="#c9b89f" />
            {/* Пальцы-веточки (3 штуки) */}
            <motion.path
              d="M105 520 Q100 530 98 540"
              stroke="#b8a88f"
              strokeWidth="5"
              strokeLinecap="round"
              animate={{ rotate: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ transformOrigin: '105px 520px' }}
            />
            <motion.path
              d="M110 525 Q110 535 110 545"
              stroke="#b8a88f"
              strokeWidth="5"
              strokeLinecap="round"
              animate={{ rotate: [0, 2, 0] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              style={{ transformOrigin: '110px 525px' }}
            />
            <motion.path
              d="M115 520 Q120 530 122 540"
              stroke="#b8a88f"
              strokeWidth="5"
              strokeLinecap="round"
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 2.1, repeat: Infinity }}
              style={{ transformOrigin: '115px 520px' }}
            />
            {/* Текстура коры */}
            <path d="M150 410 Q155 415 160 410" stroke="#b8a88f" strokeWidth="2" opacity="0.4" />
            <path d="M120 460 Q125 465 130 460" stroke="#b8a88f" strokeWidth="2" opacity="0.4" />
          </motion.g>

          {/* Правая рука */}
          <motion.g
            animate={{ 
              rotate: emotion === 'greeting' ? [0, 20, 0] : emotion === 'happy' ? [0, 10, 0] : [0, 5, 0],
            }}
            transition={{ duration: 2.2, repeat: Infinity }}
            style={{ transformOrigin: '250px 390px' }}
          >
            {/* Плечо */}
            <ellipse cx="245" cy="400" rx="18" ry="35" fill="#d4c5a9" opacity="0.95" transform="rotate(25 245 400)" />
            {/* Предплечье */}
            <ellipse cx="275" cy="450" rx="15" ry="40" fill="#d4c5a9" transform="rotate(15 275 450)" />
            {/* Кисть */}
            <ellipse cx="290" cy="505" rx="18" ry="22" fill="#c9b89f" />
            {/* Пальцы-веточки (3 штуки) */}
            <motion.path
              d="M295 520 Q300 530 302 540"
              stroke="#b8a88f"
              strokeWidth="5"
              strokeLinecap="round"
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ transformOrigin: '295px 520px' }}
            />
            <motion.path
              d="M290 525 Q290 535 290 545"
              stroke="#b8a88f"
              strokeWidth="5"
              strokeLinecap="round"
              animate={{ rotate: [0, -2, 0] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              style={{ transformOrigin: '290px 525px' }}
            />
            <motion.path
              d="M285 520 Q280 530 278 540"
              stroke="#b8a88f"
              strokeWidth="5"
              strokeLinecap="round"
              animate={{ rotate: [0, -5, 0] }}
              transition={{ duration: 2.1, repeat: Infinity }}
              style={{ transformOrigin: '285px 520px' }}
            />
            {/* Текстура коры */}
            <path d="M240 410 Q245 415 250 410" stroke="#b8a88f" strokeWidth="2" opacity="0.4" />
            <path d="M270 460 Q275 465 280 460" stroke="#b8a88f" strokeWidth="2" opacity="0.4" />
          </motion.g>
        </motion.g>

        {/* ГОЛОВА (округлая, милая, как у Грута) */}
        <motion.g
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {/* Основа головы - округлая */}
          <ellipse cx="200" cy="300" rx="60" ry="70" fill="#d4c5a9" />
          <ellipse cx="200" cy="295" rx="55" ry="65" fill="#e8dcc8" opacity="0.95" />
          
          {/* Текстура коры на голове */}
          <path d="M165 270 Q200 265 235 270" stroke="#c9b89f" strokeWidth="2" opacity="0.4" />
          <path d="M170 300 Q200 295 230 300" stroke="#c9b89f" strokeWidth="2" opacity="0.4" />
          <path d="M165 330 Q200 325 235 330" stroke="#c9b89f" strokeWidth="2" opacity="0.4" />
          
          {/* ГЛАЗА (большие, добрые, как у Грута) */}
          <motion.g
            animate={{ 
              scaleY: emotion === 'thinking' ? [1, 0.3, 1] : [1, 0.1, 1],
            }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.48, 0.52] }}
          >
            {/* Левый глаз */}
            {eyes.shape === 'happy' ? (
              <motion.path
                d="M165 285 Q175 295 185 285"
                stroke="#2d1810"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
            ) : (
              <>
                <ellipse cx="175" cy="285" rx="14" ry="18" fill="#2d1810" opacity="0.9" />
                <motion.circle 
                  cx="175" 
                  cy="285" 
                  r="8" 
                  fill="#9dff9d"
                  animate={{ 
                    opacity: [eyes.glow * 0.6, eyes.glow, eyes.glow * 0.6],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <circle cx="178" cy="282" r="3" fill="#e8ffea" opacity="0.9" />
              </>
            )}
            
            {/* Правый глаз */}
            {eyes.shape === 'happy' ? (
              <motion.path
                d="M215 285 Q225 295 235 285"
                stroke="#2d1810"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
            ) : (
              <>
                <ellipse cx="225" cy="285" rx="14" ry="18" fill="#2d1810" opacity="0.9" />
                <motion.circle 
                  cx="225" 
                  cy="285" 
                  r="8" 
                  fill="#9dff9d"
                  animate={{ 
                    opacity: [eyes.glow * 0.6, eyes.glow, eyes.glow * 0.6],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                />
                <circle cx="228" cy="282" r="3" fill="#e8ffea" opacity="0.9" />
              </>
            )}
          </motion.g>

          {/* РОТ (добрая улыбка) */}
          <motion.path
            d={mouthPath}
            stroke="#2d1810"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
            animate={{
              d: emotion === 'happy' 
                ? ['M170 310 Q200 325 230 310', 'M170 310 Q200 330 230 310', 'M170 310 Q200 325 230 310']
                : [mouthPath]
            }}
            transition={{ duration: 0.5 }}
          />
        </motion.g>

        {/* КРОНА ИЗ МХА (пушистая, мягкая) */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 1, 
            scale: emotion === 'happy' ? [1, 1.1, 1] : [1, 1.03, 1],
          }}
          transition={{ 
            opacity: { duration: 1.5, delay: 1 },
            scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          {/* Основа кроны - пушистая масса */}
          <ellipse cx="200" cy="220" rx="70" ry="45" fill="#9fa88a" opacity="0.9" />
          <ellipse cx="195" cy="210" rx="75" ry="50" fill="#b8b89f" opacity="0.85" />
          <ellipse cx="205" cy="200" rx="70" ry="45" fill="#c9c9a8" opacity="0.8" />
          
          {/* Милые пучки мха */}
          {[
            { x: 160, y: 210, size: 20 },
            { x: 240, y: 210, size: 20 },
            { x: 180, y: 190, size: 18 },
            { x: 220, y: 190, size: 18 },
            { x: 200, y: 180, size: 22 },
            { x: 170, y: 230, size: 16 },
            { x: 230, y: 230, size: 16 },
          ].map((puff, i) => (
            <motion.ellipse
              key={`puff-${i}`}
              cx={puff.x}
              cy={puff.y}
              rx={puff.size}
              ry={puff.size * 1.2}
              fill={i % 2 === 0 ? '#9fa88a' : '#b8b89f'}
              opacity={0.7}
              animate={{ 
                scale: [1, 1.08, 1],
                y: [0, -2, 0]
              }}
              transition={{ 
                duration: 2 + i * 0.2, 
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
          
          {/* Маленькие детали мха */}
          {Array.from({ length: 25 }).map((_, i) => {
            const angle = (i / 25) * Math.PI * 2;
            const radius = 55 + Math.random() * 20;
            const x = 200 + Math.cos(angle) * radius;
            const y = 210 + Math.sin(angle) * (radius * 0.6);
            return (
              <motion.circle
                key={`detail-${i}`}
                cx={x}
                cy={y}
                r={3 + Math.random() * 3}
                fill="#8a9177"
                opacity={0.6}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: Math.random() * 2 }}
              />
            );
          })}
        </motion.g>

        {/* Милые летающие споры/частички */}
        {emotion !== 'idle' && Array.from({ length: 8 }).map((_, i) => (
          <motion.circle
            key={`spore-${i}`}
            cx={200 + (Math.random() - 0.5) * 80}
            cy={250}
            r={2 + Math.random() * 2}
            fill="#9dff9d"
            initial={{ opacity: 0, y: 0 }}
            animate={{ 
              opacity: [0, 0.7, 0],
              y: [0, -50 - Math.random() * 30, -80],
              x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 40]
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
