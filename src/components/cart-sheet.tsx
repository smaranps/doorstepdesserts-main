
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash2 } from 'lucide-react';

export function CartSheet() {
  const { items, cartCount, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-0 flex items-center justify-center"
            >
              {cartCount}
            </Badge>
          )}
          <span className="sr-only">Open shopping cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>Cart ({cartCount})</SheetTitle>
        </SheetHeader>
        <Separator />
        {cartCount > 0 ? (
          <>
            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-4 p-6">
                {items.map((item) => (
                  <div key={`${item.id}-${item.variant?.id}`} className="flex items-start gap-4">
                    {item.imageUrl && (
                         <div className="relative h-20 w-20 rounded-md overflow-hidden">
                            <Image
                                src={item.imageUrl}
                                alt={item.name}
                                fill
                                className="object-cover"
                            />
                         </div>
                    )}
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      {item.variant && (
                        <p className="text-sm text-muted-foreground">{item.variant.name}</p>
                      )}
                       <p className="font-mono text-sm">${item.price.toFixed(2)}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Input
                          type="number"
                          min="0"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, item.variant?.id || null, parseInt(e.target.value))}
                          className="h-8 w-16"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeItem(item.id, item.variant?.id || null)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Separator />
            <SheetFooter className="bg-muted/50 p-6">
                <div className='w-full space-y-4'>
                    <div className="flex justify-between font-semibold">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Taxes will be calculated at checkout.
                    </p>
                     <SheetClose asChild>
                        <Button asChild className="w-full">
                            <Link href="/checkout">Continue to Checkout</Link>
                        </Button>
                    </SheetClose>
                </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            <p className="font-semibold">Your cart is empty</p>
            <SheetClose asChild>
                <Button asChild>
                    <Link href="/">Start Shopping</Link>
                </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
