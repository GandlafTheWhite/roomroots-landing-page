import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TreeScene from '@/components/TreeScene';
import ProductCard from '@/components/ProductCard';
import ContactForm from '@/components/ContactForm';
import DialogueBubble from '@/components/DialogueBubble';
import ChoiceButtons from '@/components/ChoiceButtons';
import { useTreeEmotion } from '@/hooks/useTreeEmotion';
import { Button } from '@/components/ui/button';
import type { DialogueStep, UserPreferences, Product } from '@/types/dialogue';

export default function Home() {
  const { emotion, greet, think, celebrate, present, reset } = useTreeEmotion();
  const [step, setStep] = useState<DialogueStep>('welcome');
  const [preferences, setPreferences] = useState<UserPreferences>({});
  const [message, setMessage] = useState('');
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDialogue, setShowDialogue] = useState(false);

  useEffect(() => {
    if (step === 'welcome') {
      setTimeout(() => setShowDialogue(true), 500);
    }
  }, [step]);

  const handleStart = () => {
    greet();
    setTimeout(() => {
      setStep('mood');
      setMessage('Окей! Слушай, какая у тебя сейчас вайб-энергия?');
      think();
    }, 1000);
  };

  const handleMoodSelect = (mood: 'calm' | 'vibrant' | 'minimal') => {
    setPreferences({ ...preferences, mood });
    celebrate();
    setTimeout(() => {
      setStep('location');
      setMessage('О, круто! А где ты проводишь больше времени?');
      reset();
    }, 1500);
  };

  const handleLocationSelect = (location: 'home' | 'office' | 'gift' | 'cafe') => {
    setPreferences({ ...preferences, location });
    celebrate();
    setTimeout(() => {
      setStep('size');
      setMessage('Ага, понял. У тебя много места или компактно живёшь?');
      reset();
    }, 1500);
  };

  const handleSizeSelect = (size: 'small' | 'medium' | 'large') => {
    setPreferences({ ...preferences, size });
    celebrate();
    setTimeout(() => {
      setStep('style');
      setMessage('Последний вопросик: какая у тебя обстановка?');
      reset();
    }, 1500);
  };

  const handleStyleSelect = (style: 'warm' | 'industrial' | 'minimal') => {
    const newPreferences = { ...preferences, style };
    setPreferences(newPreferences);
    think();
    setTimeout(() => {
      setStep('reveal');
      setMessage('Окей, я кое-что нашёл... Дай-ка я потрясу ветки!');
      present();
      fetchProduct(newPreferences);
    }, 1500);
  };

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

  const handleTakeProduct = () => {
    setStep('contact');
    setMessage('Отлично! Как с тобой связаться?');
    think();
  };

  const handleAnotherDrop = () => {
    setProduct(null);
    setStep('reveal');
    setMessage('Ещё разок потрясу ветки!');
    present();
    fetchProduct(preferences);
  };

  const handleCustomOrder = () => {
    setStep('contact');
    setMessage('Круто! Расскажи, что хочешь');
    think();
  };

  const handleContactSuccess = () => {
    setStep('welcome');
    setMessage('');
    setPreferences({});
    setProduct(null);
    celebrate();
    setTimeout(() => {
      setMessage('Спасибо! Скоро свяжемся 🌿');
      setShowDialogue(true);
    }, 500);
    setTimeout(() => {
      reset();
      setShowDialogue(false);
    }, 3000);
  };

  return (
    <div className="w-full min-h-screen h-screen flex items-center justify-center overflow-hidden relative">
      {/* Фон с деревом */}
      <div className="absolute inset-0 w-full h-full">
        <TreeScene emotion={emotion} />
      </div>

      {/* Диалоговое облачко */}
      <AnimatePresence mode="wait">
        {step === 'welcome' && showDialogue && (
          <DialogueBubble message="Хэй-хэй! Я тут живу 🌿\n\nЗнаешь, я видел столько интересного в этих краях... Хочешь, покажу что-нибудь крутое?" show={true} />
        )}
        {step === 'mood' && <DialogueBubble message={message} show={true} />}
        {step === 'location' && <DialogueBubble message={message} show={true} />}
        {step === 'size' && <DialogueBubble message={message} show={true} />}
        {step === 'style' && <DialogueBubble message={message} show={true} />}
        {step === 'reveal' && <DialogueBubble message={message} show={true} />}
        {step === 'contact' && (
          <DialogueBubble message={message} show={true}>
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
              onAnother={handleAnotherDrop}
              onCustom={handleCustomOrder}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Индикатор загрузки */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-12 left-1/2 -translate-x-1/2 text-white/80 text-lg sm:text-xl font-medium z-30"
        >
          <div className="bg-slate-900/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl">
            <div className="flex items-center gap-3">
              <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
              <span>Ищу что-то особенное...</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
