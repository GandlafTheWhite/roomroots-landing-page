import { motion } from 'framer-motion';

interface TreeSceneProps {
  emotion: 'idle' | 'greeting' | 'thinking' | 'happy' | 'presenting';
}

export default function TreeScene({ emotion }: TreeSceneProps) {
  const getAnimationProps = () => {
    switch (emotion) {
      case 'greeting':
        return {
          rotate: [0, -10, 10, -5, 0],
          scale: [1, 1.05, 1],
          transition: { duration: 0.6, repeat: 2 }
        };
      case 'thinking':
        return {
          rotate: [0, 5, -5, 0],
          transition: { duration: 2, repeat: Infinity }
        };
      case 'happy':
        return {
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
          transition: { duration: 0.5, repeat: 3 }
        };
      case 'presenting':
        return {
          rotateY: [0, 360],
          scale: [1, 1.15, 1],
          transition: { duration: 1.5 }
        };
      default:
        return {
          y: [0, -5, 0],
          rotate: [0, 2, -2, 0],
          transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        };
    }
  };

  // Глаза в зависимости от эмоции
  const getEyes = () => {
    switch (emotion) {
      case 'happy':
        return { leftY: 265, rightY: 265, shape: 'arc' }; // Закрытые улыбающиеся
      case 'thinking':
        return { leftY: 263, rightY: 268, shape: 'normal' }; // Один глаз приподнят
      default:
        return { leftY: 265, rightY: 265, shape: 'normal' }; // Спокойные
    }
  };

  const eyes = getEyes();

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 relative overflow-hidden">
      {/* Фоновые частицы */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Свечение под деревом */}
      <motion.div
        className="absolute bottom-1/3 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Дерево */}
      <motion.div
        className="relative z-10"
        {...getAnimationProps()}
      >
        <svg
          width="300"
          height="400"
          viewBox="0 0 300 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          {/* Корни - основание */}
          <motion.path
            d="M150 380 Q130 350 110 340 M150 380 Q170 350 190 340 M150 380 Q145 360 140 350 M150 380 Q155 360 160 350"
            stroke="#3d2817"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 1.5 }}
          />

          {/* Основной ствол - мох */}
          <motion.ellipse
            cx="150"
            cy="280"
            rx="50"
            ry="60"
            fill="#2d5016"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          
          {/* Мохового покрова детали */}
          <motion.circle cx="150" cy="280" r="45" fill="#4a7c59" opacity="0.9"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <motion.circle cx="130" cy="270" r="20" fill="#5c8a4d" opacity="0.7"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle cx="170" cy="290" r="18" fill="#5c8a4d" opacity="0.7"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.3, repeat: Infinity, delay: 0.5 }}
          />

          {/* ЛИЦО - Глаза */}
          {eyes.shape === 'normal' ? (
            <>
              {/* Левый глаз */}
              <motion.ellipse
                cx="135"
                cy={eyes.leftY}
                rx="6"
                ry="8"
                fill="#2d1810"
                initial={{ scale: 0 }}
                animate={{ 
                  scale: [0, 1, 1, 1, 0, 1],
                  scaleY: [1, 1, 1, 0.1, 1, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  times: [0, 0.1, 0.4, 0.5, 0.6, 1],
                  delay: 1.5
                }}
              />
              {/* Правый глаз */}
              <motion.ellipse
                cx="165"
                cy={eyes.rightY}
                rx="6"
                ry="8"
                fill="#2d1810"
                initial={{ scale: 0 }}
                animate={{ 
                  scale: [0, 1, 1, 1, 0, 1],
                  scaleY: [1, 1, 1, 0.1, 1, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  times: [0, 0.1, 0.4, 0.5, 0.6, 1],
                  delay: 1.5
                }}
              />
              {/* Блики в глазах */}
              <circle cx="137" cy="263" r="2" fill="#9dff9d" opacity="0.6" />
              <circle cx="167" cy="263" r="2" fill="#9dff9d" opacity="0.6" />
            </>
          ) : (
            <>
              {/* Закрытые глаза (дуги) */}
              <motion.path
                d="M129 265 Q135 268 141 265"
                stroke="#2d1810"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.path
                d="M159 265 Q165 268 171 265"
                stroke="#2d1810"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3 }}
              />
            </>
          )}

          {/* ЛИЦО - Умиротворенная улыбка */}
          <motion.path
            d="M135 285 Q150 290 165 285"
            stroke="#2d1810"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 0.5, delay: 1.6 }}
          />

          {/* Щёчки (румянец) */}
          <motion.ellipse
            cx="120"
            cy="278"
            rx="8"
            ry="6"
            fill="#ff9999"
            opacity="0.3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 1.7 }}
          />
          <motion.ellipse
            cx="180"
            cy="278"
            rx="8"
            ry="6"
            fill="#ff9999"
            opacity="0.3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 1.7 }}
          />

          {/* Ветки */}
          <motion.path
            d="M120 260 Q90 240 70 220"
            stroke="#3d2817"
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          />
          <motion.path
            d="M180 260 Q210 240 230 220"
            stroke="#3d2817"
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          />
          <motion.path
            d="M140 240 Q110 210 90 180"
            stroke="#3d2817"
            strokeWidth="5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          />
          <motion.path
            d="M160 240 Q190 210 210 180"
            stroke="#3d2817"
            strokeWidth="5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          />

          {/* Листья/иголки на ветках */}
          {[
            { cx: 70, cy: 220, delay: 1 },
            { cx: 230, cy: 220, delay: 1.1 },
            { cx: 90, cy: 180, delay: 1.2 },
            { cx: 210, cy: 180, delay: 1.3 },
            { cx: 50, cy: 210, delay: 1.15 },
            { cx: 250, cy: 210, delay: 1.25 },
          ].map((leaf, i) => (
            <motion.circle
              key={i}
              cx={leaf.cx}
              cy={leaf.cy}
              r="12"
              fill="#5c8a4d"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: [0.6, 0.9, 0.6],
                y: [0, -3, 0]
              }}
              transition={{ 
                scale: { duration: 0.4, delay: leaf.delay },
                opacity: { duration: 2, repeat: Infinity, delay: i * 0.2 },
                y: { duration: 2.5, repeat: Infinity, delay: i * 0.3 }
              }}
            />
          ))}

          {/* Верхушка - крона */}
          <motion.ellipse
            cx="150"
            cy="180"
            rx="45"
            ry="55"
            fill="#4a7c59"
            opacity="0.8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          />
          <motion.circle
            cx="150"
            cy="160"
            r="35"
            fill="#5c8a4d"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          />

          {/* Маленькие листья вокруг */}
          {[
            { cx: 120, cy: 170, delay: 1.3 },
            { cx: 180, cy: 170, delay: 1.35 },
            { cx: 135, cy: 150, delay: 1.4 },
            { cx: 165, cy: 150, delay: 1.45 },
            { cx: 150, cy: 135, delay: 1.5 },
          ].map((leaf, i) => (
            <motion.circle
              key={`top-${i}`}
              cx={leaf.cx}
              cy={leaf.cy}
              r="8"
              fill="#6fa05b"
              initial={{ scale: 0 }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                scale: { duration: 0.3, delay: leaf.delay },
                opacity: { duration: 1.8, repeat: Infinity, delay: i * 0.15 }
              }}
            />
          ))}

          {/* Светящиеся точки (споры мха) */}
          {[
            { cx: 145, cy: 295, delay: 1.9 },
            { cx: 155, cy: 292, delay: 2.0 },
            { cx: 148, cy: 305, delay: 2.1 },
          ].map((spore, i) => (
            <motion.circle
              key={`spore-${i}`}
              cx={spore.cx}
              cy={spore.cy}
              r="2"
              fill="#9dff9d"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [1, 1.5, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: spore.delay
              }}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}
