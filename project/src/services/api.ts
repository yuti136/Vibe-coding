const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('access_token');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'API request failed');
    }

    return response.json();
  }

  async register(email: string, password: string, name: string) {
    const response = await this.request('/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });

    this.token = response.access_token;
    localStorage.setItem('access_token', this.token!);
    return response;
  }

  async login(email: string, password: string) {
    const response = await this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    this.token = response.access_token;
    localStorage.setItem('access_token', this.token!);
    return response;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('access_token');
  }

  async getRecipes() {
    return this.request('/recipes');
  }

  async toggleFavorite(recipeId: string) {
    return this.request('/user/favorites', {
      method: 'POST',
      body: JSON.stringify({ recipe_id: parseInt(recipeId) }),
    });
  }

  async updateIngredients(ingredients: string[]) {
    return this.request('/user/ingredients', {
      method: 'POST',
      body: JSON.stringify({ ingredients }),
    });
  }

  async getRecommendations(ingredients: string[]) {
    return this.request('/recommendations', {
      method: 'POST',
      body: JSON.stringify({ ingredients }),
    });
  }
}

export const apiService = new ApiService();