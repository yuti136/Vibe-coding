# FoodBridge - Zero Hunger Recipe Recommendation App

A full-stack web application that helps fight hunger by providing smart recipe recommendations based on available ingredients.

## Features

- **Smart Recipe Recommendations**: AI-powered suggestions based on your available ingredients
- **User Authentication**: Secure registration and login system
- **Recipe Management**: Browse, filter, and favorite recipes
- **Nutrition Tracking**: Nutrition scores for all recipes
- **Cost-Effective Meals**: Focus on affordable, nutritious recipes
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Vite for development and building

### Backend
- Python Flask REST API
- MySQL database
- JWT authentication
- Flask-SQLAlchemy ORM
- Flask-CORS for cross-origin requests

## Prerequisites

Before running this application, make sure you have:

1. **Python 3.8+** installed
2. **MySQL** server running
3. **Node.js 16+** and npm installed

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd foodbridge-app
```

### 2. Backend Setup

#### Install Python Dependencies
```bash
pip install -r requirements.txt
```

#### Database Setup
1. Start your MySQL server
2. Create the database:
```bash
mysql -u root -p < database_setup.sql
```

#### Environment Configuration
1. Copy the `.env` file and update the values:
```bash
# Update these values in .env file
DATABASE_URL=mysql+pymysql://your_username:your_password@localhost/foodbridge_db
SECRET_KEY=your-super-secret-key
JWT_SECRET_KEY=your-jwt-secret-key
```

#### Run the Flask Backend
```bash
python app.py
```
The backend will run on `http://localhost:5000`

### 3. Frontend Setup

#### Install Node Dependencies
```bash
npm install
```

#### Run the React Frontend
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`

## Usage

1. **Start the Backend**: Run `python app.py` in the root directory
2. **Start the Frontend**: Run `npm run dev` in a new terminal
3. **Open your browser**: Navigate to `http://localhost:5173`
4. **Register/Login**: Create an account or sign in
5. **Add Ingredients**: Use the filter panel to add your available ingredients
6. **Get Recommendations**: See personalized recipe suggestions
7. **Browse Recipes**: Explore all available recipes with filtering options
8. **Save Favorites**: Mark recipes as favorites for easy access

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Login user

### Recipes
- `GET /api/recipes` - Get all recipes
- `POST /api/recommendations` - Get recipe recommendations

### User Management
- `POST /api/user/favorites` - Toggle recipe favorite
- `POST /api/user/ingredients` - Update user ingredients

## Database Schema

### Tables
- **users**: User accounts and profiles
- **recipes**: Recipe data with ingredients and instructions
- **user_favorites**: User's favorite recipes
- **user_ingredients**: User's available ingredients

## Development

### Adding New Recipes
Recipes are automatically seeded when you first run the application. To add more recipes, you can:

1. Add them directly to the database
2. Create an admin interface (future enhancement)
3. Modify the sample data in `app.py`

### Customizing the Frontend
- Components are in `src/components/`
- Hooks for API calls are in `src/hooks/`
- API service is in `src/services/api.ts`
- Styling uses Tailwind CSS classes

### Backend Extensions
- Add new API endpoints in `app.py`
- Extend database models as needed
- Add middleware for additional functionality

## Production Deployment

### Backend Deployment
1. Use a production WSGI server like Gunicorn
2. Set up a production MySQL database
3. Configure environment variables securely
4. Enable HTTPS

### Frontend Deployment
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to a static hosting service
3. Update API URLs for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.