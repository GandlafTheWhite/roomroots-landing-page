import { useState, useCallback } from 'react';
import { dialogues, type TreePersonality } from '@/data/dialogues';

interface UseDialogueVariantReturn {
  getVariant: (step: string, personality?: TreePersonality) => string;
  getReaction: (step: string, choice: string, personality?: TreePersonality) => string;
  getTimeoutPhrase: (step: string) => string;
}

export function useDialogueVariant(): UseDialogueVariantReturn {
  const [usedVariants, setUsedVariants] = useState<Record<string, number[]>>({});

  const getRandomIndex = useCallback((step: string, length: number): number => {
    const used = usedVariants[step] || [];
    
    // Если использованы все варианты, сбрасываем
    if (used.length >= length) {
      setUsedVariants(prev => ({ ...prev, [step]: [] }));
      return Math.floor(Math.random() * length);
    }

    // Выбираем неиспользованный индекс
    let index: number;
    do {
      index = Math.floor(Math.random() * length);
    } while (used.includes(index));

    // Запоминаем использованный индекс
    setUsedVariants(prev => ({
      ...prev,
      [step]: [...(prev[step] || []), index],
    }));

    return index;
  }, [usedVariants]);

  const getVariant = useCallback(
    (step: string, personality?: TreePersonality): string => {
      const stepDialogue = dialogues[step];
      
      if (!stepDialogue || !stepDialogue.variants) {
        console.warn(`No dialogue found for step: ${step}`);
        return '';
      }

      const variants = stepDialogue.variants;

      // Если указана личность, пытаемся найти подходящий вариант
      if (personality) {
        const personalityVariants = variants.filter(v => v.mood === personality);
        if (personalityVariants.length > 0) {
          const index = Math.floor(Math.random() * personalityVariants.length);
          return personalityVariants[index].text;
        }
      }

      // Иначе выбираем случайный неиспользованный вариант
      const index = getRandomIndex(step, variants.length);
      return variants[index].text;
    },
    [getRandomIndex]
  );

  const getReaction = useCallback(
    (step: string, choice: string, personality?: TreePersonality): string => {
      const stepDialogue = dialogues[step];

      if (!stepDialogue) {
        console.warn(`No dialogue found for step: ${step}`);
        return '';
      }

      // Если дерево в плохом настроении, используем grumpy реакции
      if (personality === 'grumpy' && stepDialogue.grumpyReactions) {
        return stepDialogue.grumpyReactions[choice] || '';
      }

      // Иначе выбираем случайную реакцию из массива
      if (stepDialogue.reactions && stepDialogue.reactions[choice]) {
        const reactions = stepDialogue.reactions[choice];
        const index = Math.floor(Math.random() * reactions.length);
        return reactions[index];
      }

      return '';
    },
    []
  );

  const getTimeoutPhrase = useCallback((step: string): string => {
    const stepDialogue = dialogues[step];
    return stepDialogue?.timeoutPhrase || "Эй, ты ещё здесь? 👀";
  }, []);

  return {
    getVariant,
    getReaction,
    getTimeoutPhrase,
  };
}
