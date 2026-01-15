
"use client";

import Image from 'next/image';
import { useState } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Dessert, DessertVariant } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { Badge } from './ui/badge';

interface ProductCardProps {
  product: Dessert;
}

export function ProductCard({ product }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<DessertVariant | null>(
    product.variants?.[0] || null
  );
  const { addItem } = useCart();

  const image = PlaceHolderImages.find((img) => img.id === product.imageId);

  const handleAddToCart = () => {
    addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        variant: selectedVariant,
        quantity: 1,
        imageUrl: image?.imageUrl,
    });
  }

  const hasVariants = product.variants && product.variants.length > 0;

  return (
    <Card
      key={product.id}
      className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <CardHeader className="p-0">
        {image && (
          <div className="aspect-[3/2] w-full relative">
             {product.featured && (
              <Badge className="absolute top-2 right-2 z-10">Featured</Badge>
            )}
            <Image
              src={image.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              data-ai-hint={image.imageHint}
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-headline mb-1">
          {product.name}
        </CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex flex-wrap justify-between items-center bg-muted/50 gap-4">
         <div className="flex justify-between items-center w-full">
            <p className="text-lg font-bold text-primary">
            ${product.price.toFixed(2)}
            </p>
        </div>
        <div className="w-full flex items-center gap-2">
          {hasVariants ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex-1 justify-between">
                    {selectedVariant ? selectedVariant.name : 'Flavor'}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {product.variants!.map((variant) => (
                    <DropdownMenuItem
                      key={variant.id}
                      onSelect={() => setSelectedVariant(variant)}
                    >
                      {variant.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={handleAddToCart} className="flex-1">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </>
          ) : (
            <Button onClick={handleAddToCart} className="w-full">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
