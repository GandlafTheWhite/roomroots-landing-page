/**
 * Динамический расчёт времени для чтения текста
 * @param text - текст для чтения
 * @returns время в миллисекундах
 */
export function calculateReadTime(text: string): number {
  const baseTime = 2000; // 2 секунды минимум
  const wordsPerSecond = 2.5; // средняя скорость комфортного чтения
  
  // Подсчёт слов
  const words = text.trim().split(/\s+/).length;
  
  // Подсчёт эмодзи (они читаются быстрее)
  const emojiCount = (text.match(/[\p{Emoji}]/gu) || []).length;
  
  // Расчёт времени: слова + бонус на эмодзи
  const readTime = (words / wordsPerSecond * 1000) + (emojiCount * 100);
  
  // Возвращаем максимум из базового времени и расчётного
  return Math.max(baseTime, Math.min(readTime, 6000)); // макс 6 секунд
}

/**
 * Расчёт времени показа реакции
 * @param text - текст реакции
 * @returns время в миллисекундах
 */
export function calculateReactionTime(text: string): number {
  const length = text.length;
  
  if (length < 30) return 2000; // короткие фразы - 2 сек
  if (length < 60) return 3000; // средние - 3 сек
  if (length < 100) return 4000; // длинные - 4 сек
  return 5000; // очень длинные - 5 сек
}
