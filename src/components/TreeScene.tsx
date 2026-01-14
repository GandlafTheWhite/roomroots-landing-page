import { motion } from 'framer-motion';
import TreeCharacter from './TreeCharacter';

interface TreeSceneProps {
  emotion: 'idle' | 'greeting' | 'thinking' | 'happy' | 'presenting' | 'surprised' | 'sad' | 'excited';
  isTalking?: boolean;
}

export default function TreeScene({ emotion, isTalking = false }: TreeSceneProps) {

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

      {/* МАСТЕРСКАЯ - ФОН */}
      <div className="absolute inset-0 opacity-50">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
        >
          {/* Окно сзади */}
          <motion.rect
            x="400" y="50" width="400" height="300"
            fill="#4a7c59" opacity="0.2" rx="20"
            initial={{ opacity: 0 }} animate={{ opacity: 0.2 }}
            transition={{ duration: 2 }}
          />
          {/* Полки слева */}
          <motion.g initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 0.4 }} transition={{ duration: 1.5, delay: 0.5 }}>
            <rect x="50" y="250" width="180" height="8" fill="#3d2817" rx="2" />
            <ellipse cx="100" cy="240" rx="15" ry="25" fill="#4a7c59" />
            <ellipse cx="140" cy="235" rx="20" ry="30" fill="#5c8a4d" />
            <rect x="50" y="380" width="180" height="8" fill="#3d2817" rx="2" />
            <ellipse cx="90" cy="365" rx="18" ry="28" fill="#5c8a4d" />
          </motion.g>
          {/* Полки справа */}
          <motion.g initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 0.4 }} transition={{ duration: 1.5, delay: 0.7 }}>
            <rect x="970" y="250" width="180" height="8" fill="#3d2817" rx="2" />
            <ellipse cx="1000" cy="240" rx="15" ry="25" fill="#4a7c59" />
            <ellipse cx="1050" cy="235" rx="20" ry="30" fill="#5c8a4d" />
            <rect x="970" y="380" width="180" height="8" fill="#3d2817" rx="2" />
            <ellipse cx="1010" cy="365" rx="18" ry="28" fill="#5c8a4d" />
          </motion.g>
          {/* Рабочий стол */}
          <motion.g initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 0.3 }} transition={{ duration: 1.5, delay: 0.9 }}>
            <rect x="200" y="700" width="800" height="80" fill="#3d2817" rx="4" />
            <circle cx="500" cy="730" r="15" fill="#5c8a4d" opacity="0.7" />
            <circle cx="550" cy="725" r="12" fill="#4a7c59" opacity="0.7" />
            <circle cx="600" cy="730" r="18" fill="#6b8e23" opacity="0.6" />
          </motion.g>
          
          {/* Инструменты на полу слева */}
          <motion.g initial={{ opacity: 0, x: -30 }} animate={{ opacity: 0.4, x: 0 }} transition={{ duration: 1.8, delay: 1.1 }}>
            <rect x="150" y="680" width="25" height="45" fill="#8b4513" rx="2" />
            <ellipse cx="162" cy="673" rx="15" ry="8" fill="#a0522d" />
            <circle cx="200" cy="705" r="20" fill="#556b2f" opacity="0.8" />
          </motion.g>
          
          {/* Инструменты на полу справа */}
          <motion.g initial={{ opacity: 0, x: 30 }} animate={{ opacity: 0.4, x: 0 }} transition={{ duration: 1.8, delay: 1.2 }}>
            <ellipse cx="1050" cy="695" rx="22" ry="28" fill="#8b4513" />
            <rect x="1020" y="705" width="18" height="35" fill="#a0522d" rx="2" />
          </motion.g>
          
          {/* Висящие растения */}
          <motion.g initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 0.5 }} transition={{ duration: 2, delay: 1.3 }}>
            <motion.path d="M 80 280 Q 85 320 80 360" stroke="#4a7c59" strokeWidth="3" fill="none" animate={{ d: ['M 80 280 Q 85 320 80 360', 'M 80 280 Q 75 320 80 360', 'M 80 280 Q 85 320 80 360'] }} transition={{ duration: 4, repeat: Infinity }} />
            <ellipse cx="80" cy="365" rx="12" ry="18" fill="#5c8a4d" />
            <motion.path d="M 1100 280 Q 1095 320 1100 360" stroke="#4a7c59" strokeWidth="3" fill="none" animate={{ d: ['M 1100 280 Q 1095 320 1100 360', 'M 1100 280 Q 1105 320 1100 360', 'M 1100 280 Q 1095 320 1100 360'] }} transition={{ duration: 4.5, repeat: Infinity }} />
            <ellipse cx="1100" cy="365" rx="12" ry="18" fill="#5c8a4d" />
          </motion.g>
        </svg>
      </div>

      {/* Свечение под персонажем */}
      <motion.div
        className="absolute bottom-1/4 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-3xl"
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

      {/* ПЕРСОНАЖ - Антропоморфный дух леса */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <TreeCharacter emotion={emotion} isTalking={isTalking} />
      </div>

      {/* Старое дерево (удалить весь блок ниже) */}
      {false && (
        <svg
          width="500"
          height="700"
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
          {eyes.shape === 'closed' ? (
            <>
              {/* Закрытые глаза (thinking) */}
              <motion.path
                d="M129 265 Q135 268 141 265"
                stroke="#2d1810"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                animate={{ pathLength: [1, 1] }}
              />
              <motion.path
                d="M159 265 Q165 268 171 265"
                stroke="#2d1810"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                animate={{ pathLength: [1, 1] }}
              />
            </>
          ) : eyes.shape === 'normal' ? (
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
        )}
    </div>
  );
}