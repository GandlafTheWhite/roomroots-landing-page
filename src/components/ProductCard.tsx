import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types/dialogue';

interface ProductCardProps {
  product: Product;
  onTake: () => void;
  onAnother: () => void;
  onCustom: () => void;
}

export default function ProductCard({ product, onTake, onAnother, onCustom }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.8, type: 'spring' }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
          <p className="text-white/70 text-sm">{product.description}</p>
        </div>
        
        {product.priceRange && (
          <p className="text-white/90 font-medium">{product.priceRange}</p>
        )}
        
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-3 py-1 bg-white/10 rounded-full text-white/80">
            {product.available ? '✅ Есть сейчас' : '⏳ Под заказ'}
          </span>
        </div>
        
        <div className="space-y-2 pt-4">
          <Button
            size="lg"
            onClick={onTake}
            className="w-full"
          >
            Беру! 🌿
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={onAnother}
              className="text-white border-white/20 hover:border-white/40"
            >
              Ещё дроп
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onCustom}
              className="text-white border-white/20 hover:border-white/40"
            >
              Под меня
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
