
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { CartItem } from '@/lib/types';


export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  const [confirmedOrder, setConfirmedOrder] = useState<CartItem[]>([]);
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    const orderJson = sessionStorage.getItem('orderConfirmation');
    if (orderJson) {
      const orderItems = JSON.parse(orderJson);
      setConfirmedOrder(orderItems);
      
      const total = orderItems.reduce((acc: number, item: CartItem) => acc + item.price * item.quantity, 0);
      setOrderTotal(total);

      sessionStorage.removeItem('orderConfirmation');
      clearCart();
    }
  }, [clearCart]);

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <CardTitle className="text-3xl font-headline">
            Order Confirmed!
          </CardTitle>
          <CardDescription>
            Thank you for your purchase. You will receive an email confirmation shortly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {confirmedOrder.length > 0 && (
             <div className="space-y-4">
              <h3 className="font-semibold text-lg">Order Summary</h3>
              <div className="border rounded-md p-4 space-y-4">
                {confirmedOrder.map(item => (
                  <div key={`${item.id}-${item.variant?.id}`} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                       {item.imageUrl && (
                         <div className="relative h-16 w-16 rounded-md overflow-hidden">
                            <Image
                                src={item.imageUrl}
                                alt={item.name}
                                fill
                                className="object-cover"
                            />
                         </div>
                       )}
                       <div>
                         <p className="font-medium">{item.name}</p>
                         <p className="text-sm text-muted-foreground">
                           Quantity: {item.quantity}
                         </p>
                       </div>
                    </div>
                    <p className="font-mono">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between font-semibold">
                  <p>Total</p>
                  <p>${orderTotal.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full" asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
