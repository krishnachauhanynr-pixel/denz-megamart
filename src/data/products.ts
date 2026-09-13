import { Product } from '../types';

const rawProducts = [
  {
    name: "Phone Case",
    category: "Mobile & Tech Accessories",
    imageUrl: "https://images.unsplash.com/photo-1603313011101-320f6664c287?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Wireless Charging Pad",
    category: "Mobile & Tech Accessories",
    imageUrl: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Bluetooth Speaker",
    category: "Mobile & Tech Accessories",
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423fa4613c7a?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Mechanical Keyboard",
    category: "Mobile & Tech Accessories",
    imageUrl: "https://images.unsplash.com/photo-1595225476474-87521fb5a403?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Vegetable Slicer",
    category: "Home & Kitchen",
    imageUrl: "https://images.unsplash.com/photo-1596660616110-6bf79e2764b8?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Oil Sprayer",
    category: "Home & Kitchen",
    imageUrl: "https://images.unsplash.com/photo-1607006411516-7fb1684c8a20?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Bamboo Chopping Board",
    category: "Home & Kitchen",
    imageUrl: "https://images.unsplash.com/photo-1621217643564-96f30691e847?auto=format&fit=crop&w=900&q=80",
  },
];

function pseudoRandom(seed: number) {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export const products: Product[] = rawProducts.map((p, index) => {
  const seed = index + 1;
  const originalPrice = Math.floor(pseudoRandom(seed) * 150) * 100 + 499; // 499 to 15499 INR
  const discountPercentage = Math.floor(pseudoRandom(seed + 100) * 21) + 40; // 40 to 60
  const discountPrice = Math.floor(originalPrice * (1 - discountPercentage / 100));
  const rating = Number(((pseudoRandom(seed + 200) * 1.5) + 3.5).toFixed(1)); // 3.5 to 5.0
  const reviewCount = Math.floor(pseudoRandom(seed + 300) * 500) + 12; // 12 to 511

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
