import { useState, useCallback } from 'react';
import { 
  allDigressions, 
  digressionWeights, 
  type Digression 
} from '@/data/digressions';
import type { TreePersonality } from '@/data/dialogues';

interface UseDigressionReturn {
  shouldDigress: () => boolean;
  getRandomDigression: (personality: TreePersonality, excludeIds?: string[]) => Digression | null;
  currentDigression: Digression | null;
  setCurrentDigression: (digression: Digression | null) => void;
  usedDigressionIds: string[];
  resetUsedDigressions: () => void;
}

const DIGRESSION_PROBABILITY = 0.35; // 35% шанс отвлечения

export function useDigression(): UseDigressionReturn {
  const [currentDigression, setCurrentDigression] = useState<Digression | null>(null);
  const [usedDigressionIds, setUsedDigressionIds] = useState<string[]>([]);

  // Проверка, нужно ли показывать отвлечение
  const shouldDigress = useCallback((): boolean => {
    return Math.random() < DIGRESSION_PROBABILITY;
  }, []);

  // Получение случайного отвлечения с учётом весов
  const getRandomDigression = useCallback(
    (personality: TreePersonality, excludeIds: string[] = []): Digression | null => {
      // Фильтруем уже использованные и исключённые
      const availableDigressions = allDigressions.filter(
        d => !usedDigressionIds.includes(d.id) && !excludeIds.includes(d.id)
      );

      if (availableDigressions.length === 0) {
        // Если все использованы, сбрасываем историю
        setUsedDigressionIds([]);
        return getRandomDigression(personality, excludeIds);
      }

      // Получаем веса для текущей личности
      const weights = digressionWeights[personality];

      // Создаём взвешенный пул
      const weightedPool: Digression[] = [];
      availableDigressions.forEach(digression => {
        const weight = weights[digression.type] || 10;
        
        // Дополнительный вес, если mood совпадает
        const moodBonus = digression.mood === personality ? 1.5 : 1;
        
        const finalWeight = Math.floor(weight * moodBonus);
        
        // Добавляем digression в пул weight раз
        for (let i = 0; i < finalWeight; i++) {
          weightedPool.push(digression);
        }
      });

      if (weightedPool.length === 0) {
        return null;
      }

      // Выбираем случайный элемент из взвешенного пула
      const randomIndex = Math.floor(Math.random() * weightedPool.length);
      const selected = weightedPool[randomIndex];

      // Запоминаем использованный ID
      setUsedDigressionIds(prev => [...prev, selected.id]);

      return selected;
    },
    [usedDigressionIds]
  );

  const resetUsedDigressions = useCallback(() => {
    setUsedDigressionIds([]);
  }, []);

  return {
    shouldDigress,
    getRandomDigression,
    currentDigression,
    setCurrentDigression,
    usedDigressionIds,
    resetUsedDigressions
  };
}
