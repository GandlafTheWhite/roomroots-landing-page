import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import type { Product } from '@/types/dialogue';

interface ProductCardProps {
  product: Product;
  onTake: () => void;
  onAnother: () => void;
  onCustom: () => void;
  onClose?: () => void;
}

export default function ProductCard({ product, onTake, onAnother, onCustom, onClose }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.8, type: 'spring' }}
      className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[65vh] sm:max-h-[70vh] overflow-y-auto relative"
    >
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow-md transition-all hover:scale-110"
          aria-label="Закрыть"
        >
          <Icon name="X" size={18} className="text-slate-600" />
        </button>
      )}
      
      <div className="aspect-square overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1 sm:mb-2">{product.name}</h3>
          <p className="text-slate-600 text-sm sm:text-base">{product.description}</p>
        </div>
        
        {product.priceRange && (
          <p className="text-slate-800 font-semibold text-base sm:text-lg">{product.priceRange}</p>
        )}
        
        <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">
            {product.available ? '✅ Есть сейчас' : '⏳ Под заказ'}
          </span>
        </div>
        
        <div className="space-y-2 pt-2 sm:pt-4">
          <Button
            size="lg"
            onClick={onTake}
            className="w-full text-base sm:text-lg h-12 sm:h-14"
          >
            Беру! 🌿
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={onAnother}
              className="h-10 sm:h-12 text-sm sm:text-base"
            >
              Ещё дроп
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onCustom}
              className="h-10 sm:h-12 text-sm sm:text-base"
            >
              Под меня
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}