import { Recipe } from '../types';

export const sampleRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Simple Rice and Beans',
    description: 'A nutritious, protein-rich meal using affordable staple ingredients',
    ingredients: ['Rice', 'Black beans', 'Onion', 'Garlic', 'Salt', 'Oil'],
    instructions: [
      'Rinse rice and beans separately',
      'Cook rice according to package instructions',
      'Sauté onion and garlic in oil',
      'Add beans and simmer for 10 minutes',
      'Season with salt and serve over rice'
    ],
    cookingTime: 25,
    difficulty: 'Easy',
    servings: 4,
    category: 'Main Course',
    nutritionScore: 85,
    imageUrl: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg',
    cost: 'Low'
  },
  {
    id: '2',
    title: 'Vegetable Stir-Fry',
    description: 'Quick and healthy meal using seasonal vegetables',
    ingredients: ['Mixed vegetables', 'Soy sauce', 'Garlic', 'Ginger', 'Oil'],
    instructions: [
      'Heat oil in a large pan',
      'Add garlic and ginger, stir for 30 seconds',
      'Add vegetables and stir-fry for 5-7 minutes',
      'Add soy sauce and toss until coated',
      'Serve immediately'
    ],
    cookingTime: 15,
    difficulty: 'Easy',
    servings: 2,
    category: 'Main Course',
    nutritionScore: 90,
    imageUrl: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
    cost: 'Low'
  },
  {
    id: '3',
    title: 'Lentil Soup',
    description: 'Hearty, protein-packed soup perfect for families',
    ingredients: ['Red lentils', 'Onion', 'Carrots', 'Celery', 'Vegetable broth', 'Tomatoes', 'Cumin'],
    instructions: [
      'Sauté onion, carrots, and celery until soft',
      'Add lentils, broth, and tomatoes',
      'Bring to boil, then simmer for 20 minutes',
      'Season with cumin and salt',
      'Blend partially for thicker consistency'
    ],
    cookingTime: 35,
    difficulty: 'Easy',
    servings: 6,
    category: 'Soup',
    nutritionScore: 88,
    imageUrl: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg',
    cost: 'Low'
  },
  {
    id: '4',
    title: 'Banana Oat Pancakes',
    description: 'Nutritious breakfast using simple ingredients',
    ingredients: ['Bananas', 'Oats', 'Eggs', 'Milk', 'Honey', 'Cinnamon'],
    instructions: [
      'Mash bananas in a bowl',
      'Mix in oats, eggs, and milk',
      'Add honey and cinnamon',
      'Cook small pancakes in a non-stick pan',
      'Serve warm with fresh fruit'
    ],
    cookingTime: 20,
    difficulty: 'Easy',
    servings: 3,
    category: 'Breakfast',
    nutritionScore: 82,
    imageUrl: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg',
    cost: 'Low'
  },
  {
    id: '5',
    title: 'Sweet Potato Curry',
    description: 'Filling curry rich in vitamins and minerals',
    ingredients: ['Sweet potatoes', 'Coconut milk', 'Onion', 'Garlic', 'Curry powder', 'Spinach'],
    instructions: [
      'Cube sweet potatoes and set aside',
      'Sauté onion and garlic until fragrant',
      'Add curry powder and cook for 1 minute',
      'Add sweet potatoes and coconut milk',
      'Simmer until potatoes are tender, add spinach at the end'
    ],
    cookingTime: 30,
    difficulty: 'Medium',
    servings: 4,
    category: 'Main Course',
    nutritionScore: 92,
    imageUrl: 'https://images.pexels.com/photos/2232433/pexels-photo-2232433.jpeg',
    cost: 'Medium'
  },
  {
    id: '6',
    title: 'Chickpea Salad',
    description: 'Fresh, protein-rich salad perfect for hot weather',
    ingredients: ['Chickpeas', 'Cucumber', 'Tomatoes', 'Red onion', 'Olive oil', 'Lemon juice', 'Herbs'],
    instructions: [
      'Drain and rinse chickpeas',
      'Dice cucumber, tomatoes, and red onion',
      'Combine vegetables and chickpeas in a bowl',
      'Whisk olive oil and lemon juice',
      'Toss with dressing and fresh herbs'
    ],
    cookingTime: 10,
    difficulty: 'Easy',
    servings: 3,
    category: 'Salad',
    nutritionScore: 85,
    imageUrl: 'https://images.pexels.com/photos/1833336/pexels-photo-1833336.jpeg',
    cost: 'Low'
  }
];