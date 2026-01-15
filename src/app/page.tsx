
'use client';

import Image from 'next/image';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ShoppingCart } from 'lucide-react';

const Logo = () => (
  <svg
    className="h-16 w-16 text-white drop-shadow-md"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="hsla(0, 0%, 100%, 0.2)"
    />
    <path
      d="M2 7L12 12L22 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 22V12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.5 4.5L16 9L12 12L8 9L6.5 4.5"
      stroke="hsl(var(--primary-foreground))"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


export default function Home() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMenuVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '0px 0px -100px 0px',
      }
    );

    if (menuRef.current) {
      observer.observe(menuRef.current);
    }

    return () => {
      if (menuRef.current) {
        observer.unobserve(menuRef.current);
      }
    };
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredProduct = useMemo(() => products.find(p => p.featured), []);
  const featuredImage = useMemo(() => featuredProduct ? PlaceHolderImages.find(img => img.id === featuredProduct.imageId) : null, [featuredProduct]);


  return (
    <div className="bg-background">
      <section className="relative text-center py-20 md:py-32 px-4 flex flex-col items-center justify-center text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlfGVufDB8fHx8MTc2NzY0NjkzNHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Delicious chocolate cake"
            fill
            className="object-cover"
            data-ai-hint="chocolate cake"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <Logo />
          <h1 className="text-4xl md:text-6xl font-headline font-bold mt-4 mb-4 drop-shadow-md">
            Doorstep Desserts
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-2xl drop-shadow-sm">
            Handcrafted desserts, delivered right to your door.
          </p>
        </div>
      </section>
      <section id="menu" className="py-16 md:py-24" ref={menuRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
              Our Menu
            </h2>
            <div className="mt-4 max-w-md mx-auto">
               <Input
                    type="text"
                    placeholder="Search our delicious desserts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className={cn(
                  'opacity-0',
                  isMenuVisible && 'animate-fade-in-up'
                )}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
             {filteredProducts.length === 0 && (
                <div className="text-center text-muted-foreground col-span-full">
                    <p>No desserts found for "{searchTerm}".</p>
                </div>
            )}
          </div>
        </div>
      </section>

      {featuredProduct && (
        <section id="featured" className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="rounded-lg overflow-hidden shadow-xl aspect-[4/3] relative">
                {featuredImage && (
                  <Image
                    src={featuredImage.imageUrl}
                    alt={featuredProduct.name}
                    fill
                    className="object-cover"
                    data-ai-hint={featuredImage.imageHint}
                  />
                )}
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Featured Dessert</h3>
                <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">{featuredProduct.name}</h2>
                <p className="text-muted-foreground mb-6">{featuredProduct.description}</p>
                 <div className="flex items-center gap-4">
                    <p className="text-2xl font-bold text-primary">${featuredProduct.price.toFixed(2)}</p>
                    <Button 
                      size="lg"
                      onClick={() => addItem({
                        id: featuredProduct.id,
                        name: featuredProduct.name,
                        price: featuredProduct.price,
                        quantity: 1,
                        variant: null,
                        imageUrl: featuredImage?.imageUrl
                      })}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

       <section id="about" className="relative py-16 md:py-24 text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVzc2VydHxlbnwwfHwwfHx8MA%3D%3D"
            alt="Baking ingredients"
            fill
            className="object-cover"
            data-ai-hint="baking ingredients"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2870.737134375176!2d-78.89212002380536!3d43.92131367109214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d51cf8f114757f%3A0x69f6983726591321!2s301%20Simcoe%20St%20N%2C%20Oshawa%2C%20ON%20L1G%204X6%2C%20Canada!5e0!3m2!1sen!2sus!4v1727712398539!5m2!1sen!2sus"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
              ></iframe>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
                About Us
              </h2>
              <p className="text-gray-300 mb-4">
                Founded by Nikola Kostic and Smaran Pinisetty in January 2026, both of them carried out this operation with the goal of having valiant customer service and amazing food quality while making sure everything is locally sourced and homemade. 
              </p>
              <p className="text-gray-300">
                Our company uses only the finest ingredients that are sourced locally to handcraft every brownie, cookie, and cake. Our goal is to deliver a little piece of happiness and fun, right to your doorstep. If it means to celebrate a party with others or just hungry, Doorstep Desserts is always ready to serve you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
