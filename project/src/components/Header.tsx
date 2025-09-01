import React from 'react';
import { ChefHat, User, LogOut } from 'lucide-react';
import { User as UserType } from '../types';

interface HeaderProps {
  user: UserType | null;
  isAuthenticated: boolean;
  onAuthClick: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  isAuthenticated,
  onAuthClick,
  onLogout
}) => {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-green-600 p-2 rounded-lg">
              <ChefHat className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">FoodBridge</h1>
              <p className="text-xs text-gray-600">Fighting hunger through smart recipes</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">Welcome, {user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
                >
                  <LogOut size={16} />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <User size={16} />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};