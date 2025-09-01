import { useState, useEffect } from 'react';
import { Recipe, FilterOptions } from '../types';
import { apiService } from '../services/api';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    ingredients: [],
    category: '',
    difficulty: '',
    maxCookingTime: 60,
    cost: ''
  });

  // Load recipes from API
  useEffect(() => {
    const loadRecipes = async () => {
      try {
        setLoading(true);
        const recipesData = await apiService.getRecipes();
        setRecipes(recipesData);
        setFilteredRecipes(recipesData);
      } catch (error) {
        console.error('Failed to load recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  const applyFilters = () => {
    let filtered = recipes;

    if (filters.ingredients.length > 0) {
      filtered = filtered.filter(recipe =>
        filters.ingredients.some(ingredient =>
          recipe.ingredients.some(recipeIngredient =>
            recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())
          )
        )
      );
    }

    if (filters.category) {
      filtered = filtered.filter(recipe => recipe.category === filters.category);
    }

    if (filters.difficulty) {
      filtered = filtered.filter(recipe => recipe.difficulty === filters.difficulty);
    }

    if (filters.maxCookingTime < 60) {
      filtered = filtered.filter(recipe => recipe.cookingTime <= filters.maxCookingTime);
    }

    if (filters.cost) {
      filtered = filtered.filter(recipe => recipe.cost === filters.cost);
    }

    setFilteredRecipes(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, recipes]);

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const getRecommendations = async (availableIngredients: string[]): Promise<Recipe[]> => {
    try {
      if (availableIngredients.length === 0) return [];
      return await apiService.getRecommendations(availableIngredients);
    } catch (error) {
      console.error('Failed to get recommendations:', error);
      return [];
    }
  };

  return {
    recipes: filteredRecipes,
    loading,
    filters,
    updateFilters,
    getRecommendations
  };
};