import React, { useState, useMemo } from 'react';
import { products } from './data/products';
import { CartProvider } from './hooks/useCart';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { CartView } from './components/CartView';
import { CheckoutView } from './components/CheckoutView';

type ViewState = 'home' | 'cart' | 'checkout';

function MainApp() {
  const [view, setView] = useState<ViewState>('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return Array.from(cats);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 flex flex-col">
      <Navbar 
        onCartClick={() => setView('cart')} 
        onHomeClick={() => setView('home')} 
        onSearch={setSearchTerm}
      />
      
      <main className="flex-1">
        {view === 'home' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            {!searchTerm && !selectedCategory && (
              <div className="mb-16 relative bg-neutral-900 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.25] bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
                <div className="relative px-8 py-20 md:py-32 md:px-16 flex flex-col items-center text-center">
                  <span className="text-neutral-400 uppercase tracking-[0.25em] text-xs font-bold mb-4 block">The Premium Edit</span>
                  <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
                    Refined Essentials<br/>For Everyday
                  </h2>
                  <p className="max-w-2xl text-lg text-neutral-300 font-light">
                    Explore our curated selection of genuine goods. Uncover the latest arrivals across tech, home, and fashion at up to 60% off.
                  </p>
                </div>
              </div>
            )}

            <div className="mb-12 overflow-x-auto pb-4 hide-scrollbar">
              <div className="flex space-x-2 min-w-max">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-6 py-2.5 rounded-full text-[11px] uppercase tracking-widest font-semibold transition-all ${
                    selectedCategory === null 
                      ? 'bg-neutral-900 text-white' 
                      : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:border-neutral-900 hover:text-neutral-900'
                  }`}
                >
                  All Products
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2.5 rounded-full text-[11px] uppercase tracking-widest font-semibold transition-all ${
                      selectedCategory === cat 
                        ? 'bg-neutral-900 text-white' 
                        : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:border-neutral-900 hover:text-neutral-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-x-8 md:gap-y-12">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full py-24 text-center text-neutral-400">
                  <p className="text-lg font-serif">No products found matching your criteria.</p>
                  <button 
                    onClick={() => { setSearchTerm(''); setSelectedCategory(null); }}
                    className="mt-6 text-sm uppercase tracking-widest border-b border-neutral-900 text-neutral-900 pb-1"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'cart' && (
          <CartView 
            onCheckout={() => setView('checkout')} 
            onContinueShopping={() => setView('home')} 
          />
        )}

        {view === 'checkout' && (
          <CheckoutView 
            onBackToHome={() => setView('home')} 
          />
        )}
      </main>

      <footer className="bg-neutral-50 border-t border-neutral-200 py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <span className="text-2xl font-serif font-bold text-neutral-900 tracking-tight mb-6">
            DENZ
          </span>
          <p className="text-neutral-500 font-light text-sm text-center max-w-md">
            Genuine goods for the discerning individual. Secure checkout, seamless experience.
          </p>
          <div className="mt-10 text-xs text-neutral-400 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Denz MegaMart.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}
