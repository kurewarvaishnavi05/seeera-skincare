"use client";

import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/useCartStore';
import { Product } from '@/lib/products';

export function ClientAddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCartStore();
  
  return (
    <Button 
      size="lg" 
      className="w-full py-4 text-lg shadow-xl"
      onClick={() => addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      })}
    >
      Add to Cart - {product.formattedPrice}
    </Button>
  );
}
