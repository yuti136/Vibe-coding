import React, { useState } from 'react';
import { Header } from './components/Header';
import { FilterPanel } from './components/FilterPanel';
import { RecipeCard } from './components/RecipeCard';
import { RecipeModal } from './components/RecipeModal';
import { AuthModal } from './components/AuthModal';
import { RecommendationSection } from './components/RecommendationSection';
import { AIInsights } from './components/AIInsights';
import { StatsSection } from './components/StatsSection';
import { useAuth } from './hooks/useAuth';
import { useRecipes } from './hooks/useRecipes';
import { Recipe } from './types';

function App() {
  const { user, isAuthenticated, login, register, logout, updateUser } = useAuth();
  const { recipes, filters, updateFilters, getRecommendations } = useRecipes();
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [recommendations, setRecommendations] = useState<Recipe[]>([]);

  // Load recommendations when ingredients change
  useEffect(() => {
    const loadRecommendations = async () => {
      const ingredients = user 
        ? [...filters.ingredients, ...user.availableIngredients]
        : filters.ingredients;
      
      if (ingredients.length > 0) {
        const recs = await getRecommendations(ingredients);
        setRecommendations(recs);
      } else {
        setRecommendations([]);
      }
    };

    loadRecommendations();
  }, [filters.ingredients, user?.availableIngredients, getRecommendations]);

  const handleToggleFavorite = async (recipeId: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    try {
      const response = await apiService.toggleFavorite(recipeId);
      updateUser({ ...user, favoriteRecipes: response.favorites.map(String) });
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsRecipeModalOpen(true);
  };

  const heroSection = (
    <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Fighting Hunger with
            <span className="block text-yellow-300">Smart Recipes</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
            Transform simple ingredients into nutritious meals. Our AI-powered platform helps you create
            delicious, affordable recipes while reducing food waste.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => !isAuthenticated && setIsAuthModalOpen(true)}
              className="bg-yellow-400 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
            >
              {isAuthenticated ? 'Welcome Back!' : 'Get Started Free'}
            </button>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              Browse Recipes
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        user={user}
        isAuthenticated={isAuthenticated}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onLogout={logout}
      />

      {heroSection}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <StatsSection />
        
        <AIInsights userIngredients={filters.ingredients} />

        <div className="flex gap-8">
          <FilterPanel
            filters={filters}
            onUpdateFilters={updateFilters}
            isOpen={isFilterOpen}
            onToggle={() => setIsFilterOpen(!isFilterOpen)}
          />

          <div className="flex-1">
            <RecommendationSection
              recommendations={recommendations}
              userIngredients={filters.ingredients}
              onToggleFavorite={handleToggleFavorite}
              favoriteRecipes={user?.favoriteRecipes || []}
              onRecipeClick={handleRecipeClick}
            />

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">All Recipes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map(recipe => (
                  <div key={recipe.id} onClick={() => handleRecipeClick(recipe)} className="cursor-pointer">
                    <RecipeCard
                      recipe={recipe}
                      isFavorite={user?.favoriteRecipes.includes(recipe.id) || false}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  </div>
                ))}
              </div>
            </div>

            {recipes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No recipes match your current filters. Try adjusting your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={login}
        onRegister={register}
      />

      <RecipeModal
        recipe={selectedRecipe}
        isOpen={isRecipeModalOpen}
        onClose={() => setIsRecipeModalOpen(false)}
      />

      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Join the Fight Against Hunger</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Every recipe shared, every meal planned, and every ingredient saved brings us closer to a world without hunger.
            Together, we can make sustainable nutrition accessible to everyone.
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <span>© 2025 FoodBridge</span>
            <span>Supporting SDG 2: Zero Hunger</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;