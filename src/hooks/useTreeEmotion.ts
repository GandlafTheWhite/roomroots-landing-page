import { useState, useCallback } from 'react';

type TreeEmotion = 'idle' | 'greeting' | 'thinking' | 'happy' | 'presenting';

interface UseTreeEmotionReturn {
  emotion: TreeEmotion;
  setEmotion: (emotion: TreeEmotion) => void;
  greet: () => void;
  think: () => void;
  celebrate: () => void;
  present: () => void;
  reset: () => void;
}

export function useTreeEmotion(): UseTreeEmotionReturn {
  const [emotion, setEmotion] = useState<TreeEmotion>('idle');

  const greet = useCallback(() => {
    setEmotion('greeting');
    setTimeout(() => setEmotion('idle'), 2000);
  }, []);

  const think = useCallback(() => {
    setEmotion('thinking');
  }, []);

  const celebrate = useCallback(() => {
    setEmotion('happy');
    setTimeout(() => setEmotion('idle'), 3000);
  }, []);

  const present = useCallback(() => {
    setEmotion('presenting');
    setTimeout(() => setEmotion('idle'), 2500);
  }, []);

  const reset = useCallback(() => {
    setEmotion('idle');
  }, []);

  return {
    emotion,
    setEmotion,
    greet,
    think,
    celebrate,
    present,
    reset,
  };
}
