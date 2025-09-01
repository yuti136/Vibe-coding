# FoodBridge Setup Guide

## Quick Start

### Prerequisites
- Python 3.8+
- MySQL 5.7+ or 8.0+
- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/foodbridge-app.git
cd foodbridge-app
```

2. **Set up MySQL database:**
```bash
mysql -u root -p < database_setup.sql
```

3. **Install Python dependencies:**
```bash
pip install -r requirements.txt
```

4. **Install Node.js dependencies:**
```bash
npm install
```

5. **Configure environment:**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

6. **Run the application:**
```bash
python run.py
```

### Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Environment Variables

Create a `.env` file with:

```
DATABASE_URL=mysql+pymysql://username:password@localhost/foodbridge_db
SECRET_KEY=your-super-secret-key-change-this-in-production
JWT_SECRET_KEY=your-jwt-secret-key-change-this-in-production
```

## Troubleshooting

### Common Issues

1. **MySQL Connection Error:**
   - Ensure MySQL server is running
   - Check credentials in `.env`
   - Verify database exists

2. **Port Already in Use:**
   - Kill existing processes on ports 5000 and 5173
   - Or change ports in configuration files

3. **Python Package Installation Issues:**
   - Use virtual environment: `python -m venv venv`
   - Activate: `source venv/bin/activate` (Linux/Mac) or `venv\Scripts\activate` (Windows)
   - Install: `pip install -r requirements.txt`

## Development

### Project Structure
```
foodbridge-app/
├── src/                 # React frontend
├── app.py              # Flask backend
├── requirements.txt    # Python dependencies
├── package.json        # Node.js dependencies
├── database_setup.sql  # MySQL schema
└── run.py             # Development server runner
```

### API Endpoints
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/recipes` - Get all recipes
- `POST /api/recommendations` - Get recipe recommendations
- `POST /api/user/favorites` - Toggle favorite recipes
- `POST /api/user/ingredients` - Update user ingredients

## Deployment

### Production Considerations
1. Change all secret keys in `.env`
2. Use production database
3. Set up proper CORS origins
4. Use production WSGI server (Gunicorn)
5. Set up reverse proxy (Nginx)
6. Enable HTTPS

### Deployment Platforms
- **Backend**: Heroku, Railway, DigitalOcean App Platform
- **Frontend**: Netlify, Vercel, GitHub Pages
- **Database**: AWS RDS, Google Cloud SQL, PlanetScale