import { useEffect, useRef, useCallback } from 'react';

interface UseTimeoutOptions {
  timeout: number; // в миллисекундах
  onTimeout: () => void;
  enabled?: boolean;
}

export function useTimeout({ timeout, onTimeout, enabled = true }: UseTimeoutOptions) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onTimeoutRef = useRef(onTimeout);

  // Обновляем ref при изменении callback
  useEffect(() => {
    onTimeoutRef.current = onTimeout;
  }, [onTimeout]);

  // Сброс таймера
  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (enabled) {
      timeoutRef.current = setTimeout(() => {
        onTimeoutRef.current();
      }, timeout);
    }
  }, [timeout, enabled]);

  // Очистка таймера
  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { resetTimeout, clearTimer };
}
