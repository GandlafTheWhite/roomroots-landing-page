import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TreeScene from '@/components/TreeScene';
import ProductCard from '@/components/ProductCard';
import ContactForm from '@/components/ContactForm';
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

  const handleStart = () => {
    greet();
    setTimeout(() => {
      setStep('mood');
      setMessage('Давай начнём с простого: какое у тебя сейчас настроение?');
      think();
    }, 1000);
  };

  const handleMoodSelect = (mood: 'calm' | 'vibrant' | 'minimal') => {
    setPreferences({ ...preferences, mood });
    celebrate();
    setTimeout(() => {
      setStep('location');
      setMessage('Отлично! А куда планируешь поселить растение?');
      reset();
    }, 1500);
  };

  const handleLocationSelect = (location: 'home' | 'office' | 'gift' | 'cafe') => {
    setPreferences({ ...preferences, location });
    celebrate();
    setTimeout(() => {
      setStep('size');
      setMessage('Понял. Сколько у тебя места?');
      reset();
    }, 1500);
  };

  const handleSizeSelect = (size: 'small' | 'medium' | 'large') => {
    setPreferences({ ...preferences, size });
    celebrate();
    setTimeout(() => {
      setStep('style');
      setMessage('Почти готово! Какой у тебя интерьер?');
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
    }, 500);
    setTimeout(() => {
      reset();
    }, 3000);
  };

  const renderWelcome = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h1 className="text-4xl font-bold text-white mb-4">
        Хэй-хэй, привет чел! 🌿
      </h1>
      <p className="text-xl text-white/80 mb-8">
        Я тут за уют отвечаю. Давай подберём что-то особенное?
      </p>
      <div className="flex flex-col gap-3">
        <Button
          size="lg"
          onClick={handleStart}
          className="text-lg"
        >
          Хочу подобрать
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="text-lg"
        >
          Покажи сразу
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="text-white/60"
        >
          О студии
        </Button>
      </div>
    </motion.div>
  );

  const renderMood = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <p className="text-2xl text-white mb-6">{message}</p>
      <div className="grid grid-cols-3 gap-4">
        <Button
          size="lg"
          variant="outline"
          onClick={() => handleMoodSelect('calm')}
          className="h-32 flex flex-col gap-2 text-white border-white/20 hover:border-white/40"
        >
          <span className="text-4xl">🍃</span>
          <span>Спокойное</span>
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => handleMoodSelect('vibrant')}
          className="h-32 flex flex-col gap-2 text-white border-white/20 hover:border-white/40"
        >
          <span className="text-4xl">✨</span>
          <span>Яркое</span>
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => handleMoodSelect('minimal')}
          className="h-32 flex flex-col gap-2 text-white border-white/20 hover:border-white/40"
        >
          <span className="text-4xl">⚪</span>
          <span>Минимализм</span>
        </Button>
      </div>
    </motion.div>
  );

  const renderLocation = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <p className="text-2xl text-white mb-6">{message}</p>
      <div className="grid grid-cols-2 gap-4">
        <Button
          size="lg"
          variant="outline"
          onClick={() => handleLocationSelect('home')}
          className="h-24 text-white border-white/20 hover:border-white/40"
        >
          🏠 Дом
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => handleLocationSelect('office')}
          className="h-24 text-white border-white/20 hover:border-white/40"
        >
          💼 Офис
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => handleLocationSelect('gift')}
          className="h-24 text-white border-white/20 hover:border-white/40"
        >
          🎁 Подарок
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => handleLocationSelect('cafe')}
          className="h-24 text-white border-white/20 hover:border-white/40"
        >
          ☕ Кафе
        </Button>
      </div>
    </motion.div>
  );

  const renderSize = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <p className="text-2xl text-white mb-6">{message}</p>
      <div className="grid grid-cols-3 gap-4">
        <Button
          size="lg"
          variant="outline"
          onClick={() => handleSizeSelect('small')}
          className="h-32 flex flex-col gap-2 text-white border-white/20 hover:border-white/40"
        >
          <span className="text-3xl">S</span>
          <span className="text-sm">Компактное</span>
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => handleSizeSelect('medium')}
          className="h-32 flex flex-col gap-2 text-white border-white/20 hover:border-white/40"
        >
          <span className="text-4xl">M</span>
          <span className="text-sm">Среднее</span>
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => handleSizeSelect('large')}
          className="h-32 flex flex-col gap-2 text-white border-white/20 hover:border-white/40"
        >
          <span className="text-5xl">L</span>
          <span className="text-sm">Вау-объект</span>
        </Button>
      </div>
    </motion.div>
  );

  const renderStyle = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <p className="text-2xl text-white mb-6">{message}</p>
      <div className="grid grid-cols-3 gap-4">
        <Button
          size="lg"
          variant="outline"
          onClick={() => handleStyleSelect('warm')}
          className="h-32 flex flex-col gap-2 text-white border-white/20 hover:border-white/40"
        >
          <span className="text-4xl">🌳</span>
          <span>Тёплое дерево</span>
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => handleStyleSelect('industrial')}
          className="h-32 flex flex-col gap-2 text-white border-white/20 hover:border-white/40"
        >
          <span className="text-4xl">🏭</span>
          <span>Бетон-лофт</span>
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => handleStyleSelect('minimal')}
          className="h-32 flex flex-col gap-2 text-white border-white/20 hover:border-white/40"
        >
          <span className="text-4xl">⬜</span>
          <span>Белый минимализм</span>
        </Button>
      </div>
    </motion.div>
  );

  const renderReveal = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <p className="text-2xl text-white mb-6">{message}</p>
      {loading || !product ? (
        <div className="text-white/60 text-center py-12">
          <div className="animate-pulse">Загружаю твоё уникальное изделие...</div>
        </div>
      ) : (
        <ProductCard
          product={product}
          onTake={handleTakeProduct}
          onAnother={handleAnotherDrop}
          onCustom={handleCustomOrder}
        />
      )}
    </motion.div>
  );

  const renderContact = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <p className="text-2xl text-white mb-6">{message}</p>
      <ContactForm
        preferences={preferences}
        productName={product?.name}
        onSuccess={handleContactSuccess}
      />
    </motion.div>
  );

  return (
    <div className="w-full h-screen flex">
      <div className="w-3/5 h-full">
        <TreeScene emotion={emotion} />
      </div>

      <div className="w-2/5 h-full flex items-center justify-center p-12 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            {step === 'welcome' && renderWelcome()}
            {step === 'mood' && renderMood()}
            {step === 'location' && renderLocation()}
            {step === 'size' && renderSize()}
            {step === 'style' && renderStyle()}
            {step === 'reveal' && renderReveal()}
            {step === 'contact' && renderContact()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}