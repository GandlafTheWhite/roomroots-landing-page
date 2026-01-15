import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TreeScene from '@/components/TreeScene';
import ProductCard from '@/components/ProductCard';
import ContactForm from '@/components/ContactForm';
import DialogueBubble from '@/components/DialogueBubble';
import ChoiceButtons from '@/components/ChoiceButtons';
import LoadingIndicator from '@/components/LoadingIndicator';
import { useTreeEmotion } from '@/hooks/useTreeEmotion';
import { useDialogueVariant } from '@/hooks/useDialogueVariant';
import { useTreePersonality } from '@/hooks/useTreePersonality';
import { useTimeout } from '@/hooks/useTimeout';
import { useDigression } from '@/hooks/useDigression';
import { retryPhrases } from '@/data/dialogues';
import { calculateReactionTime } from '@/utils/timing';
import type { DialogueStep, UserPreferences, Product } from '@/types/dialogue';
import type { Digression } from '@/data/digressions';

export default function Home() {
  const { emotion, greet, think, celebrate, present, reset } = useTreeEmotion();
  const { getVariant, getReaction, getTimeoutPhrase } = useDialogueVariant();
  const { 
    personality, 
    retryCount, 
    isReturningUser,
    incrementRetry, 
    resetRetry,
    resetPersonality 
  } = useTreePersonality();
  const { 
    shouldDigress, 
    getRandomDigression, 
    currentDigression, 
    setCurrentDigression 
  } = useDigression();

  const [step, setStep] = useState<DialogueStep>('welcome');
  const [preferences, setPreferences] = useState<UserPreferences>({});
  const [message, setMessage] = useState('');
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDialogue, setShowDialogue] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);
  const [isDigressing, setIsDigressing] = useState(false);
  const [digressionButtons, setDigressionButtons] = useState<Digression['buttons']>([]);
  const [nextStepAfterDigression, setNextStepAfterDigression] = useState<DialogueStep | null>(null);

  // Таймаут на бездействие (объявляем заранее)
  const handleTimeout = useCallback(() => {
    if (!showTimeoutMessage && !loading && step !== 'welcome' && step !== 'contact' && step !== 'reveal' && !isDigressing) {
      const timeoutPhrase = getTimeoutPhrase(step);
      setShowTimeoutMessage(true);
      
      const originalMessage = message;
      setMessage(timeoutPhrase);
      
      setTimeout(() => {
        setMessage(originalMessage);
        setShowTimeoutMessage(false);
      }, 3000);
    }
  }, [showTimeoutMessage, loading, step, getTimeoutPhrase, message, isDigressing]);

  const { resetTimeout, clearTimer } = useTimeout({
    timeout: 15000,
    onTimeout: handleTimeout,
    enabled: !loading && !isTalking && step !== 'welcome' && step !== 'contact' && !isDigressing
  });

  // Функция показа отвлечения
  const showDigression = useCallback((nextStep: DialogueStep) => {
    const digression = getRandomDigression(personality);
    
    if (!digression) {
      proceedToNextStep(nextStep);
      return;
    }

    setCurrentDigression(digression);
    setIsDigressing(true);
    setMessage(digression.message);
    setNextStepAfterDigression(nextStep);
    
    if (digression.buttons) {
      setDigressionButtons(digression.buttons);
    } else if (digression.autoAdvance) {
      const readTime = calculateReactionTime(digression.message);
      setTimeout(() => {
        setIsDigressing(false);
        setDigressionButtons([]);
        proceedToNextStep(nextStep);
      }, readTime);
    }
  }, [personality, getRandomDigression, setCurrentDigression]);

  // Обработка ответа на отвлечение
  const handleDigressionResponse = useCallback((responseText: string) => {
    setMessage(responseText);
    setDigressionButtons([]);
    
    const readTime = calculateReactionTime(responseText);
    setTimeout(() => {
      setIsDigressing(false);
      if (nextStepAfterDigression) {
        proceedToNextStep(nextStepAfterDigression);
      }
    }, readTime);
  }, [nextStepAfterDigression]);

  // Переход к следующему шагу
  const proceedToNextStep = useCallback((nextStep: DialogueStep) => {
    setStep(nextStep);
    const nextMessage = getVariant(nextStep, personality);
    setMessage(nextMessage);
    reset();
    resetTimeout();
  }, [getVariant, personality, reset, resetTimeout]);

  // Инициализация приветствия
  useEffect(() => {
    if (step === 'welcome') {
      setTimeout(() => {
        const welcomeStep = isReturningUser ? 'welcomeReturning' : 'welcome';
        const welcomeMessage = getVariant(welcomeStep, personality);
        setMessage(welcomeMessage);
        setShowDialogue(true);
      }, 500);
    }
  }, [step, isReturningUser, getVariant, personality]);

  const handleStart = () => {
    resetTimeout();
    greet();
    setTimeout(() => {
      setStep('mood');
      const moodMessage = getVariant('mood', personality);
      setMessage(moodMessage);
      think();
      resetTimeout();
    }, 1000);
  };

  const handleMoodSelect = useCallback((mood: 'calm' | 'vibrant' | 'minimal') => {
    resetTimeout();
    setPreferences({ ...preferences, mood });
    
    const reaction = getReaction('mood', mood, personality);
    setMessage(reaction);
    celebrate();

    const reactionTime = calculateReactionTime(reaction);

    setTimeout(() => {
      if (shouldDigress()) {
        showDigression('location');
      } else {
        proceedToNextStep('location');
      }
    }, reactionTime);
  }, [preferences, getReaction, personality, celebrate, resetTimeout, shouldDigress, showDigression, proceedToNextStep]);

  const handleLocationSelect = useCallback((location: 'home' | 'office' | 'gift' | 'cafe') => {
    resetTimeout();
    setPreferences({ ...preferences, location });
    
    const reaction = getReaction('location', location, personality);
    setMessage(reaction);
    celebrate();

    const reactionTime = calculateReactionTime(reaction);

    setTimeout(() => {
      if (shouldDigress()) {
        showDigression('size');
      } else {
        proceedToNextStep('size');
      }
    }, reactionTime);
  }, [preferences, getReaction, personality, celebrate, resetTimeout, shouldDigress, showDigression, proceedToNextStep]);

  const handleSizeSelect = useCallback((size: 'small' | 'medium' | 'large') => {
    resetTimeout();
    setPreferences({ ...preferences, size });
    
    const reaction = getReaction('size', size, personality);
    setMessage(reaction);
    celebrate();

    const reactionTime = calculateReactionTime(reaction);

    setTimeout(() => {
      if (shouldDigress()) {
        showDigression('style');
      } else {
        proceedToNextStep('style');
      }
    }, reactionTime);
  }, [preferences, getReaction, personality, celebrate, resetTimeout, shouldDigress, showDigression, proceedToNextStep]);

  const handleStyleSelect = useCallback((style: 'warm' | 'industrial' | 'minimal') => {
    resetTimeout();
    clearTimer();
    const newPreferences = { ...preferences, style };
    setPreferences(newPreferences);
    
    const reaction = getReaction('style', style, personality);
    setMessage(reaction);
    think();

    const reactionTime = calculateReactionTime(reaction);

    setTimeout(() => {
      setStep('reveal');
      const revealMessage = getVariant('reveal', personality);
      setMessage(revealMessage);
      present();
      fetchProduct(newPreferences);
    }, reactionTime);
  }, [preferences, getReaction, getVariant, personality, think, present, resetTimeout, clearTimer]);

  const fetchProduct = async (prefs: UserPreferences) => {
    setLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/018d7e33-fd85-41ca-8ce4-0e13e1c292c0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences: prefs }),
      });
      const data = await response.json();
      setProduct(data);
      celebrate();
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (product && step === 'reveal') {
      setTimeout(() => {
        reset();
      }, 2000);
    }
  }, [product, step, reset]);

  const handleTakeProduct = useCallback(() => {
    clearTimer();
    resetRetry();
    setStep('contact');
    const contactMessage = getVariant('contact', personality);
    setMessage(contactMessage);
    think();
  }, [resetRetry, getVariant, personality, think, clearTimer]);

  const handleAnotherDrop = useCallback(() => {
    if (retryCount >= 3) {
      setIsBlocked(true);
      setMessage(retryPhrases.limit);
      
      setTimeout(() => {
        setIsBlocked(false);
        resetRetry();
      }, 10000);
      return;
    }

    resetTimeout();
    incrementRetry();
    setProduct(null);
    setStep('reveal');
    
    let retryMessage: string;
    if (retryCount === 0) {
      retryMessage = retryPhrases.first;
    } else if (retryCount === 1) {
      retryMessage = retryPhrases.second;
    } else {
      retryMessage = retryPhrases.third;
    }
    
    setMessage(retryMessage);
    
    const retryTime = calculateReactionTime(retryMessage);
    
    setTimeout(() => {
      const revealRetryMessage = getVariant('revealRetry', personality);
      setMessage(revealRetryMessage);
      present();
      fetchProduct(preferences);
    }, retryTime);
  }, [retryCount, incrementRetry, resetRetry, getVariant, personality, present, preferences, resetTimeout]);

  const handleCustomOrder = useCallback(() => {
    clearTimer();
    resetRetry();
    setStep('contact');
    const contactCustomMessage = getVariant('contactCustom', personality);
    setMessage(contactCustomMessage);
    think();
  }, [resetRetry, getVariant, personality, think, clearTimer]);

  const handleContactSuccess = useCallback(() => {
    const isGrumpy = personality === 'grumpy' || retryCount > 2;
    const thankYouStep = isGrumpy ? 'thankYouGrumpy' : 'thankYou';
    
    setStep('welcome');
    setPreferences({});
    setProduct(null);
    celebrate();
    
    setTimeout(() => {
      const thankYouMessage = getVariant(thankYouStep, personality);
      setMessage(thankYouMessage);
      setShowDialogue(true);
    }, 500);
    
    setTimeout(() => {
      reset();
      resetPersonality();
      setShowDialogue(false);
    }, 4000);
  }, [personality, retryCount, getVariant, celebrate, reset, resetPersonality]);

  return (
    <div className="w-full min-h-screen h-screen flex items-center justify-center overflow-hidden relative touch-none">
      {/* Фон с деревом */}
      <div className="absolute inset-0 w-full h-full">
        <TreeScene emotion={emotion} isTalking={isTalking} />
      </div>

      {/* Диалоговое облачко */}
      <AnimatePresence mode="wait">
        {showDialogue && message && (
          <DialogueBubble 
            key={step} 
            message={message} 
            show={true} 
            onTypingChange={setIsTalking} 
          />
        )}
        {step === 'contact' && (
          <DialogueBubble message={message} show={true} onTypingChange={setIsTalking}>
            <ContactForm
              preferences={preferences}
              productName={product?.name}
              onSuccess={handleContactSuccess}
            />
          </DialogueBubble>
        )}
      </AnimatePresence>

      {/* Кнопки выбора внизу */}
      <AnimatePresence mode="wait">
        {step === 'welcome' && showDialogue && (
          <ChoiceButtons
            layout="column"
            choices={[
              { label: 'Давай покажешь!', emoji: '🌿', onClick: handleStart },
              { label: 'Покажи сразу', variant: 'outline', onClick: () => console.log('Show all') },
              { label: 'О студии', variant: 'ghost', onClick: () => console.log('About') }
            ]}
          />
        )}

        {/* Кнопки отвлечений */}
        {isDigressing && digressionButtons && digressionButtons.length > 0 && (
          <ChoiceButtons
            key="digression"
            choices={digressionButtons.map(btn => ({
              label: btn.label,
              onClick: () => handleDigressionResponse(btn.response),
              variant: btn.label === 'Пропустим' ? 'ghost' : 'default'
            }))}
          />
        )}

        {step === 'mood' && !isDigressing && (
          <ChoiceButtons
            choices={[
              { label: 'Спокойное', emoji: '🍃', onClick: () => handleMoodSelect('calm') },
              { label: 'Яркое', emoji: '✨', onClick: () => handleMoodSelect('vibrant') },
              { label: 'Минимализм', emoji: '⚪', onClick: () => handleMoodSelect('minimal') }
            ]}
          />
        )}

        {step === 'location' && !isDigressing && (
          <ChoiceButtons
            choices={[
              { label: 'Дом', emoji: '🏠', onClick: () => handleLocationSelect('home') },
              { label: 'Офис', emoji: '💼', onClick: () => handleLocationSelect('office') },
              { label: 'Подарок', emoji: '🎁', onClick: () => handleLocationSelect('gift') },
              { label: 'Кафе', emoji: '☕', onClick: () => handleLocationSelect('cafe') }
            ]}
          />
        )}

        {step === 'size' && !isDigressing && (
          <ChoiceButtons
            choices={[
              { label: 'Компактное', emoji: 'S', onClick: () => handleSizeSelect('small') },
              { label: 'Среднее', emoji: 'M', onClick: () => handleSizeSelect('medium') },
              { label: 'Вау-объект', emoji: 'L', onClick: () => handleSizeSelect('large') }
            ]}
          />
        )}

        {step === 'style' && !isDigressing && (
          <ChoiceButtons
            choices={[
              { label: 'Тёплое дерево', emoji: '🌳', onClick: () => handleStyleSelect('warm') },
              { label: 'Бетон-лофт', emoji: '🏭', onClick: () => handleStyleSelect('industrial') },
              { label: 'Белый минимализм', emoji: '⬜', onClick: () => handleStyleSelect('minimal') }
            ]}
          />
        )}

        {step === 'reveal' && !loading && product && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4 sm:px-6 z-40"
          >
            <ProductCard
              product={product}
              onTake={handleTakeProduct}
              onAnother={isBlocked ? undefined : handleAnotherDrop}
              onCustom={handleCustomOrder}
            />
          </motion.div>
        )}

        {loading && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <LoadingIndicator />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}