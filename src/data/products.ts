import { Product } from '../types';

const catalog: Record<string, string[]> = {
  "Apple Phones": [
    "iPhone 15 Pro",
    "iPhone 15",
    "iPhone 14 Pro",
    "iPhone 14",
    "iPhone 13",
    "iPhone SE"
  ],
  "Samsung Phones": [
    "Galaxy S24 Ultra",
    "Galaxy S24+",
    "Galaxy S24",
    "Galaxy S23 Ultra",
    "Galaxy S23+",
    "Galaxy S23",
    "Galaxy A54",
    "Galaxy A34"
  ]
};

const categoryImageUrls: Record<string, string[]> = {
  "Apple Phones": [
    "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=80"
  ],
  "Samsung Phones": [
    "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80"
  ]
};

const defaultImages = [
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=80"
];

function pseudoRandom(seed: number) {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

const rawProducts = Object.entries(catalog).flatMap(([category, names]) => {
  const images = categoryImageUrls[category] ?? defaultImages;

  return names.map((name, index) => ({
    name,
    category,
    imageUrl: images[index % images.length],
  }));
});

export const products: Product[] = rawProducts.map((p, index) => {
  const seed = index + 1;
  const originalPrice = Math.floor(pseudoRandom(seed) * 150) * 100 + 499;
  const discountPercentage = Math.floor(pseudoRandom(seed + 100) * 21) + 40;
  const discountPrice = Math.floor(originalPrice * (1 - discountPercentage / 100));
  const rating = Number(((pseudoRandom(seed + 200) * 1.5) + 3.5).toFixed(1));
  const reviewCount = Math.floor(pseudoRandom(seed + 300) * 500) + 12;

  return {
    id: `prod-${seed}`,
    name: p.name,
    category: p.category,
    originalPrice,
    discountPrice,
    discountPercentage,
    imageUrl: p.imageUrl,
    rating,
    reviewCount,
  };
});
