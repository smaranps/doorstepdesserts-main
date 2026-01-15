import type { Dessert } from '@/lib/types';

export const products: Dessert[] = [
    {
        id: 'gooey-brownies',
        name: 'Fudge Brownies (4)',
        description: 'A half-dozen rich, fudgy brownies with a crispy top and amazing taste.',
        price: 12.00,
        imageId: 'gooey-brownies'
    },
    {
        id: 'chocolate-chip-cookies',
        name: 'Chocolate Chip Cookies (12)',
        description: 'A dozen classic chocolate chip cookies, crispy on the outside, chewy on the inside. It is a tasty treat which is quick to eat.',
        price: 20.00,
        imageId: 'chocolate-chip-cookies'
    },
    {
        id: 'assorted-cupcakes',
        name: 'Assorted Cupcakes (4)',
        description: 'Four classic cupcakes with rich cream cheese frosting.',
        price: 12.00,
        imageId: 'red-velvet-cupcakes',
        variants: [
            { id: 'chocolate-chip', name: 'Chocolate Chip' },
            { id: 'vanilla', name: 'Vanilla Bean' },
            { id: 'red-velvet', name: 'Red Velvet' },
            { id: 'strawberry-swirl', name: 'Strawberry Swirl' }
        ]
    },
    {
        id: 'ice-cream-sundae',
        name: 'Classic Ice Cream Sundae',
        description: 'Two scoops of vanilla ice cream with hot fudge, whipped cream, and a cherry.',
        price: 8.50,
        imageId: 'ice-cream-sundae'
    },
    {
        id: 'classic-cheesecake',
        name: 'Classic Cheesecake 3 slices',
        description: '3 slices of rich and creamy New York-style cheesecake with a graham cracker crust. Made with pure homemade ingredients.',
        price: 7.50,
        imageId: 'classic-cheesecake',
        featured: true
    },
    {
        id: 'lemon-meringue-pie',
        name: 'Lemon Meringue Pie Slice',
        description: 'A slice of tangy lemon filling topped with fluffy toasted meringue giving an amazing taste.',
        price: 4.00,
        imageId: 'lemon-meringue-pie'
    }
];
