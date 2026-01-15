export type DessertVariant = {
  id: string;
  name: string;
};

export type Dessert = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageId: string;
  variants?: DessertVariant[];
  featured?: boolean;
};

export type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    variant: DessertVariant | null;
    imageUrl?: string;
}
