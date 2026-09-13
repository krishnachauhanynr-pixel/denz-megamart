import React from 'react';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import { useCart } from '../hooks/useCart';

interface NavbarProps {
  onCartClick: () => void;
  onHomeClick: () => void;
  onSearch: (term: string) => void;
}

export function Navbar({ onCartClick, onHomeClick, onSearch }: NavbarProps) {
  const { totalItems } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
            <button className="p-2 -ml-2 text-neutral-900 hover:bg-neutral-100 transition-colors md:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <div 
              className="flex items-center cursor-pointer" 
              onClick={onHomeClick}
            >
              <span className="text-2xl font-serif font-bold text-neutral-900 tracking-tight">
                DENZ
              </span>
            </div>
          </div>
          
          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-neutral-400 group-focus-within:text-neutral-900 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border-b border-neutral-300 bg-transparent text-sm placeholder-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors"
                placeholder="Search collections..."
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center">
            <button 
              className="relative p-2 text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors flex items-center gap-2"
              onClick={onCartClick}
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="text-sm font-medium hidden sm:block uppercase tracking-wider text-[11px] mt-0.5">Bag</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-neutral-900 rounded-full min-w-[1.25rem]">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
