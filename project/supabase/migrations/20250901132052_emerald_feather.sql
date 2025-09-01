-- Create database
CREATE DATABASE IF NOT EXISTS foodbridge_db;
USE foodbridge_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(120) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create recipes table
CREATE TABLE IF NOT EXISTS recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    ingredients JSON NOT NULL,
    instructions JSON NOT NULL,
    cooking_time INT NOT NULL,
    difficulty ENUM('Easy', 'Medium', 'Hard') NOT NULL,
    servings INT NOT NULL,
    category VARCHAR(50) NOT NULL,
    nutrition_score INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    cost ENUM('Low', 'Medium', 'High') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user_favorites table
CREATE TABLE IF NOT EXISTS user_favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_recipe (user_id, recipe_id)
);

-- Create user_ingredients table
CREATE TABLE IF NOT EXISTS user_ingredients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    ingredient_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_recipes_category ON recipes(category);
CREATE INDEX idx_recipes_difficulty ON recipes(difficulty);
CREATE INDEX idx_recipes_cost ON recipes(cost);
CREATE INDEX idx_user_favorites_user_id ON user_favorites(user_id);
CREATE INDEX idx_user_ingredients_user_id ON user_ingredients(user_id);