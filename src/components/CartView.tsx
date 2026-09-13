import React from 'react';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatINR } from '../utils/currency';

interface CartViewProps {
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export function CartView({ onCheckout, onContinueShopping }: CartViewProps) {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-neutral-100 rounded-full mb-8">
          <ShoppingBag className="h-8 w-8 text-neutral-400" />
        </div>
        <h2 className="text-2xl font-serif text-neutral-900 mb-4">Your bag is empty</h2>
        <p className="text-neutral-500 mb-10 max-w-md mx-auto font-light">Explore our latest collections and find something exceptional to add to your bag.</p>
        <button 
          onClick={onContinueShopping}
          className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-colors tracking-wide"
        >
          DISCOVER PRODUCTS
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif text-neutral-900 mb-12">Shopping Bag</h1>
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-16 lg:items-start">
        <div className="lg:col-span-8">
          <div className="border-t border-neutral-200 divide-y divide-neutral-200">
            {cart.map((item) => (
              <div key={item.id} className="flex py-8">
                <div className="flex-shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-32 h-40 object-cover bg-neutral-100"
                  />
                </div>

                <div className="ml-6 flex-1 flex flex-col justify-between">
                  <div className="relative sm:grid sm:grid-cols-2 sm:gap-x-6">
                    <div>
                      <h3 className="text-base font-medium text-neutral-900 font-serif">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-[10px] uppercase tracking-widest text-neutral-500">{item.category}</p>
                      <div className="mt-4 flex items-center gap-3">
                        <p className="text-base font-medium text-neutral-900">{formatINR(item.discountPrice)}</p>
                        <p className="text-sm text-neutral-400 line-through">{formatINR(item.originalPrice)}</p>
                      </div>
                    </div>

                    <div className="mt-4 sm:mt-0 flex flex-col items-start sm:items-end justify-between">
                      <div className="flex items-center border border-neutral-300 rounded-none h-10">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 text-neutral-500 hover:text-neutral-900 transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-4 text-sm font-medium text-neutral-900 w-12 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 text-neutral-500 hover:text-neutral-900 transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="mt-4 sm:mt-0 text-[11px] uppercase tracking-wider font-medium text-neutral-400 hover:text-neutral-900 transition-colors inline-flex items-center gap-1.5"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-neutral-50 p-8 lg:mt-0 lg:col-span-4 lg:sticky lg:top-28">
          <h2 className="text-lg font-serif text-neutral-900 mb-6 border-b border-neutral-200 pb-4">Order Summary</h2>
          
          <dl className="mt-6 space-y-4 font-light text-neutral-600">
            <div className="flex items-center justify-between">
              <dt className="text-sm">Subtotal</dt>
              <dd className="text-sm font-medium text-neutral-900">{formatINR(totalPrice)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm">Shipping</dt>
              <dd className="text-sm font-medium text-neutral-900">Complimentary</dd>
            </div>
            <div className="flex items-center justify-between border-t border-neutral-200 pt-4 mt-4">
              <dt className="text-base font-medium text-neutral-900">Total</dt>
              <dd className="text-lg font-medium text-neutral-900">{formatINR(totalPrice)}</dd>
            </div>
          </dl>

          <div className="mt-8">
            <button
              onClick={onCheckout}
              className="w-full flex items-center justify-center bg-neutral-900 text-white py-4 px-4 text-sm font-medium hover:bg-neutral-800 transition-colors tracking-wide"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
