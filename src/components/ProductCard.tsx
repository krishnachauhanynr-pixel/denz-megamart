import React from 'react';
import { ShoppingBag, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';
import { formatINR } from '../utils/currency';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white flex flex-col h-full">
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 mb-4">
        <img 
          src={product.imageUrl}
          alt={product.name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute top-4 left-4 bg-neutral-900 text-white text-[10px] uppercase tracking-widest font-semibold px-3 py-1.5">
          {product.discountPercentage}% OFF
        </div>
        <button 
          onClick={() => addToCart(product)}
          className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md hover:bg-neutral-900 hover:text-white text-neutral-900 text-sm font-medium py-3 px-4 translate-y-16 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" /> Add to Bag
        </button>
      </div>
      
      <div className="flex flex-col flex-1 px-1">
        <div className="flex items-center justify-between mb-1.5">
          <div className="text-[10px] text-neutral-500 font-medium uppercase tracking-widest">{product.category}</div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-neutral-400 text-neutral-400" />
            <span className="text-[10px] font-medium text-neutral-500">{product.rating.toFixed(1)} ({product.reviewCount})</span>
          </div>
        </div>
        <h3 className="text-base font-serif text-neutral-900 mb-3 line-clamp-1 flex-1">{product.name}</h3>
        
        <div className="flex items-center gap-3 mt-auto">
          <div className="text-lg font-medium text-neutral-900">{formatINR(product.discountPrice)}</div>
          <div className="text-sm text-neutral-400 line-through">{formatINR(product.originalPrice)}</div>
        </div>
      </div>
    </div>
  );
}
