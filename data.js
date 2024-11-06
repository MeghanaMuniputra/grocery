// Product and Recipe Database
export const products = {
    fruits: [
        { id: 1, name: 'Apple', price: 180, category: 'fruits', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6', unit: 'kg' },
        { id: 2, name: 'Banana', price: 60, category: 'fruits', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e', unit: 'dozen' },
        { id: 3, name: 'Orange', price: 120, category: 'fruits', image: 'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b', unit: 'kg' },
        { id: 4, name: 'Strawberries', price: 200, category: 'fruits', image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6', unit: 'pack' },
        { id: 5, name: 'Blueberries', price: 250, category: 'fruits', image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e', unit: 'pack' },
        { id: 6, name: 'Cherries', price: 300, category: 'fruits', image: 'https://images.unsplash.com/photo-1528821128474-27f963b062bf', unit: 'kg' }
    ],
    vegetables: [
        { id: 7, name: 'Tomato', price: 40, category: 'vegetables', image: 'https://images.unsplash.com/photo-1546470427-f5b6c2f9c9ab', unit: 'kg' },
        { id: 8, name: 'Potato', price: 30, category: 'vegetables', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655', unit: 'kg' },
        { id: 9, name: 'Onion', price: 35, category: 'vegetables', image: 'https://images.unsplash.com/photo-1618512496248-a01f54a0559b', unit: 'kg' },
        { id: 10, name: 'Carrots', price: 45, category: 'vegetables', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37', unit: 'kg' },
        { id: 11, name: 'Bell Peppers', price: 80, category: 'vegetables', image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83', unit: 'kg' }
    ],
    meat: [
        { id: 12, name: 'Chicken Breast', price: 280, category: 'meat', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791', unit: 'kg' },
        { id: 13, name: 'Chicken Thigh', price: 260, category: 'meat', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791', unit: 'kg' },
        { id: 14, name: 'Chicken Wings', price: 220, category: 'meat', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791', unit: 'kg' }
    ],
    baking: [
        { id: 15, name: 'All-Purpose Flour', price: 45, category: 'baking', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b', unit: 'kg' },
        { id: 16, name: 'Sugar', price: 50, category: 'baking', image: 'https://images.unsplash.com/photo-1536304447766-da0ed4ce1b73', unit: 'kg' },
        { id: 17, name: 'Butter', price: 120, category: 'baking', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d', unit: '500g' },
        { id: 18, name: 'Eggs', price: 80, category: 'baking', image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f', unit: 'dozen' },
        { id: 19, name: 'Cocoa Powder', price: 150, category: 'baking', image: 'https://images.unsplash.com/photo-1578145288677-6e6842916b10', unit: '250g' },
        { id: 20, name: 'Vanilla Extract', price: 180, category: 'baking', image: 'https://images.unsplash.com/photo-1599021456807-2adafe0d2427', unit: '100ml' }
    ]
};

export const recipes = [
    {
        id: 1,
        name: 'Chicken Curry',
        image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398',
        ingredients: [
            { id: 12, quantity: 0.5 },
            { id: 8, quantity: 0.25 },
            { id: 9, quantity: 0.2 },
            { id: 7, quantity: 0.3 }
        ],
        instructions: 'Cook chicken with spices and vegetables for a delicious curry.'
    },
    {
        id: 2,
        name: 'Fruit Salad',
        image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea',
        ingredients: [
            { id: 1, quantity: 0.25 },
            { id: 2, quantity: 0.5 },
            { id: 3, quantity: 0.25 },
            { id: 4, quantity: 1 }
        ],
        instructions: 'Mix fresh fruits together for a healthy dessert.'
    },
    {
        id: 3,
        name: 'Chocolate Cake',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
        ingredients: [
            { id: 15, quantity: 0.5 },
            { id: 16, quantity: 0.3 },
            { id: 17, quantity: 1 },
            { id: 18, quantity: 1 },
            { id: 19, quantity: 2 },
            { id: 20, quantity: 1 }
        ],
        instructions: 'Mix dry ingredients, then wet ingredients. Bake at 180°C for 30 minutes.'
    }
];