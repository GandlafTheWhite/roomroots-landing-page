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
    ? 'grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4' 
    : 'flex flex-col gap-3';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 sm:px-6 z-40"
    >
      <div className={gridClass}>
        {choices.map((choice, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Button
              onClick={choice.onClick}
              variant={choice.variant || 'default'}
              size="lg"
              className="w-full h-auto min-h-[4rem] sm:min-h-[5rem] flex flex-col gap-2 text-base sm:text-lg font-medium shadow-xl hover:shadow-2xl transition-shadow"
            >
              {choice.emoji && (
                <span className="text-3xl sm:text-4xl">{choice.emoji}</span>
              )}
              <span className="text-center leading-tight">{choice.label}</span>
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
