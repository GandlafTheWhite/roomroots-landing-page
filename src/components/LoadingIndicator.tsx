import { motion } from 'framer-motion';

export default function LoadingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed bottom-32 sm:bottom-40 left-1/2 -translate-x-1/2 z-30"
    >
      <div className="bg-slate-900/90 backdrop-blur-md px-6 py-4 rounded-3xl shadow-2xl border border-emerald-500/30">
        <div className="flex flex-col items-center gap-3">
          {/* Спиннер из листьев */}
          <div className="relative w-12 h-12">
            {[0, 60, 120, 180, 240, 300].map((rotation, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-3 h-6 -ml-1.5 -mt-3 bg-emerald-400/80 rounded-full"
                style={{
                  transformOrigin: 'center 24px',
                  rotate: rotation,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Текст с анимацией точек */}
          <motion.div className="text-emerald-300 text-sm sm:text-base font-medium flex items-center gap-1">
            <span>Размышляю</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
            >
              .
            </motion.span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
