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
          initial={{ opacity: 0, y: 30, scale: 0.7 }}
          animate={{ 
            opacity: 1, 
            y: [30, -5, 0],
            scale: [0.7, 1.05, 1]
          }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          transition={{ 
            type: 'spring', 
            stiffness: 200,
            damping: 15,
            duration: 0.6
          }}
          className="fixed top-[15%] sm:top-1/4 left-1/2 -translate-x-1/2 z-50 w-full max-w-[90%] sm:max-w-md md:max-w-xl lg:max-w-2xl px-3 sm:px-4"
        >
          {/* Облачко диалога с breathing эффектом */}
          <motion.div 
            className="relative bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-3 sm:p-4 md:p-6 max-h-[45vh] sm:max-h-[40vh] overflow-y-auto"
            animate={{ 
              y: [0, -3, 0],
              scale: [1, 1.005, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            {/* Хвостик облачка с отдельной анимацией */}
            <motion.div 
              className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-white/95 backdrop-blur-sm rotate-45 rounded-sm"
              initial={{ scale: 0, y: -10 }}
              animate={{ 
                scale: 1, 
                y: [0, 2, 0]
              }}
              transition={{
                scale: { delay: 0.3, duration: 0.3 },
                y: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }
              }}
            />
            
            {/* Текст сообщения */}
            <motion.p 
              className="text-slate-800 text-sm sm:text-base lg:text-lg font-medium text-center leading-relaxed relative z-10 whitespace-pre-line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {displayedText}
            </motion.p>

            {/* Опциональный контент (например, инпуты) */}
            {children && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 sm:mt-6 relative z-10"
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