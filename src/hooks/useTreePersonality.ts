import { useState, useCallback, useEffect } from 'react';
import type { TreePersonality } from '@/data/dialogues';

interface UseTreePersonalityReturn {
  personality: TreePersonality;
  retryCount: number;
  isReturningUser: boolean;
  incrementRetry: () => void;
  resetRetry: () => void;
  makeGrumpy: () => void;
  resetPersonality: () => void;
}

const RETRY_LIMIT = 3;
const LAST_VISIT_KEY = 'tree_last_visit';

export function useTreePersonality(): UseTreePersonalityReturn {
  const [personality, setPersonality] = useState<TreePersonality>('friendly');
  const [retryCount, setRetryCount] = useState(0);
  const [isReturningUser, setIsReturningUser] = useState(false);

  // Проверка повторного визита
  useEffect(() => {
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    const now = Date.now();
    
    if (lastVisit) {
      const lastVisitTime = parseInt(lastVisit, 10);
      const hoursSinceLastVisit = (now - lastVisitTime) / (1000 * 60 * 60);
      
      // Если пользователь был менее 24 часов назад
      if (hoursSinceLastVisit < 24) {
        setIsReturningUser(true);
      }
    }
    
    // Сохраняем текущий визит
    localStorage.setItem(LAST_VISIT_KEY, now.toString());
  }, []);

  // Увеличение счётчика повторных попыток
  const incrementRetry = useCallback(() => {
    setRetryCount(prev => {
      const newCount = prev + 1;
      
      // Если превысили лимит, делаем дерево сварливым
      if (newCount >= RETRY_LIMIT) {
        setPersonality('grumpy');
      } else if (newCount === 2) {
        // На второй попытке становимся игривым
        setPersonality('playful');
      }
      
      return newCount;
    });
  }, []);

  // Сброс счётчика попыток
  const resetRetry = useCallback(() => {
    setRetryCount(0);
    if (personality === 'grumpy') {
      setPersonality('friendly');
    }
  }, [personality]);

  // Принудительно сделать дерево сварливым
  const makeGrumpy = useCallback(() => {
    setPersonality('grumpy');
  }, []);

  // Сброс личности к дружелюбной
  const resetPersonality = useCallback(() => {
    setPersonality('friendly');
    setRetryCount(0);
  }, []);

  return {
    personality,
    retryCount,
    isReturningUser,
    incrementRetry,
    resetRetry,
    makeGrumpy,
    resetPersonality,
  };
}
