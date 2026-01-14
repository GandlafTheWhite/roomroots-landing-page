import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { UserPreferences } from '@/types/dialogue';

interface ContactFormProps {
  preferences: UserPreferences;
  productName?: string;
  onSuccess: () => void;
}

export default function ContactForm({ preferences, productName, onSuccess }: ContactFormProps) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contact.trim()) {
      setError('Укажите способ связи');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://functions.poehali.dev/f718a584-99f7-488f-be28-5dae5a638c7a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          contact: contact.trim(),
          preferences,
          message: message.trim() || (productName ? `Хочу заказать: ${productName}` : ''),
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка отправки');
      }

      onSuccess();
    } catch (err) {
      setError('Не удалось отправить заявку. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-3 sm:space-y-4"
    >
      <div className="space-y-1 sm:space-y-2">
        <label className="text-slate-700 text-sm sm:text-base font-medium">Как вас зовут?</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Иван"
          className="bg-white border-slate-300 text-slate-800 placeholder:text-slate-400 h-11 sm:h-12 text-base"
        />
      </div>

      <div className="space-y-1 sm:space-y-2">
        <label className="text-slate-700 text-sm sm:text-base font-medium">Телефон или Telegram *</label>
        <Input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="+7 900 123-45-67 или @username"
          required
          className="bg-white border-slate-300 text-slate-800 placeholder:text-slate-400 h-11 sm:h-12 text-base"
        />
      </div>

      <div className="space-y-1 sm:space-y-2">
        <label className="text-slate-700 text-sm sm:text-base font-medium">Комментарий</label>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Любые пожелания..."
          className="bg-white border-slate-300 text-slate-800 placeholder:text-slate-400 min-h-[80px] text-base"
        />
      </div>

      {error && (
        <p className="text-red-600 text-sm font-medium">{error}</p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="w-full h-12 sm:h-14 text-base sm:text-lg"
      >
        {loading ? 'Отправляю...' : 'Отправить заявку 🚀'}
      </Button>

      <p className="text-slate-500 text-xs sm:text-sm text-center">
        Мы свяжемся с вами в течение дня
      </p>
    </motion.form>
  );
}