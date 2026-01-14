import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface DialogueBubbleProps {
  message: string;
  show: boolean;
  children?: ReactNode;
}

export default function DialogueBubble({ message, show, children }: DialogueBubbleProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 sm:px-6"
        >
          {/* Облачко диалога */}
          <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8">
            {/* Хвостик облачка */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white/95 backdrop-blur-sm rotate-45 rounded-sm" />
            
            {/* Текст сообщения */}
            <motion.p 
              className="text-slate-800 text-lg sm:text-xl md:text-2xl font-medium text-center leading-relaxed relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {message}
            </motion.p>

            {/* Опциональный контент (например, инпуты) */}
            {children && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 relative z-10"
              >
                {children}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
