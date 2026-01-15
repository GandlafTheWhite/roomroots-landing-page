/**
 * Динамический расчёт времени для чтения текста
 * @param text - текст для чтения
 * @returns время в миллисекундах
 */
export function calculateReadTime(text: string): number {
  const baseTime = 4000; // 4 секунды минимум
  const wordsPerSecond = 2.5; // средняя скорость комфортного чтения
  
  // Подсчёт слов
  const words = text.trim().split(/\s+/).length;
  
  // Подсчёт эмодзи (они читаются быстрее)
  const emojiCount = (text.match(/[\p{Emoji}]/gu) || []).length;
  
  // Расчёт времени: слова + бонус на эмодзи
  const readTime = (words / wordsPerSecond * 1000) + (emojiCount * 100);
  
  // Возвращаем максимум из базового времени и расчётного
  return Math.max(baseTime, Math.min(readTime, 8000)); // макс 8 секунд
}

/**
 * Расчёт времени показа реакции
 * @param text - текст реакции
 * @returns время в миллисекундах
 */
export function calculateReactionTime(text: string): number {
  const length = text.length;
  
  if (length < 30) return 3000; // короткие фразы - 3 сек
  if (length < 60) return 4000; // средние - 4 сек
  if (length < 100) return 5000; // длинные - 5 сек
  if (length < 150) return 6000; // очень длинные - 6 сек
  return 7000; // экстра длинные - 7 сек
}