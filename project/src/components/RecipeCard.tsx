import React from 'react';
import { Clock, Users, Star, DollarSign, Heart } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite?: boolean;
  onToggleFavorite?: (recipeId: string) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  isFavorite = false,
  onToggleFavorite
}) => {
  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCostColor(recipe.cost)}`}>
            {recipe.cost} Cost
          </span>
          {onToggleFavorite && (
            <button
              onClick={() => onToggleFavorite(recipe.id)}
              className={`p-2 rounded-full transition-colors ${
                isFavorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white bg-opacity-90 text-gray-600 hover:text-red-500'
              }`}
            >
              <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          )}
        </div>
        <div className="absolute bottom-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
            {recipe.difficulty}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">
            {recipe.title}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="text-yellow-400" size={16} fill="currentColor" />
            <span className="text-sm font-medium text-gray-600">
              {(recipe.nutritionScore / 20).toFixed(1)}
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {recipe.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Clock size={16} />
            <span>{recipe.cookingTime} min</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users size={16} />
            <span>{recipe.servings} servings</span>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Ingredients:</h4>
          <div className="flex flex-wrap gap-1">
            {recipe.ingredients.slice(0, 4).map((ingredient, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs"
              >
                {ingredient}
              </span>
            ))}
            {recipe.ingredients.length > 4 && (
              <span className="text-xs text-gray-500">
                +{recipe.ingredients.length - 4} more
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-green-600 font-medium">
            Nutrition Score: {recipe.nutritionScore}/100
          </span>
          <span className="text-xs text-gray-500">
            {recipe.category}
          </span>
        </div>
      </div>
    </div>
  );
};