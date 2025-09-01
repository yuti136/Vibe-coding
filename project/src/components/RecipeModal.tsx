import React from 'react';
import { X, Clock, Users, Star, ChefHat } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  isOpen,
  onClose
}) => {
  if (!isOpen || !recipe) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">{recipe.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-64 object-cover rounded-xl mb-6"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Clock className="mx-auto mb-1 text-green-600" size={20} />
              <p className="text-sm font-medium">{recipe.cookingTime} min</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Users className="mx-auto mb-1 text-green-600" size={20} />
              <p className="text-sm font-medium">{recipe.servings} servings</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Star className="mx-auto mb-1 text-green-600" size={20} />
              <p className="text-sm font-medium">{recipe.nutritionScore}/100</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <ChefHat className="mx-auto mb-1 text-green-600" size={20} />
              <p className="text-sm font-medium">{recipe.difficulty}</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">{recipe.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Ingredients</h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Instructions</h3>
            <ol className="space-y-3">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white text-sm font-medium rounded-full flex items-center justify-center">
                    {index + 1}
                  </span>
                  <p className="text-gray-700 leading-relaxed">{instruction}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};