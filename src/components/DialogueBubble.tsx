import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { useTypewriter } from '@/hooks/useTypewriter';

interface DialogueBubbleProps {
  message: string;
  show: boolean;
  children?: ReactNode;
  onTypingChange?: (isTyping: boolean) => void;
}

export default function DialogueBubble({ message, show, children, onTypingChange }: DialogueBubbleProps) {
  const { displayedText, isTyping } = useTypewriter(message, { 
    speed: 40,
    onComplete: () => onTypingChange?.(false)
  });
  
  if (isTyping && onTypingChange) {
    onTypingChange(true);
  }
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: -15, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            rotateX: 0,
            scale: 1
          }}
          exit={{ 
            opacity: 0, 
            y: -30, 
            rotateX: 15,
            scale: 0.9,
            transition: { duration: 0.3 }
          }}
          transition={{ 
            type: 'spring', 
            stiffness: 280,
            damping: 20,
            duration: 0.7
          }}
          className="fixed top-[4%] sm:top-[8%] md:top-[11%] left-1/2 -translate-x-1/2 z-50 w-[calc(100vw-3rem)] max-w-[340px] sm:max-w-md md:max-w-lg"
          style={{ perspective: '1000px' }}
        >
          {/* Декоративное свечение */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-cyan-400/20 to-emerald-400/20 rounded-[2rem] blur-2xl"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.95, 1.05, 0.95]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />

          {/* Облачко диалога */}
          <motion.div 
            className="relative bg-gradient-to-br from-white via-white to-emerald-50/30 backdrop-blur-md rounded-[1.75rem] shadow-[0_20px_60px_rgba(0,0,0,0.3)] border-2 border-white/60 p-5 sm:p-6 md:p-7 overflow-hidden"
            animate={{ 
              y: [0, -6, 0],
              rotateZ: [0, 0.5, -0.5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            {/* Блики света */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-[1.75rem] pointer-events-none"
              animate={{
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity
              }}
            />

            {/* Декоративные частицы */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-emerald-400/40 rounded-full"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${10 + (i % 2) * 80}%`
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}

            {/* Хвостик облачка */}
            <motion.div 
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-white to-emerald-50/30 backdrop-blur-md rotate-45 border-r-2 border-b-2 border-white/60"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ 
                scale: 1,
                rotate: 45,
                y: [0, 3, 0]
              }}
              transition={{
                scale: { delay: 0.4, duration: 0.4, type: 'spring' },
                rotate: { delay: 0.4, duration: 0.4 },
                y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }
              }}
            />
            
            {/* Текст сообщения */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="relative z-10"
            >
              <motion.p 
                className="text-slate-800 text-[15px] sm:text-base md:text-lg font-medium text-center leading-relaxed whitespace-pre-line"
                animate={{
                  textShadow: [
                    '0 0 0px rgba(0,0,0,0)',
                    '0 1px 3px rgba(0,0,0,0.1)',
                    '0 0 0px rgba(0,0,0,0)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
              >
                {displayedText}
              </motion.p>

              {/* Курсор при печати */}
              {isTyping && (
                <motion.span
                  className="inline-block w-1 h-5 bg-emerald-600 ml-0.5 align-middle"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </motion.div>

            {/* Опциональный контент */}
            {children && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, type: 'spring' }}
                className="mt-5 relative z-10"
              >
                {children}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}