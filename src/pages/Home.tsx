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
import { retryPhrases } from '@/data/dialogues';
import type { DialogueStep, UserPreferences, Product } from '@/types/dialogue';

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

  const [step, setStep] = useState<DialogueStep>('welcome');
  const [preferences, setPreferences] = useState<UserPreferences>({});
  const [message, setMessage] = useState('');
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDialogue, setShowDialogue] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);

  // Таймаут на бездействие (15 секунд)
  const handleTimeout = useCallback(() => {
    if (!showTimeoutMessage && !loading && step !== 'welcome' && step !== 'contact' && step !== 'reveal') {
      const timeoutPhrase = getTimeoutPhrase(step);
      setShowTimeoutMessage(true);
      
      // Временно показываем фразу таймаута
      const originalMessage = message;
      setMessage(timeoutPhrase);
      
      // Через 3 секунды возвращаем оригинальное сообщение
      setTimeout(() => {
        setMessage(originalMessage);
        setShowTimeoutMessage(false);
      }, 3000);
    }
  }, [showTimeoutMessage, loading, step, getTimeoutPhrase, message]);

  const { resetTimeout, clearTimer } = useTimeout({
    timeout: 15000, // 15 секунд
    onTimeout: handleTimeout,
    enabled: !loading && !isTalking && step !== 'welcome' && step !== 'contact'
  });

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
    
    // Показываем реакцию
    const reaction = getReaction('mood', mood, personality);
    setMessage(reaction);
    celebrate();

    setTimeout(() => {
      setStep('location');
      const locationMessage = getVariant('location', personality);
      setMessage(locationMessage);
      reset();
      resetTimeout();
    }, 1500);
  }, [preferences, getReaction, getVariant, personality, celebrate, reset, resetTimeout]);

  const handleLocationSelect = useCallback((location: 'home' | 'office' | 'gift' | 'cafe') => {
    resetTimeout();
    setPreferences({ ...preferences, location });
    
    // Показываем реакцию
    const reaction = getReaction('location', location, personality);
    setMessage(reaction);
    celebrate();

    setTimeout(() => {
      setStep('size');
      const sizeMessage = getVariant('size', personality);
      setMessage(sizeMessage);
      reset();
      resetTimeout();
    }, 1500);
  }, [preferences, getReaction, getVariant, personality, celebrate, reset, resetTimeout]);

  const handleSizeSelect = useCallback((size: 'small' | 'medium' | 'large') => {
    resetTimeout();
    setPreferences({ ...preferences, size });
    
    // Показываем реакцию
    const reaction = getReaction('size', size, personality);
    setMessage(reaction);
    celebrate();

    setTimeout(() => {
      setStep('style');
      const styleMessage = getVariant('style', personality);
      setMessage(styleMessage);
      reset();
      resetTimeout();
    }, 1500);
  }, [preferences, getReaction, getVariant, personality, celebrate, reset, resetTimeout]);

  const handleStyleSelect = useCallback((style: 'warm' | 'industrial' | 'minimal') => {
    resetTimeout();
    clearTimer();
    const newPreferences = { ...preferences, style };
    setPreferences(newPreferences);
    
    // Показываем реакцию
    const reaction = getReaction('style', style, personality);
    setMessage(reaction);
    think();

    setTimeout(() => {
      setStep('reveal');
      const revealMessage = getVariant('reveal', personality);
      setMessage(revealMessage);
      present();
      fetchProduct(newPreferences);
    }, 1500);
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
    // Проверка лимита попыток
    if (retryCount >= 3) {
      setIsBlocked(true);
      setMessage(retryPhrases.limit);
      
      // Блокировка на 10 секунд
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
    
    // Выбираем сообщение в зависимости от количества попыток
    let retryMessage: string;
    if (retryCount === 0) {
      retryMessage = retryPhrases.first;
    } else if (retryCount === 1) {
      retryMessage = retryPhrases.second;
    } else {
      retryMessage = retryPhrases.third;
    }
    
    setMessage(retryMessage);
    
    setTimeout(() => {
      const revealRetryMessage = getVariant('revealRetry', personality);
      setMessage(revealRetryMessage);
      present();
      fetchProduct(preferences);
    }, 1500);
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

        {step === 'mood' && (
          <ChoiceButtons
            choices={[
              { label: 'Спокойное', emoji: '🍃', onClick: () => handleMoodSelect('calm') },
              { label: 'Яркое', emoji: '✨', onClick: () => handleMoodSelect('vibrant') },
              { label: 'Минимализм', emoji: '⚪', onClick: () => handleMoodSelect('minimal') }
            ]}
          />
        )}

        {step === 'location' && (
          <ChoiceButtons
            choices={[
              { label: 'Дом', emoji: '🏠', onClick: () => handleLocationSelect('home') },
              { label: 'Офис', emoji: '💼', onClick: () => handleLocationSelect('office') },
              { label: 'Подарок', emoji: '🎁', onClick: () => handleLocationSelect('gift') },
              { label: 'Кафе', emoji: '☕', onClick: () => handleLocationSelect('cafe') }
            ]}
          />
        )}

        {step === 'size' && (
          <ChoiceButtons
            choices={[
              { label: 'Компактное', emoji: 'S', onClick: () => handleSizeSelect('small') },
              { label: 'Среднее', emoji: 'M', onClick: () => handleSizeSelect('medium') },
              { label: 'Вау-объект', emoji: 'L', onClick: () => handleSizeSelect('large') }
            ]}
          />
        )}

        {step === 'style' && (
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