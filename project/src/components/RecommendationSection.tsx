import React from 'react';
import { Lightbulb, Sparkles } from 'lucide-react';
import { Recipe } from '../types';
import { RecipeCard } from './RecipeCard';

interface RecommendationSectionProps {
  recommendations: Recipe[];
  userIngredients: string[];
  onToggleFavorite?: (recipeId: string) => void;
  favoriteRecipes?: string[];
  onRecipeClick: (recipe: Recipe) => void;
}

export const RecommendationSection: React.FC<RecommendationSectionProps> = ({
  recommendations,
  userIngredients,
  onToggleFavorite,
  favoriteRecipes = [],
  onRecipeClick
}) => {
  if (userIngredients.length === 0) {
    return (
      <div className="text-center py-12">
        <Lightbulb className="mx-auto mb-4 text-gray-400" size={48} />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          Get Personalized Recommendations
        </h3>
        <p className="text-gray-500">
          Add your available ingredients using the filter panel to see recipe suggestions
        </p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-2 mb-6">
        <Sparkles className="text-green-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">
          Recommended for You
        </h2>
      </div>
      
      <p className="text-gray-600 mb-6">
        Based on your available ingredients: {userIngredients.join(', ')}
      </p>

      {recommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map(recipe => (
            <div key={recipe.id} onClick={() => onRecipeClick(recipe)} className="cursor-pointer">
              <RecipeCard
                recipe={recipe}
                isFavorite={favoriteRecipes.includes(recipe.id)}
                onToggleFavorite={onToggleFavorite}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No recipes found with your current ingredients. Try adding more ingredients or adjust your filters.
          </p>
        </div>
      )}
    </div>
  );
};