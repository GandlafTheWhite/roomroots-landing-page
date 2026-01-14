import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

interface Choice {
  label: string;
  emoji?: string;
  onClick: () => void;
  variant?: 'default' | 'outline' | 'ghost';
}

interface ChoiceButtonsProps {
  choices: Choice[];
  layout?: 'grid' | 'column';
}

export default function ChoiceButtons({ choices, layout = 'grid' }: ChoiceButtonsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const gridClass = layout === 'grid' 
    ? 'grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3' 
    : 'flex flex-col gap-2 sm:gap-3';

  const getButtonClass = (variant?: string) => {
    const baseClass = "w-full h-auto min-h-[3rem] sm:min-h-[3.5rem] flex flex-col gap-1 sm:gap-2 text-sm sm:text-base font-medium transition-all duration-300";
    
    if (variant === 'outline') {
      return `${baseClass} bg-white/10 hover:bg-white/20 text-white border-2 border-emerald-500/40 hover:border-emerald-400/60 backdrop-blur-sm shadow-lg hover:shadow-emerald-500/20`;
    }
    if (variant === 'ghost') {
      return `${baseClass} bg-transparent hover:bg-white/10 text-white/70 hover:text-white border border-white/20`;
    }
    return `${baseClass} bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white shadow-lg shadow-emerald-900/50 hover:shadow-xl hover:shadow-emerald-500/30 border-2 border-emerald-400/30`;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-full max-w-3xl px-3 sm:px-4 z-40"
    >
      <div className={gridClass}>
        {choices.map((choice, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <button
              onClick={choice.onClick}
              className={getButtonClass(choice.variant)}
            >
              {choice.emoji && (
                <span className="text-2xl sm:text-3xl">{choice.emoji}</span>
              )}
              <span className="text-center leading-tight">{choice.label}</span>
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}