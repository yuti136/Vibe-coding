from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key-change-this')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'mysql+pymysql://root:password@localhost/foodbridge_db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret-change-this')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

# Initialize extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)
CORS(app)

# Models
class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    favorite_recipes = db.relationship('UserFavorite', backref='user', lazy=True, cascade='all, delete-orphan')
    available_ingredients = db.relationship('UserIngredient', backref='user', lazy=True, cascade='all, delete-orphan')

class Recipe(db.Model):
    __tablename__ = 'recipes'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    ingredients = db.Column(db.JSON, nullable=False)
    instructions = db.Column(db.JSON, nullable=False)
    cooking_time = db.Column(db.Integer, nullable=False)
    difficulty = db.Column(db.Enum('Easy', 'Medium', 'Hard'), nullable=False)
    servings = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    nutrition_score = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String(500), nullable=False)
    cost = db.Column(db.Enum('Low', 'Medium', 'High'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class UserFavorite(db.Model):
    __tablename__ = 'user_favorites'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class UserIngredient(db.Model):
    __tablename__ = 'user_ingredients'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    ingredient_name = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Routes
@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        name = data.get('name')
        
        if not email or not password or not name:
            return jsonify({'error': 'All fields are required'}), 400
        
        # Check if user exists
        if User.query.filter_by(email=email).first():
            return jsonify({'error': 'User already exists'}), 400
        
        # Create new user
        password_hash = generate_password_hash(password)
        user = User(email=email, name=name, password_hash=password_hash)
        
        db.session.add(user)
        db.session.commit()
        
        # Create access token
        access_token = create_access_token(identity=user.id)
        
        return jsonify({
            'access_token': access_token,
            'user': {
                'id': user.id,
                'email': user.email,
                'name': user.name,
                'favoriteRecipes': [],
                'availableIngredients': []
            }
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400
        
        user = User.query.filter_by(email=email).first()
        
        if not user or not check_password_hash(user.password_hash, password):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Get user's favorites and ingredients
        favorites = [fav.recipe_id for fav in user.favorite_recipes]
        ingredients = [ing.ingredient_name for ing in user.available_ingredients]
        
        access_token = create_access_token(identity=user.id)
        
        return jsonify({
            'access_token': access_token,
            'user': {
                'id': user.id,
                'email': user.email,
                'name': user.name,
                'favoriteRecipes': favorites,
                'availableIngredients': ingredients
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/recipes', methods=['GET'])
def get_recipes():
    try:
        recipes = Recipe.query.all()
        recipes_data = []
        
        for recipe in recipes:
            recipes_data.append({
                'id': str(recipe.id),
                'title': recipe.title,
                'description': recipe.description,
                'ingredients': recipe.ingredients,
                'instructions': recipe.instructions,
                'cookingTime': recipe.cooking_time,
                'difficulty': recipe.difficulty,
                'servings': recipe.servings,
                'category': recipe.category,
                'nutritionScore': recipe.nutrition_score,
                'imageUrl': recipe.image_url,
                'cost': recipe.cost
            })
        
        return jsonify(recipes_data), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/user/favorites', methods=['POST'])
@jwt_required()
def toggle_favorite():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        recipe_id = data.get('recipe_id')
        
        if not recipe_id:
            return jsonify({'error': 'Recipe ID is required'}), 400
        
        # Check if already favorited
        existing = UserFavorite.query.filter_by(user_id=user_id, recipe_id=recipe_id).first()
        
        if existing:
            # Remove from favorites
            db.session.delete(existing)
            action = 'removed'
        else:
            # Add to favorites
            favorite = UserFavorite(user_id=user_id, recipe_id=recipe_id)
            db.session.add(favorite)
            action = 'added'
        
        db.session.commit()
        
        # Get updated favorites list
        favorites = [fav.recipe_id for fav in UserFavorite.query.filter_by(user_id=user_id).all()]
        
        return jsonify({
            'message': f'Recipe {action} to favorites',
            'favorites': favorites
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/user/ingredients', methods=['POST'])
@jwt_required()
def update_ingredients():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        ingredients = data.get('ingredients', [])
        
        # Remove existing ingredients
        UserIngredient.query.filter_by(user_id=user_id).delete()
        
        # Add new ingredients
        for ingredient in ingredients:
            user_ingredient = UserIngredient(user_id=user_id, ingredient_name=ingredient)
            db.session.add(user_ingredient)
        
        db.session.commit()
        
        return jsonify({
            'message': 'Ingredients updated successfully',
            'ingredients': ingredients
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/recommendations', methods=['POST'])
def get_recommendations():
    try:
        data = request.get_json()
        ingredients = data.get('ingredients', [])
        
        if not ingredients:
            return jsonify([]), 200
        
        # Simple recommendation algorithm
        recipes = Recipe.query.all()
        recommendations = []
        
        for recipe in recipes:
            match_score = 0
            for ingredient in ingredients:
                for recipe_ingredient in recipe.ingredients:
                    if ingredient.lower() in recipe_ingredient.lower():
                        match_score += 1
                        break
            
            if match_score > 0:
                recommendations.append({
                    'recipe': {
                        'id': str(recipe.id),
                        'title': recipe.title,
                        'description': recipe.description,
                        'ingredients': recipe.ingredients,
                        'instructions': recipe.instructions,
                        'cookingTime': recipe.cooking_time,
                        'difficulty': recipe.difficulty,
                        'servings': recipe.servings,
                        'category': recipe.category,
                        'nutritionScore': recipe.nutrition_score,
                        'imageUrl': recipe.image_url,
                        'cost': recipe.cost
                    },
                    'matchScore': match_score
                })
        
        # Sort by match score and return top 6
        recommendations.sort(key=lambda x: x['matchScore'], reverse=True)
        top_recommendations = [rec['recipe'] for rec in recommendations[:6]]
        
        return jsonify(top_recommendations), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Initialize database and sample data
def init_db():
    with app.app_context():
        db.create_all()
        
        # Add sample recipes if none exist
        if Recipe.query.count() == 0:
            sample_recipes = [
                {
                    'title': 'Simple Rice and Beans',
                    'description': 'A nutritious, protein-rich meal using affordable staple ingredients',
                    'ingredients': ['Rice', 'Black beans', 'Onion', 'Garlic', 'Salt', 'Oil'],
                    'instructions': [
                        'Rinse rice and beans separately',
                        'Cook rice according to package instructions',
                        'Sauté onion and garlic in oil',
                        'Add beans and simmer for 10 minutes',
                        'Season with salt and serve over rice'
                    ],
                    'cooking_time': 25,
                    'difficulty': 'Easy',
                    'servings': 4,
                    'category': 'Main Course',
                    'nutrition_score': 85,
                    'image_url': 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg',
                    'cost': 'Low'
                },
                {
                    'title': 'Vegetable Stir-Fry',
                    'description': 'Quick and healthy meal using seasonal vegetables',
                    'ingredients': ['Mixed vegetables', 'Soy sauce', 'Garlic', 'Ginger', 'Oil'],
                    'instructions': [
                        'Heat oil in a large pan',
                        'Add garlic and ginger, stir for 30 seconds',
                        'Add vegetables and stir-fry for 5-7 minutes',
                        'Add soy sauce and toss until coated',
                        'Serve immediately'
                    ],
                    'cooking_time': 15,
                    'difficulty': 'Easy',
                    'servings': 2,
                    'category': 'Main Course',
                    'nutrition_score': 90,
                    'image_url': 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
                    'cost': 'Low'
                },
                {
                    'title': 'Lentil Soup',
                    'description': 'Hearty, protein-packed soup perfect for families',
                    'ingredients': ['Red lentils', 'Onion', 'Carrots', 'Celery', 'Vegetable broth', 'Tomatoes', 'Cumin'],
                    'instructions': [
                        'Sauté onion, carrots, and celery until soft',
                        'Add lentils, broth, and tomatoes',
                        'Bring to boil, then simmer for 20 minutes',
                        'Season with cumin and salt',
                        'Blend partially for thicker consistency'
                    ],
                    'cooking_time': 35,
                    'difficulty': 'Easy',
                    'servings': 6,
                    'category': 'Soup',
                    'nutrition_score': 88,
                    'image_url': 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg',
                    'cost': 'Low'
                },
                {
                    'title': 'Banana Oat Pancakes',
                    'description': 'Nutritious breakfast using simple ingredients',
                    'ingredients': ['Bananas', 'Oats', 'Eggs', 'Milk', 'Honey', 'Cinnamon'],
                    'instructions': [
                        'Mash bananas in a bowl',
                        'Mix in oats, eggs, and milk',
                        'Add honey and cinnamon',
                        'Cook small pancakes in a non-stick pan',
                        'Serve warm with fresh fruit'
                    ],
                    'cooking_time': 20,
                    'difficulty': 'Easy',
                    'servings': 3,
                    'category': 'Breakfast',
                    'nutrition_score': 82,
                    'image_url': 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg',
                    'cost': 'Low'
                },
                {
                    'title': 'Sweet Potato Curry',
                    'description': 'Filling curry rich in vitamins and minerals',
                    'ingredients': ['Sweet potatoes', 'Coconut milk', 'Onion', 'Garlic', 'Curry powder', 'Spinach'],
                    'instructions': [
                        'Cube sweet potatoes and set aside',
                        'Sauté onion and garlic until fragrant',
                        'Add curry powder and cook for 1 minute',
                        'Add sweet potatoes and coconut milk',
                        'Simmer until potatoes are tender, add spinach at the end'
                    ],
                    'cooking_time': 30,
                    'difficulty': 'Medium',
                    'servings': 4,
                    'category': 'Main Course',
                    'nutrition_score': 92,
                    'image_url': 'https://images.pexels.com/photos/2232433/pexels-photo-2232433.jpeg',
                    'cost': 'Medium'
                },
                {
                    'title': 'Chickpea Salad',
                    'description': 'Fresh, protein-rich salad perfect for hot weather',
                    'ingredients': ['Chickpeas', 'Cucumber', 'Tomatoes', 'Red onion', 'Olive oil', 'Lemon juice', 'Herbs'],
                    'instructions': [
                        'Drain and rinse chickpeas',
                        'Dice cucumber, tomatoes, and red onion',
                        'Combine vegetables and chickpeas in a bowl',
                        'Whisk olive oil and lemon juice',
                        'Toss with dressing and fresh herbs'
                    ],
                    'cooking_time': 10,
                    'difficulty': 'Easy',
                    'servings': 3,
                    'category': 'Salad',
                    'nutrition_score': 85,
                    'image_url': 'https://images.pexels.com/photos/1833336/pexels-photo-1833336.jpeg',
                    'cost': 'Low'
                }
            ]
            
            for recipe_data in sample_recipes:
                recipe = Recipe(**recipe_data)
                db.session.add(recipe)
            
            db.session.commit()
            print("Sample recipes added to database")

if __name__ == '__main__':
    init_db()
    app.run(debug=True, host='0.0.0.0', port=5000)