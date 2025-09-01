import React, { useState } from 'react';
import { Brain, TrendingUp, Utensils, DollarSign } from 'lucide-react';

interface AIInsightsProps {
  userIngredients: string[];
}

export const AIInsights: React.FC<AIInsightsProps> = ({ userIngredients }) => {
  const [insights, setInsights] = useState<string[]>([]);

  // Simulated AI insights based on ingredients
  const generateInsights = () => {
    const tips = [];
    
    if (userIngredients.includes('Rice')) {
      tips.push('Rice is a great base for budget-friendly meals. Try pairing with legumes for complete protein.');
    }
    
    if (userIngredients.includes('Beans')) {
      tips.push('Beans are packed with fiber and protein. They can reduce food costs by up to 40% compared to meat.');
    }
    
    if (userIngredients.includes('Eggs')) {
      tips.push('Eggs are one of the most versatile and affordable protein sources. Perfect for any meal of the day.');
    }
    
    if (userIngredients.length >= 4) {
      tips.push('You have enough ingredients for multiple nutritious meals! Consider meal prepping to reduce food waste.');
    }

    if (tips.length === 0) {
      tips.push('Add your available ingredients to get personalized cooking tips and cost-saving suggestions!');
    }

    setInsights(tips);
  };

  React.useEffect(() => {
    generateInsights();
  }, [userIngredients]);

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 mb-8">
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="text-purple-600" size={24} />
        <h3 className="text-xl font-semibold text-gray-800">AI-Powered Insights</h3>
      </div>

      <div className="grid gap-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 border-l-4 border-purple-400 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {index % 3 === 0 && <TrendingUp className="text-green-500" size={16} />}
                {index % 3 === 1 && <Utensils className="text-blue-500" size={16} />}
                {index % 3 === 2 && <DollarSign className="text-yellow-500" size={16} />}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{insight}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          💡 Powered by AI to help reduce food waste and optimize nutrition
        </p>
      </div>
    </div>
  );
};