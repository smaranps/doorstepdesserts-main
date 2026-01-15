
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/cart-context';
import { useRouter } from 'next/navigation';

type DeliveryOption = 'delivery' | 'pickup';

export default function CheckoutPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>('delivery');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const { items } = useCart();
  const router = useRouter();


  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim();
  };

  const formatExpiry = (value: string) => {
    return value
      .replace(/\//g, '')
      .slice(0, 4)
      .replace(/(\d{2})/, '$1/')
      .trim()
      .slice(0, 5);
  };

  useEffect(() => {
    const validateForm = () => {
      const newErrors: { [key: string]: string } = {};

      if (!name) newErrors.name = 'Full Name is required.';
      if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        newErrors.email = 'Please enter a valid email address.';
      }
      if (deliveryOption === 'delivery') {
        if (!address) newErrors.address = 'Street Address is required.';
        if (!city) newErrors.city = 'City is required.';
        if (!postalCode) newErrors.postalCode = 'Postal Code is required.';
      }
      if (cardNumber.replace(/\s/g, '').length !== 16) {
        newErrors.cardNumber = 'Card number must be 16 digits.';
      }
      const [month, year] = expiry.split('/');
      if (!month || !year || month.length !== 2 || year.length !== 2) {
        newErrors.expiry = 'Expiry must be in MM/YY format.';
      } else {
        const expiryDate = new Date(Number(`20${year}`), Number(month) -1);
        const now = new Date();
        now.setMonth(now.getMonth() -1);
        if (expiryDate < now) {
            newErrors.expiry = 'Card has expired.';
        }
      }
      if (cvc.length < 3 || cvc.length > 4) {
        newErrors.cvc = 'CVC must be 3 or 4 digits.';
      }

      setErrors(newErrors);
      setIsFormValid(Object.keys(newErrors).length === 0);
    };

    validateForm();
  }, [name, email, deliveryOption, address, city, postalCode, cardNumber, expiry, cvc]);

  const handlePlaceOrder = () => {
    if (isFormValid) {
        sessionStorage.setItem('orderConfirmation', JSON.stringify(items));
        router.push('/checkout/success');
    }
  }


  return (
    <div className="container mx-auto py-12 px-4 grid md:grid-cols-2 gap-12 items-start">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Checkout</CardTitle>
          <CardDescription>
            Enter your information to place your order.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Contact Information</Label>
            <div className='space-y-2 border p-4 rounded-md'>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Jane Doe" value={name} onChange={(e) => setName(e.target.value)} />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="jane.doe@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>
            </div>
          </div>
          
           <div className="space-y-2">
            <Label>Delivery Method</Label>
             <RadioGroup
              defaultValue="delivery"
              onValueChange={(value: string) => setDeliveryOption(value as DeliveryOption)}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem value="delivery" id="delivery" className="peer sr-only" />
                <Label
                  htmlFor="delivery"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  Doorstep Delivery
                </Label>
              </div>
              <div>
                <RadioGroupItem value="pickup" id="pickup" className="peer sr-only" />
                <Label
                  htmlFor="pickup"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  In-Store Pickup
                </Label>
              </div>
            </RadioGroup>
          </div>

          {deliveryOption === 'delivery' && (
            <div className="space-y-2">
              <Label>Shipping Address</Label>
              <div className='space-y-2 border p-4 rounded-md'>
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" placeholder="123 Main St" value={address} onChange={(e) => setAddress(e.target.value)} />
                  {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="Anytown" value={city} onChange={(e) => setCity(e.target.value)} />
                        {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input id="postalCode" placeholder="A1B 2C3" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                        {errors.postalCode && <p className="text-sm text-destructive">{errors.postalCode}</p>}
                    </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
             <Label>Payment Information</Label>
            <div className='space-y-2 border p-4 rounded-md'>
                <div className="space-y-2">
                  <Label htmlFor="card">Card Number</Label>
                  <Input
                    id="card"
                    placeholder="0000 0000 0000 0000"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    maxLength={19}
                  />
                  {errors.cardNumber && <p className="text-sm text-destructive">{errors.cardNumber}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    />
                    {errors.expiry && <p className="text-sm text-destructive">{errors.expiry}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVV</Label>
                    <Input
                      id="cvc"
                      placeholder="123"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
                      maxLength={3}
                    />
                    {errors.cvc && <p className="text-sm text-destructive">{errors.cvc}</p>}
                  </div>
                </div>
            </div>
          </div>
          <Button onClick={handlePlaceOrder} disabled={!isFormValid} className="w-full" type="submit">
            Place Order
          </Button>
        </CardContent>
      </Card>
      <div className="hidden md:block rounded-lg overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1605974322251-8f0da751f98f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8ZnVkZ2UlMjBicm93bmllc3xlbnwwfHx8fDE3Njc2NDY5MzR8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Gooey Fudge Brownies"
          width={600}
          height={400}
          className="w-full h-auto object-cover"
          data-ai-hint="fudge brownies"
        />
      </div>
    </div>
  );
}
