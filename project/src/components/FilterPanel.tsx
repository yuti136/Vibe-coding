import React from 'react';
import { Filter, X } from 'lucide-react';
import { FilterOptions } from '../types';

interface FilterPanelProps {
  filters: FilterOptions;
  onUpdateFilters: (filters: Partial<FilterOptions>) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onUpdateFilters,
  isOpen,
  onToggle
}) => {
  const categories = ['Main Course', 'Breakfast', 'Soup', 'Salad', 'Snack'];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const costs = ['Low', 'Medium', 'High'];
  const commonIngredients = ['Rice', 'Beans', 'Onion', 'Garlic', 'Tomatoes', 'Eggs', 'Milk', 'Oil'];

  const addIngredient = (ingredient: string) => {
    if (!filters.ingredients.includes(ingredient)) {
      onUpdateFilters({
        ingredients: [...filters.ingredients, ingredient]
      });
    }
  };

  const removeIngredient = (ingredient: string) => {
    onUpdateFilters({
      ingredients: filters.ingredients.filter(i => i !== ingredient)
    });
  };

  return (
    <>
      <button
        onClick={onToggle}
        className="lg:hidden fixed bottom-6 right-6 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors z-30"
      >
        <Filter size={24} />
      </button>

      <div className={`
        fixed lg:relative inset-y-0 left-0 z-40 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:shadow-none lg:w-72
      `}>
        <div className="h-full overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Filters</h3>
            <button
              onClick={onToggle}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Ingredients
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {filters.ingredients.map(ingredient => (
                  <span
                    key={ingredient}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                  >
                    <span>{ingredient}</span>
                    <button
                      onClick={() => removeIngredient(ingredient)}
                      className="hover:text-green-600"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {commonIngredients.map(ingredient => (
                  <button
                    key={ingredient}
                    onClick={() => addIngredient(ingredient)}
                    disabled={filters.ingredients.includes(ingredient)}
                    className="text-left px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-500 transition-colors"
                  >
                    {ingredient}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => onUpdateFilters({ category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty
              </label>
              <select
                value={filters.difficulty}
                onChange={(e) => onUpdateFilters({ difficulty: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Difficulties</option>
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Cooking Time: {filters.maxCookingTime} min
              </label>
              <input
                type="range"
                min="10"
                max="60"
                value={filters.maxCookingTime}
                onChange={(e) => onUpdateFilters({ maxCookingTime: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cost Level
              </label>
              <select
                value={filters.cost}
                onChange={(e) => onUpdateFilters({ cost: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Cost Levels</option>
                {costs.map(cost => (
                  <option key={cost} value={cost}>{cost}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-25 z-30"
          onClick={onToggle}
        />
      )}
    </>
  );
};