export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  servings: number;
  category: string;
  nutritionScore: number;
  imageUrl: string;
  cost: 'Low' | 'Medium' | 'High';
}

export interface User {
  id: string;
  email: string;
  name: string;
  favoriteRecipes: string[];
  dietaryPreferences: string[];
  availableIngredients: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface FilterOptions {
  ingredients: string[];
  category: string;
  difficulty: string;
  maxCookingTime: number;
  cost: string;
}