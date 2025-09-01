import React from 'react';
import { TrendingDown, Leaf, Heart, Users } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: <TrendingDown className="text-green-600" size={24} />,
      title: 'Food Waste Reduced',
      value: '2.3M lbs',
      description: 'Through smart recipe matching'
    },
    {
      icon: <Leaf className="text-blue-600" size={24} />,
      title: 'Sustainable Meals',
      value: '150K+',
      description: 'Created by our community'
    },
    {
      icon: <Heart className="text-red-500" size={24} />,
      title: 'Nutrition Score',
      value: '87/100',
      description: 'Average across all recipes'
    },
    {
      icon: <Users className="text-purple-600" size={24} />,
      title: 'Active Users',
      value: '45K+',
      description: 'Fighting hunger together'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Impact Dashboard</h2>
        <p className="text-gray-600">See how our community is making a difference</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="text-center p-4 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <div className="flex justify-center mb-3">
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {stat.value}
            </div>
            <div className="text-sm font-medium text-gray-700 mb-1">
              {stat.title}
            </div>
            <div className="text-xs text-gray-500">
              {stat.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};